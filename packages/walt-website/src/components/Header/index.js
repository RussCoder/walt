import React from "react";
import Link from "gatsby-link";
import { Menu, Header, Segment, Image, Container } from "semantic-ui-react";
import hat from "../../img/walt-hat-450x.png";
import glasses from "../../img/walt-glasses-450x.png";

const MainHeader = () => (
  <Segment as="header" vertical textAlign="center" className="ban" color="blue">
    <Menu secondary inverted pointing borderless>
      <Menu.Item name="Playground" active />
      <Menu.Item name="Docs" />

      <Menu.Item
        name="Github"
        as="a"
        href="https://github.com/ballercat/walt"
        position="right"
        icon="github"
      />
    </Menu>

    <Segment basic as="figure">
      <Image src={hat} alt="" className="hat" />
      <Image src={glasses} alt="" className="glasses" />
    </Segment>

    <Container text>
      <Header as="h1">Walt</Header>
      <Header as="h2">JavaScript-like syntax for WebAssembly</Header>
    </Container>
  </Segment>
);

export default MainHeader;
