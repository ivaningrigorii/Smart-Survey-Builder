import { BrowserRouter, Routes, Route, } from "react-router-dom";

import React, { Component } from 'react';
import MainPage from "./pages/MainPage/MainPage";
import PollsPage from "./pages/PollsPage/PollsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EnterPage from "./pages/Auth/AuthorizPage";
import CreatePage from "./pages/CreatePage/CreatePage";
import ConstructorPage from "./pages/ConstructorPage/ConstructorPage";
import Passing from "./pages/PollsPassing/Passing";
import LogoutWithotPage from "./pages/Auth/LogoutWithotPage";
import routes from './routes.js'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<MainPage />} />

          <Route path={routes.profile} element={<ProfilePage />} />
          <Route path={routes.auth.login} element={<EnterPage />} />
          <Route path={routes.auth.logout} element={<LogoutWithotPage/>}/>


          <Route path={routes.polls.all} element={<PollsPage />} />

          <Route path={routes.polls.create} element={<CreatePage />} />
          <Route path={routes.polls.constructor} element={<ConstructorPage />} />

          <Route path={routes.polls.passing.to} element={<Passing />} />
        </Routes>
      </BrowserRouter>
    );

  }
}
export default App;