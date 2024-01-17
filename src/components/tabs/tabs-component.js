/* eslint-disable no-shadow */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import { Tabs, Flex } from "antd";
import Search from "../search/search";
import ListCards from "../list-cards/list-cards";
import SpinComponent from "../spin-component/spin-component";

const TabsComponent = () => {
  const [input, setInput] = useState("");

  return (
    <Tabs
      size="large"
      indicatorSize={70}
      tabBarGutter={40}
      defaultActiveKey="1"
      centered
      style={{ display: "flex" }}
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
          children: (
            <Flex style={{ justifyContent: "center", padding: "30%" }}>
              <SpinComponent />
            </Flex>
          ),
        },
      ]}
    />
  );
};
export default TabsComponent;
