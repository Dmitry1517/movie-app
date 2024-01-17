/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import React from "react";
import { Card, Image, Flex, Space, Tag } from "antd";
import RateComponent from "../rate-component/rate-component";

const CardItem = ({ imageUrl, title, desc, releaseDate }) => (
  <Card
    bodyStyle={{ padding: 0 }}
    style={{
      height: 281,
      borderRadius: 0,
      boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.15)",
    }}
  >
    <Flex>
      <Image
        src={`https://image.tmdb.org/t/p/original${imageUrl}`}
        style={{ width: 183, height: 279 }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <h3 style={{ margin: 0 }}>{title}</h3>
          <div>{releaseDate}</div>
          <Space size={[4, 8]} wrap>
            <Tag>Action</Tag>
            <Tag>Drama</Tag>
          </Space>
          <div>{desc}</div>
        </div>
        <RateComponent />
      </div>
    </Flex>
  </Card>
);

export default CardItem;
