/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
import React from "react";
import { Alert, Space } from "antd";

// const onClose = (e) => {
//   console.log(e, "I was closed.");
// };
const AlertComponent = ({ closeAlert }) => (
  <Space
    direction="vertical"
    style={{
      width: "100%",
    }}
  >
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
