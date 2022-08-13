import React from "react";
import Header from "./Header";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
//import Head from './Header'; unneeded due to import

const Layout = (props) => {
  return (
    <Container>
      <Header />
      {props.children}
      {/* <h1>I'm a footer</h1> */}
    </Container>
  );
};
export default Layout;
