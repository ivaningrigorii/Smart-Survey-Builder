import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import OurTestList from "./OurTestList";
import React, { Component } from 'react';
import MainPage from "./pages/MainPage/MainPage";
import PollsPage from "./pages/PollsPage/PollsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EnterPage from "./pages/Auth/AuthorizPage";
import CreatePage from "./pages/CreatePage/CreatePage";
class  App  extends  Component {
  render() {
    return (   
      <BrowserRouter>
        <Routes>
          <Route path="/TestServer" element={<OurTestList />} /> 
          <Route path="/" element={<MainPage/>} /> 
          <Route path="/polls" element={<PollsPage/>} /> 
          <Route path="/profile" element={<ProfilePage/>} /> 
          <Route path="/createPoll" element={<CreatePage/>} /> 
          <Route path="/auth" element={<EnterPage/>} /> 
        </Routes>
      </BrowserRouter>
    );

  }
  }
  export  default  App;