import PageContainer from '@/layout/Main';
import {
  Anchor,
  Button,
  Center,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';

const Login = () => {
  const [loading, setLoading] = useState(false);
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
          <Title align="center" order={2}>
            Welcome back!
          </Title>
          <Text color="dimmed" align="center" mt={5}>
            Do not have an account yet?{' '}
            <Anchor
              component={Link}
              color="pink"
              underline
              href="/register"
              size="sm"
            >
              Create account
            </Anchor>
          </Text>
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
            <Button type="submit" fullWidth mt="xl">
              Log in
            </Button>
          </form>
        </Paper>
      </Center>
    </PageContainer>
  );
};

export default Login;
