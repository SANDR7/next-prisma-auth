import PageContainer from '@/layout/Main';
import {
  Anchor,
  Button,
  Center,
  Checkbox,
  Divider,
  Group,
  Paper,
  Text,
  PasswordInput,
  TextInput
} from '@mantine/core';
import React from 'react';

const login = () => {
  return (
    <PageContainer>
      <Center mt={40}>
        <Paper style={{width: '50%'}}>
          <TextInput label="Email" placeholder="Your email" required />
          <PasswordInput
            label="Password"
            placeholder="Your password"
			required
            mt="md"
          />
          <Group position="apart" mt="md">
            {/* <Checkbox label="Remember me" /> */}
            <Anchor<'a'>
              onClick={(event) => event.preventDefault()}
              href="#"
              size="sm"
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl">
            Log in
          </Button>
        </Paper>
      </Center>
    </PageContainer>
  );
};

export default login;
