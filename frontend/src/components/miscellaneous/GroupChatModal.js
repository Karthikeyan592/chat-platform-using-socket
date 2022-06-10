import React from 'react'
import { Box, FormControl, Input, useDisclosure } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useToast
  } from "@chakra-ui/react";
import { useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const GroupChatModal = ({children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [GroupChatName, setGroupChatName] = useState();
    const [SelectedUsers, setSelectedUsers] = useState([]);
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

            const {data} = await axios.get(`/api/user?search=${Search}`,config);
            console.log(data);
            setLoading(false);
            setSearchResult(data);
        }catch(error){
            toast({
                title: "Error Occured",
                description: "Failed to load search message",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
              });
        }
    };
    const handleSubmit= async () =>{
      if(!GroupChatName || !SelectedUsers){
        toast({
          title: "Please fill all thefields",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }
      try{
        const config = {
          headers: {
              Authorization: `Bearer ${user.token}`,
          },
        };
  
        const {data} = await axios.post("/api/chat/group",{
          name:GroupChatName,
          users:JSON.stringify(SelectedUsers.map(user=>user._id))
          },config);
          setChats([data, ...chats]);
          onClose();
      }catch(error){
        toast({
          title: "Failed to create group chat",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }

    };

    


    const handleGroup=(userToAdd)=>{
      if (SelectedUsers.includes(userToAdd)) {
        toast({
          title: "User already added",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }
  
      setSelectedUsers([...SelectedUsers, userToAdd]);

    };

    const handleDelete=(delUser)=>{
      setSelectedUsers(SelectedUsers.filter((sel)=> sel._id !== delUser._id));
    };
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
                <Box w="100%" display="flex" flexWrap="wrap">
                  {SelectedUsers.map((u) => (
                    <UserBadgeItem
                      key={u._id}
                      user={u}
                      handleFunction={() => handleDelete(u)}
                    />
                  ))}
                </Box>
                {Loading ? (
              // <ChatLoading />
              <div>Loading...</div>
                  ) : (
                    SearchResult
                      ?.slice(0, 4)
                      .map((user) => (
                        <UserListItem
                          key={user._id}
                          user={user}
                          handleFunction={() => handleGroup(user)}
                        />
                      ))
                  )}
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                  Create Chat
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default GroupChatModal