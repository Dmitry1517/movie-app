/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unreachable-loop */

import React, { useContext, useEffect, useState } from "react";
import { Card, Image, Flex, Rate } from "antd";
import Genres from "../Genres/Genres";

import "../../style/card.css";
import "../../style/rate.css";

const CardItem = ({
  id,
  imageUrl,
  title,
  desc,
  releaseDate,
  rating,
  onChangeValue,
  genresIds,
}) => {
  function formatDate(date) {
    const months = [
      "Jan",
      "Feb",
      "March",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dec",
    ];
    const year = new Date(date).getFullYear();
    const month = months[new Date(date).getMonth()];
    const day = new Date(date).getDate();
    return `${month} ${day}, ${year}`;
  }

  const ratingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
  };
  if (rating < 3) ratingStyle.border = "2px solid #e90000";
  if (rating >= 3 && rating < 5) ratingStyle.border = "2px solid #e97e00";
  if (rating >= 5 && rating < 7) ratingStyle.border = "2px solid #e9d100";
  if (rating >= 7) ratingStyle.border = "2px solid #66e900";

  const onChange = (value) => {
    onChangeValue(id, value);
  };

  return (
    <Card className="card" bodyStyle={{ padding: 0 }}>
      <Flex>
        <Image
          src={`https://image.tmdb.org/t/p/original${imageUrl}`}
          style={{ width: 183, height: 279 }}
        />
        <div className="card__info">
          <div className="card__wrapper">
            <header className="card__header">
              <h3 className="card__title">{title}</h3>
              <div style={ratingStyle}>{rating.toFixed(1)}</div>
            </header>

            <div>{formatDate(releaseDate)}</div>
            <Genres genresIds={genresIds} />
            <div>{desc}</div>
          </div>
          <div className="rate">
            <Rate
              allowHalf
              defaultValue={rating}
              count={10}
              onChange={onChange}
            />
          </div>
        </div>
      </Flex>
    </Card>
  );
};

export default CardItem;
