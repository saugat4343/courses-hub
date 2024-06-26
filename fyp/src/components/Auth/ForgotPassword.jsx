import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../redux/actions/profile';
import toast from 'react-hot-toast';
import {
  clearProfileError,
  clearProfileMessage,
} from '../../redux/reducers/profileReducer';

const ForgotPassword = () => {
  const [email, setEmail] = useState();

  const { loading, message, error } = useSelector(state => state.profile);

  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProfileError(error));
    }
    if (message) {
      toast.success(message);
      dispatch(clearProfileMessage(message));
    }
  }, [dispatch, error, message]);

  return (
    <Container py={'16'} h={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          children="Forgot Password"
          my={'16'}
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />

        <VStack spacing={'8'}>
          <Input
            required
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            type="email"
            focusBorderColor="blue.500"
          />

          <Button
            isLoading={loading}
            type="submit"
            w={'full'}
            colorScheme="blue"
          >
            Send Reset Link
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgotPassword;
