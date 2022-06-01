import {React,useState} from 'react'
import { Button, VStack, FormControl, FormLabel, Input, InputGroup } from '@chakra-ui/react'

const submitHandler = () => {};

const Signup = () => {
    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState()
    const [confirmpassword, setconfirmpassword] = useState();
  return (
    <VStack spacing="5px" color='black'>
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder='Enter your Name' onChange={(e)=>setname(e.target.value)} />
        </FormControl>

        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder='Enter your email' type="email" onChange={(e)=>setemail(e.target.value)} />
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>password</FormLabel>
            <Input placeholder='Enter your password' type="password" onChange={(e)=>setpassword(e.target.value)} />
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Confirm password</FormLabel>
            <Input placeholder='Confirm password' type="password" onChange={(e)=>setconfirmpassword(e.target.value)} />
        </FormControl>

        <Button colorScheme="blue" width="100%" style={{ marginTop : 15}} onClick={submitHandler}>
            sign up
        </Button>
    </VStack>
  )
}

export default Signup