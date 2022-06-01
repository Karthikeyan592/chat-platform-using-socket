import {React,useState} from 'react'
import { Button, VStack, FormControl, FormLabel, Input, InputGroup } from '@chakra-ui/react';

const submitHandler = () => {};

const Login = () => {
    const [email, setemail] = useState();
    const [password, setpassword] = useState()
    
  return (
    <VStack spacing="5px" color='black'>

        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder='Enter your email' type="email" onChange={(e)=>setemail(e.target.value)} />
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>password</FormLabel>
            <Input placeholder='Enter your password' type="password" onChange={(e)=>setpassword(e.target.value)} />
        </FormControl>

        <Button colorScheme="blue" width="100%" style={{ marginTop : 15}} onClick={submitHandler}>
            Login
        </Button>
    </VStack>
  )
}

export default Login