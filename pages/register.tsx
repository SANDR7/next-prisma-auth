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
      password: ''
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
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

            <Button fullWidth mt="xl" type="submit">
              Log in
            </Button>
          </form>
        </Paper>
      </Center>
    </PageContainer>
  );
};

export default Register;
