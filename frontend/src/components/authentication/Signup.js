import {React,useState} from 'react'
import { Button, VStack, FormControl, FormLabel, Input } from '@chakra-ui/react'
import {useToast} from "@chakra-ui/react";
import axios from "axios";

//useNavigate is used instead of Usehistory as it was showning error
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState()
    const [confirmpassword, setconfirmpassword] = useState();
    // const [pic, setPic] = useState();
    // const [Loading, setLoading] = useState(false);
    const toast = useToast();

    //navigate replaces history.push()
    const navigate = useNavigate();
    
    const submitHandler = async () => {

        if (!name || !email || !password || !confirmpassword){
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });

              return;
        }    
      
        if (password !== confirmpassword) {
          toast({
            title: "Passwords Do Not Match",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }


        try{
            const config = {
                headers: {
                    "Content-type":"application/json",
                },
            };

            const {data} = await axios.post(
                "/api/user",
                {name,email,password},
                config
            );

            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            localStorage.setItem('userInfo',JSON.stringify(data));
            navigate('/chats');
        } catch(error){
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