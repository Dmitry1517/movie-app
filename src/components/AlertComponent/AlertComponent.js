/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
import React from "react";
import { Alert, Space } from "antd";

import "../../style/alert.css";

const AlertComponent = ({ closeAlert }) => (
  <Space className="alert" direction="vertical">
    <Alert
      message="ERROR!"
      description="TRY AGAIN LATTER"
      type="error"
      closable
      onClose={closeAlert}
    />
  </Space>
);
export default AlertComponent;
