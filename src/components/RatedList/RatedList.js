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
import "../../style/list-cards.css";
import "../../style/pagination.css";

export default function RatedList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const guestSessionId = useContext(Context);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGYyZTFjMzk0ZjI4NGNlNmI4NTkwNjRhNDVhYzZhMCIsInN1YiI6IjY1YTEyM2FhMTk2OTBjMDEzMThhYzY0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMoCg9yFO9XBL_LKXVC_Nb4J4mbjbqQBduC4RzS7pdc",
    },
  };

  const getRatedMovies = (id, page) => {
    fetch(
      `https://api.themoviedb.org/3/account/{account_id}/rated/movies?api_key=80f2e1c394f284ce6b859064a45ac6a0&page=${page}&guest_session_id=${id}`,
      options,
    )
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else throw new Error();
      })
      .then((data) => {
        console.log(data);
        setMovies(data.results);
        setTotal(data.total_results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setShowAlert(true);
      });
  };

  useEffect(() => {
    getRatedMovies(guestSessionId, currentPage);
  }, [currentPage]);

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
