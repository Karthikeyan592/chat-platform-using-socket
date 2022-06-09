import React from 'react'
import { FormControl, Input, useDisclosure } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    useToast
  } from "@chakra-ui/react";
import { useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';


const GroupChatModal = ({children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [GroupChatName, setGroupChatName] = useState();
    const [SelectedUsers, setSelectedUsers] = useState();
    const [Search, setSearch] = useState();
    const [SearchResult, setSearchResult] = useState();
    const [Loading, setLoading] = useState();

    const toast = useToast();

    const {user,chats,setChats}= ChatState();

    const handleSearch=async(query)=>{
        setSearch(query);
        if(!query){
            return;
        }

        try{
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.get(`/api/user/search/${query}`,config);
            setSearchResult(data);
            setLoading(false);
            console.log(data);
        }catch(error){
            toast({
                title: "Error fetching the chat",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
              });
        }
    };
    const handleSubmit=()=>{};

    return (
        <>
          <span onClick={onOpen}>{children}</span>
    
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                fontSize="35px"
                fontFamily="Work sans"
                display="flex"
                justifyContent="center"
                >
                    Create Group Chat
                </ModalHeader>
              <ModalCloseButton />
              <ModalBody
              display="flex"
              flexDir="column"
              alignItems="center"
              >
                <FormControl>
                    <Input placeholder="Chat Name" mb={3} onChange={(e)=> setGroupChatName(e.target.value)}/>
                </FormControl>
                <FormControl>
                    <Input placeholder="Add users" mb={3} onChange={(e)=> handleSearch(e.target.value)}/>
                </FormControl>
                {/* selectedUsers */}
                {/* render searched chats */}
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                  Create Chat
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default GroupChatModal