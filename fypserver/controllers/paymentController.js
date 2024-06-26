import { catchAsyncError } from "../middlewares/catchAsynError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { instance } from "../server.js";
import { User } from "../models/User.js";
import crypto from "crypto";
import { Payment } from "../models/Payment.js";

export const buySubscription = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user.role == "admin")
    return next(new ErrorHandler("Admin can't buy subscription", 400));

  const plan_id = process.env.PLAN_ID || "plan_Nyvy0CR25GYZC0";

  const subscription = await instance.subscriptions.create({
    plan_id,
    customer_notify: true,
    total_count: 12,
  });

  user.subscription.id = subscription.id;
  user.subscription.status = subscription.status;

  await user.save();

  res.status(201).json({
    success: true,
    subscriptionId: subscription.id,
  });
});

export const paymentVerification = catchAsyncError(async (req, res, next) => {
  const { razorpay_signature, razorpay_subscription_id, razorpay_payment_id } =
    req.body;

  const user = await User.findById(req.user._id);

  const subscription_id = user.subscription.id;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(razorpay_payment_id + "|" + subscription_id, "utf-8")
    .digest("hex");

  const isAuthentic = generated_signature === razorpay_signature;

  if (!isAuthentic)
    return res.redirect(`${process.env.FRONTEND_URL}/paymentfail`);

  // Database comes Here
  await Payment.create({
    razorpay_signature,
    razorpay_subscription_id,
    razorpay_payment_id,
  });

  user.subscription.status = "active";

  await user.save();

  res.redirect(
    `${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`
  );

  // res.status(201).json({
  //   success: true,
  //   subscriptionId: subscription.id,
  // });
});

export const getRazorPayKey = catchAsyncError(async (req, res, next) => {
  res.status(201).json({
    success: true,
    key: process.env.RAZORPAY_API_KEY,
  });
});

export const cancelSubscription = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const subscriptionId = user.subscription.id;

  let refund = false;

  const payment = await Payment.findOne({
    razorpay_subscription_id: subscriptionId,
  });

  await instance.subscriptions.cancel(subscriptionId);

  const gap = new Date(Date.now()) - new Date(payment.createdAt);

  const refundTime = process.env.REFUND_DAYS * 24 * 60 * 60 * 1000;

  if (refundTime > gap) {
    await instance.payments.refund(payment.razorpay_payment_id);
    refund = true;
  }

  await payment.deleteOne();
  user.subscription.id = undefined;
  user.subscription.status = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: refund
      ? "Subscription Cancelled Successfully, You will recieve full refund within 7 days."
      : "Subscription Cancelled, Now refund initiated as subscription was cancelled after 7days.",
  });
});
