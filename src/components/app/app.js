/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
// import React from "react";
// import CardItem from "../card-item/card-item";

// const App = () => (
//   <>
//     <CardItem />
//     <CardItem />
//     <CardItem />
//   </>
// );

// export default App;

import React from "react";
import { Layout } from "antd";
import TabsComponent from "../tabs/tabs-component";
import "../../style/global.css";

const { Content } = Layout;

const App = () => {
  return (
    <Layout style={{ background: "#f7f7f7" }}>
      <Content
        style={{
          padding: "0 15%",
        }}
      >
        <div
          style={{
            background: "#fff",
            minHeight: "100vh",
            padding: 24,
          }}
        >
          <TabsComponent />
        </div>
      </Content>
    </Layout>
  );
};
export default App;
