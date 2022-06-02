import {React,useState} from 'react'
import { Button, VStack, FormControl, FormLabel, Input } from '@chakra-ui/react';
import {useToast} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const [email, setemail] = useState();
    const [password, setpassword] = useState();

    const toast = useToast();
    const history = useHistory();

    const submitHandler = async () => {
        if (!email || !password) {
          toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }
    
        // console.log(email, password);
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
          const { data } = await axios.post(
            "/api/user/login",
            { email, password },
            config
          );
    
          // console.log(JSON.stringify(data));
          toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          localStorage.setItem("userInfo", JSON.stringify(data));
          history.push("/chats");
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        }
      };
    
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