/* eslint-disable no-console */
/* eslint-disable no-else-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import React, { useEffect, useState, useContext } from "react";
import { Flex, List, Pagination } from "antd";
import SpinComponent from "../spin-component/spin-component";
import CardItem from "../card-item/card-item";
import AlertComponent from "../AlertComponent/AlertComponent";
import { Context } from "../Context/context";
import TmdbService from "../../tmdb-service/TmdbService";
import "../../style/list-cards.css";
import "../../style/pagination.css";

export default function RatedList({ ratedArray }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { guestSessionId } = useContext(Context);
  const tmdbService = new TmdbService();

  useEffect(() => {
    tmdbService
      .getRatedMovies(guestSessionId, currentPage)
      .then((data) => {
        console.log(data);
        setMovies(data.results);
        setTotal(data.total_results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.text);
        setLoading(false);
        setShowAlert(true);
      });
  }, [ratedArray, currentPage]);

  const onChange = (page) => {
    setLoading(true);
    setCurrentPage(page);
  };

  const closeAlert = () => {
    setLoading(true);
    setShowAlert(false);
  };

  const shortenDedcription = (text) => {
    const textArray = text.split(" ");
    if (textArray.length > 20) {
      return `${textArray.slice(0, 20).join(" ")} ...`;
    }
    return text;
  };

  if (loading)
    return (
      <Flex className="list-cards__spiner">
        <SpinComponent />
      </Flex>
    );

  if (showAlert)
    return (
      <Flex className="list-cards__alert">
        <AlertComponent closeAlert={closeAlert} />
      </Flex>
    );

  return (
    <>
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
          <List.Item className="list-cards__item" style={{ padding: 0 }}>
            <CardItem
              key={item.id}
              rating={item.rating}
              imageUrl={item.poster_path}
              title={item.original_title}
              desc={shortenDedcription(item.overview)}
              releaseDate={item.release_date}
              genresIds={item.genre_ids}
            />
          </List.Item>
        )}
      />

      <Flex className="pagination">
        {total <= 20 ? (
          ""
        ) : (
          <Pagination
            current={currentPage}
            total={total}
            pageSize={20}
            onChange={onChange}
          />
        )}
      </Flex>
    </>
  );
}
