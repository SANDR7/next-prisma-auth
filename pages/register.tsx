import PageContainer from '@/layout/Main';
import {
  Alert,
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
import { AlertCircle } from 'tabler-icons-react';

const Register = () => {
  const [submitting, setSubmitting] = useState(false);
  const [errMessage, setErrMessage] = useState('');
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
      password: (value) => (value.length < 6 ? 'Password is too short' : null),
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
          <Title align="center" order={2}>
            Welcome!
          </Title>
          <Text color="dimmed" align="center" mt={5}>
            Do have an account yet?{' '}
            <Anchor
              component={Link}
              color="pink"
              underline
              href="/login"
              size="sm"
            >
              Log in
            </Anchor>
          </Text>
          {errMessage && (
            <Alert icon={<AlertCircle size={16} />} color="red" my={10}>
              {errMessage}
            </Alert>
          )}
          <form
            onSubmit={form.onSubmit(async (values, event) => {
              event.preventDefault();
              await axios.post('/api/auth/register', values).then((res) => {
                const { ok, message } = res.data;
                setSubmitting(true);

                if (ok) {
                  Router.push('/dashboard');
                } else {
                  setSubmitting(false);
                  setErrMessage(message);
                }
              });
            })}
          >
            <TextInput
              id="username"
              label="Username"
              placeholder="Your username"
              required
              disabled={submitting}
              {...form.getInputProps('username')}
            />
            <TextInput
              id="email"
              label="Email"
              placeholder="Your email"
              mt="md"
              required
              disabled={submitting}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              id="password"
              label="Password"
              placeholder="Your password"
              mt="md"
              autoComplete="off"
              disabled={submitting}
              {...form.getInputProps('password')}
            />
            <PasswordInput
              id="confirm-password"
              label="Confirm password"
              placeholder="Confirm password"
              mt="md"
              autoComplete="off"
              disabled={submitting}
              {...form.getInputProps('confirmPassword')}
            />

            <Button fullWidth mt="xl" type="submit" loading={submitting}>
              Sign in
            </Button>
          </form>
        </Paper>
      </Center>
    </PageContainer>
  );
};

export default Register;
