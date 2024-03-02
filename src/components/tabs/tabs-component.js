/* eslint-disable no-shadow */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React, { useState, useContext } from "react";
import { Tabs } from "antd";
import Search from "../search/search";
import ListCards from "../list-cards/list-cards";
import RatedList from "../RatedList/RatedList";
import { Context } from "../Context/context";
import TmdbService from "../../tmdb-service/TmdbService";

const TabsComponent = () => {
  const [input, setInput] = useState("");
  const [ratedArray, setRatedArray] = useState([]);
  const tmdbService = new TmdbService();
  const { guestSessionId } = useContext(Context);

  const onChangeValue = (id, value) => {
    tmdbService
      .setRatingMovie(id, guestSessionId, value)
      .then((response) => {
        setRatedArray((prevState) => [...prevState, { id, value }]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Tabs
      size="large"
      indicatorSize={70}
      tabBarGutter={40}
      defaultActiveKey="1"
      centered
      tabBarStyle={{
        width: "165px",
        margin: "0 auto",
        marginBottom: "20px",
      }}
      items={[
        {
          label: "Search",
          key: 1,
          children: (
            <>
              <Search input={input} setInput={setInput} />
              <ListCards
                query={input}
                onChangeValue={onChangeValue}
                ratedArray={ratedArray}
              />
            </>
          ),
        },
        {
          label: "Rated",
          key: 2,
          children: <RatedList ratedArray={ratedArray} />,
        },
      ]}
    />
  );
};
export default TabsComponent;
