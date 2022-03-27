import PageContainer from '@/layout/Main'
import { Center, Paper, TextInput, PasswordInput, Group, Button, Anchor } from '@mantine/core'
import React from 'react'

const register = () => {
  return (
	<PageContainer>
	  <Center mt={40}>
        <Paper style={{width: '50%'}}>
          <TextInput label="Username" placeholder='Your username' required />
          <TextInput label="Email" placeholder="Your email" mt="md" required />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
          />
         
          <Button fullWidth mt="xl">
            Log in
          </Button>
        </Paper>
      </Center>
	</PageContainer>
  )
}

export default register