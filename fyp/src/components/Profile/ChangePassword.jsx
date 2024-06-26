import { Container, Heading, VStack, Input, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { changePassword } from '../../redux/actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  clearProfileError,
  clearProfileMessage,
} from '../../redux/reducers/profileReducer';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();

    dispatch(changePassword(oldPassword, newPassword));
  };

  const { loading, message, error } = useSelector(state => state.profile);

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
    <Container py="16" minH={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          children="Change Password"
          my={'16'}
          textAlign={['center', 'left']}
          textTransform={'uppercase'}
        />

        <VStack spacing={'8'}>
          <Input
            required
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            placeholder="Old Password"
            type="password"
            focusBorderColor="blue.500"
          />
          <Input
            required
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="New Password"
            type="password"
            focusBorderColor="blue.500"
          />
          <Button
            isLoading={loading}
            w={'full'}
            colorScheme="blue"
            type="submit"
          >
            Change
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ChangePassword;
