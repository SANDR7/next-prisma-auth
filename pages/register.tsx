import PageContainer from '@/layout/Main';
import { Button, Center, Paper, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import Router from 'next/router';
import React from 'react';

const Register = () => {
  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },

    validate: {
      username: (value) => (value === undefined ? 'Username is empty' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length< 6 ? 'Password is too short': null),
      confirmPassword: (value, values) =>
        value !== values.password
          ? 'Passwords did not match'
          : value.length < 6
          ? 'Password too short'
          : null
    }
  });

  return (
    <PageContainer>
      <Center mt={40}>
        <Paper style={{ width: '50%' }}>
          <form
            onSubmit={form.onSubmit(
              async (values) =>
                await axios
                  .post('/api/auth/register', values)
                  .then(() => Router.push('/private/dashboard'))
            )}
          >
            <TextInput
              label="Username"
              placeholder="Your username"
              required
              {...form.getInputProps('username')}
            />
            <TextInput
              label="Email"
              placeholder="Your email"
              mt="md"
              required
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              {...form.getInputProps('password')}
            />
            <PasswordInput
              label="Confirm password"
              placeholder="Confirm password"
              mt="md"
              {...form.getInputProps('confirmPassword')}
            />

            <Button fullWidth mt="xl" type="submit">
              Sign in
            </Button>
          </form>
        </Paper>
      </Center>
    </PageContainer>
  );
};

export default Register;
