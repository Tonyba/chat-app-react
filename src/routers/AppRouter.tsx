import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConversationPage } from '../pages/ConversationPage';
import { LoginPage } from '../pages/LoginPage';

import { RegisterPage } from '../pages/RegisterPage';
import { ConversationChannelPage } from '../pages/ConversationChannelPage';

import { AuthenticatedRoute } from '../components/AuthenticatedRoute';
import { AuthContext } from '../utils/context/AuthContext';
import { User } from '../utils/types';


export const AppRouter = () => {

  const [user, setUser] = useState<User>()

  return (
    <AuthContext.Provider value={{user, updateAuthUser: setUser}} >
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
    </AuthContext.Provider>
  
  );
};

