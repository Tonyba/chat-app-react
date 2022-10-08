import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConversationPage } from '../pages/ConversationPage';
import { LoginPage } from '../pages/LoginPage';

import { RegisterPage } from '../pages/RegisterPage';
import { ConversationChannelPage } from '../pages/ConversationChannelPage';

import { AuthenticatedRoute } from '../components/AuthenticatedRoute';


export const AppRouter = () => {
  return (
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
  );
};
