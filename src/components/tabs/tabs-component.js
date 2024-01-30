/* eslint-disable no-shadow */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React, { useState } from "react";
import { Tabs } from "antd";
import Search from "../search/search";
import ListCards from "../list-cards/list-cards";
import RatedList from "../RatedList/RatedList";

const TabsComponent = () => {
  const [input, setInput] = useState("");

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
              <ListCards query={input} />
            </>
          ),
        },
        {
          label: "Rated",
          key: 2,
          children: <RatedList />,
        },
      ]}
    />
  );
};
export default TabsComponent;
