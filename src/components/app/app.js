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
import "../../style/global.css";
import "../../style/app.css";

const { Content } = Layout;

const App = () => {
  const [guestSessionId, setGuestSessionId] = useState("");
  const [genres, setGenres] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGYyZTFjMzk0ZjI4NGNlNmI4NTkwNjRhNDVhYzZhMCIsInN1YiI6IjY1YTEyM2FhMTk2OTBjMDEzMThhYzY0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMoCg9yFO9XBL_LKXVC_Nb4J4mbjbqQBduC4RzS7pdc",
    },
  };
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/authentication/guest_session/new",
      options,
    )
      .then((response) => response.json())
      .then((data) => setGuestSessionId(data.guest_session_id))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
      .then((response) => response.json())
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
