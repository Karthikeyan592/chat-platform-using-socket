import React from 'react'
import {Container,Box,Text,Tab,TabList,TabPanel,TabPanels,Tabs} from "@chakra-ui/react"
import Login from "../components/authentication/Login"
import Signup from "../components/authentication/Signup"
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Homepage = () => {

  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {history.push("/chats");}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <Container maxW="x1" centerContent>
      <Box display='flex' w="25%" justifyContent='center' borderRadius="lg" borderWidth="3px" borderColor="black" bg="white" p={3} m="50px 0 50px 500px">
          <Text fontSize="4xl">Socket Chat</Text>
          <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
              <Tabs>
                <TabList mb="1em">
                  <Tab width="50%">Login</Tab>
                  <Tab width="50%">SignUp</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Login/>
                  </TabPanel>
                  <TabPanel>
                    <Signup/>
                  </TabPanel>
                </TabPanels>
              </Tabs>
          </Box>
      </Box>
    </Container>
  )
}

export default Homepage;