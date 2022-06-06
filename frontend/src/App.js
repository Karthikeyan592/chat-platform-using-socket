import './App.css';
// import { Button } from '@chakra-ui/react';
import { Route } from 'react-router-dom';
import homepage from './Pages/homepage';
import Chatpage from './Pages/chatpage';

function App() {
  return (
    <div className="App">
      <Route path="/" component={homepage} exact/>
      <div className="cPage">
        <Route path="/chats" component={Chatpage} />
      </div>
    </div>
  );
}

export default App;
