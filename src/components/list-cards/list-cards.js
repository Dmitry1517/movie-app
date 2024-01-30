/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-else-return */
/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useCallback } from "react";
import { List, Flex, Pagination, Modal } from "antd";
import debounce from "lodash/debounce";
import CardItem from "../card-item/card-item";
import SpinComponent from "../spin-component/spin-component";
import AlertComponent from "../AlertComponent/AlertComponent";
import "../../style/list-cards.css";
import "../../style/pagination.css";

// eslint-disable-next-line react/prop-types
const ListCards = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const debounceFetch = useCallback(
    debounce((value, page) => {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=80f2e1c394f284ce6b859064a45ac6a0&page=${page}&query=${value}`,
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
    }, 2000),
    [],
  );

  useEffect(() => {
    debounceFetch(query, currentPage);
  }, [query, currentPage, debounceFetch]);

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
    if (textArray.length > 15) {
      return `${textArray.slice(0, 15).join(" ")} ...`;
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

  if (movies.length === 0 && query !== "") {
    return (
      <Flex className="list-cards__empty">По вашему запросу ничего нет...</Flex>
    );
  }

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
              id={item.id}
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
};
export default ListCards;
