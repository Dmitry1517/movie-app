/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-constructed-context-values */
// import React from "react";
// import CardItem from "../card-item/card-item";

import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import TabsComponent from "../tabs/tabs-component";
import { Context } from "../Context/context";
import TmdbService from "../../tmdb-service/TmdbService";
import "../../style/global.css";
import "../../style/app.css";

const { Content } = Layout;

const App = () => {
  const [guestSessionId, setGuestSessionId] = useState("");
  const [genres, setGenres] = useState([]);

  const tmdbService = new TmdbService();

  useEffect(() => {
    tmdbService
      .getNewSessionId()
      .then((data) => setGuestSessionId(data.guest_session_id))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    tmdbService
      .getGenres()
      .then((data) => setGenres(data.genres))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Context.Provider value={{ guestSessionId, genres }}>
      <Layout className="app">
        <Content className="app__content">
          <div className="app__inner">
            <TabsComponent />
          </div>
        </Content>
      </Layout>
    </Context.Provider>
  );
};
export default App;
