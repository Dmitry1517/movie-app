/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import { Input } from "antd";

import "../../style/search.css";

const Search = ({ input, setInput }) => {
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <Input
      className="search"
      value={input}
      onChange={handleChange}
      placeholder="Type to search..."
    />
  );
};
export default Search;
