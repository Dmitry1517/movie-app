/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */

import React, { useContext } from "react";

import { format } from "date-fns";
import { Card, Image, Flex, Rate } from "antd";
import Genres from "../Genres/Genres";
import { Context } from "../Context/context";

const CardItem = ({
  id,
  imageUrl,
  title,
  desc,
  releaseDate,
  rating,
  genresIds,
}) => {
  const { guestSessionId } = useContext(Context);

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
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGYyZTFjMzk0ZjI4NGNlNmI4NTkwNjRhNDVhYzZhMCIsInN1YiI6IjY1YTEyM2FhMTk2OTBjMDEzMThhYzY0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMoCg9yFO9XBL_LKXVC_Nb4J4mbjbqQBduC4RzS7pdc",
      },
      body: JSON.stringify({ value }),
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=80f2e1c394f284ce6b859064a45ac6a0&guest_session_id=${guestSessionId}&page=1`,
      options,
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  return (
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
            <header
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <h3 style={{ margin: 0, width: "70%" }}>{title}</h3>
              <div style={ratingStyle}>{rating}</div>
            </header>

            <div>{format(releaseDate, "PP")}</div>
            <Genres genresIds={genresIds} />
            <div>{desc}</div>
          </div>
          <Rate
            allowHalf
            defaultValue={0}
            count={10}
            onChange={onChange}
            style={{ zoom: 0.8 }}
          />
        </div>
      </Flex>
    </Card>
  );
};

export default CardItem;
