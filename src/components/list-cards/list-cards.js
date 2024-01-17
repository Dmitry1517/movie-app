/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react";
import { List, Flex } from "antd";
import CardItem from "../card-item/card-item";
import SpinComponent from "../spin-component/spin-component";

// eslint-disable-next-line react/prop-types
const ListCards = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=80f2e1c394f284ce6b859064a45ac6a0&query=${query}`,
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [query]);

  const shortenDedcription = (text) => {
    const textArray = text.split(" ");

    if (textArray.length > 20) {
      return `${textArray.slice(0, 20).join(" ")} ...`;
    }
    return text;
  };

  if (loading)
    return (
      <Flex
        style={{
          justifyContent: "center",
          padding: "30%",
        }}
      >
        <SpinComponent />
      </Flex>
    );
  return (
    <List
      grid={{
        gutter: 20,
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 2,
        xxl: 2,
      }}
      size="large"
      split={false}
      dataSource={movies}
      renderItem={(item) => (
        <List.Item style={{ padding: 0 }}>
          <CardItem
            key={item.id}
            imageUrl={item.poster_path}
            title={item.original_title}
            desc={shortenDedcription(item.overview)}
            releaseDate={item.release_date}
          />
        </List.Item>
      )}
    />
  );
};
export default ListCards;
