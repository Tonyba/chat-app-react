import React, { useState, FC, PropsWithChildren, Dispatch, SetStateAction} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConversationPage } from '../pages/ConversationPage';
import { LoginPage } from '../pages/LoginPage';

import { RegisterPage } from '../pages/RegisterPage';
import { ConversationChannelPage } from '../pages/ConversationChannelPage';

import { AuthenticatedRoute } from '../components/AuthenticatedRoute';
import { AuthContext } from '../utils/context/AuthContext';
import { User } from '../utils/types';
import { SocketContext, socket } from '../utils/context/SocketContext';
import { Socket } from 'socket.io-client';
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../store/index';
import { enableMapSet } from 'immer'

enableMapSet();

type Props = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  socket: Socket
}

export const AppRouter = () => {

  const [user, setUser] = useState<User>()

  return (
    <AppWithProvider user={user} setUser={setUser} socket={socket}>
      <Router>
     
     <Routes>
       <Route path="/" element={<RegisterPage />}></Route>
       <Route path="/login" element={<LoginPage />}></Route>
       <Route path="/register" element={<RegisterPage />}></Route>
       <Route path="/conversations" element={
         <AuthenticatedRoute>
           <ConversationPage />
         </AuthenticatedRoute>
       
       }>
         <Route  path=':id' element={<ConversationChannelPage /> }></Route>
       </Route>
     </Routes>

   </Router>
    </AppWithProvider>
  
  );
};

function AppWithProvider({ children, user, setUser }: PropsWithChildren & Props) {
  return (
    <ReduxProvider store={store}>
         <AuthContext.Provider value={{user, updateAuthUser: setUser}} >
          <SocketContext.Provider value={socket} >
            { children }
          </SocketContext.Provider>
        
        </AuthContext.Provider>
    </ReduxProvider>
   
  
  );
}

