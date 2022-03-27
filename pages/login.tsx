import PageContainer from '@/layout/Main';
import {
  Anchor,
  Button,
  Center,
  Group,
  Paper,
  PasswordInput,
  TextInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import Router from 'next/router';
import React from 'react';

const Login = () => {
  const form = useForm({
    initialValues: {
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
                  .post('api/auth/login', values)
                  .then(() => Router.push('/private/dashboard'))
            )}
          >
            <TextInput
              label="Email"
              placeholder="Your email"
              required
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              {...form.getInputProps('password')}
            />
            <Group position="apart" mt="md">
              <Anchor<'a'>
                onClick={(event) => event.preventDefault()}
                href="#"
                size="sm"
              >
                Forgot password?
              </Anchor>
            </Group>
            <Button type='submit' fullWidth mt="xl">
              Log in
            </Button>
          </form>
        </Paper>
      </Center>
    </PageContainer>
  );
};

export default Login;
