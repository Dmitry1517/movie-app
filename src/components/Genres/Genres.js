/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { Space, Tag } from "antd";
import { Context } from "../Context/context";

export default function Genres({ genresIds }) {
  const { genres } = useContext(Context);

  const genresArray = genresIds.map((id) => {
    const genre = genres.find((el) => el.id === id);
    return genre ? genre.name : "";
  });

  return (
    <Space size={[0, 4]} wrap>
      {genresArray.map((el, index) => (
        <Tag key={el}>{el}</Tag>
      ))}
    </Space>
  );
}
