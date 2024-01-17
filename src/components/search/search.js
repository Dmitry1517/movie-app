/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import { Input } from "antd";

const Search = ({ input, setInput }) => {
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <Input
      value={input}
      onChange={handleChange}
      style={{
        height: "45px",
        fontSize: "16px",
        margin: "10px 0 30px 0",
        borderRadius: "3px",
        border: "1px solid #d9d9d9",
      }}
      placeholder="Type to search..."
    />
  );
};
export default Search;
