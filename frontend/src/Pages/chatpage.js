import React, { useState }  from 'react';
import { Box } from "@chakra-ui/layout";
import {ChatState} from '../Context/ChatProvider';
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";

import ChatBox from '../components/ChatBox';
 
const Chatpage = () => {
    const [fetchAgain,setFetchAgain] = useState(false);
    const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box 
        d="flex" 
        justifyContent="space-between" 
        w="100%" 
        h="91.5vh" 
        p="10px"
      >
        {user && <MyChats/>}
        {user && <ChatBox/>}
      </Box>
    </div>
  )
}

export default Chatpage;
