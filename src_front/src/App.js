import { BrowserRouter, Routes, Route, } from "react-router-dom";

import React, { Component } from 'react';

import MainPage from "./pages/other/MainPage/MainPage";
import PollsPage from "./pages/polls_/catalogs/List/type_list/own/PollsPage";
import ProfilePage from "./pages/personal/ProfilePage/ProfilePage";
import EnterPage from "./pages/personal/Auth/Authorization/AuthorizPage";
import CreatePage from "./pages/polls_/constructor/Create/CreatePage";
import ConstructorPage from "./pages/polls_/constructor/Main/LoadPage/ConstructorPage";
import StartPassing from "./pages/polls_/passing/StartPage/Passing";
import LogoutWithotPage from "./pages/personal/Auth/LogOut/LogoutWithotPage";
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


          <Route path={routes.polls.cats.default} element={<PollsPage />} />
          <Route path={routes.polls.cats.own} element={<PollsPage />} />

          <Route path={routes.polls.create} element={<CreatePage />} />
          <Route path={routes.polls.constructor} element={<ConstructorPage />} />

          <Route path={routes.polls.passing.to} element={<StartPassing />} />
        </Routes>
      </BrowserRouter>
    );

  }
}
export default App;