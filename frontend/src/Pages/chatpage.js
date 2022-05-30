import React, { useEffect , useState }  from 'react';
import axios from 'axios';


const chatpage = () => {

    const [chats, setChats] = useState([]);
    const fetchChats = async () => {
        const data = await axios.get('/api/chat');

        console.log(data);

        
    };

    useEffect(() => {
      fetchChats();
    }, []);
    

  return (
    <div>chatpage</div>
  )
}


export default chatpage;