import React  from 'react';
import { Box } from "@chakra-ui/layout";
import {ChatState} from '../Context/ChatProvider';
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";

import ChatBox from '../components/ChatBox';
import { useState } from 'react';
 
const Chatpage = () => {
    const [fetchAgain,setFetchAgain] = useState(false);
    const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box 
        display="flex" 
        justifyContent="space-between" 
        w="100%" 
        h="91.5vh" 
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
    </div>
  )
}

export default Chatpage;
