/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Spin } from "antd";
import "../../style/spin.css";

const SpinComponent = () => {
  return (
    <Spin tip="Loading ..." size="large">
      <div className="content" />
    </Spin>
  );
};

export default SpinComponent;
