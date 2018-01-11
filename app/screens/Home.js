import React from "react";
import { StatusBar } from "react-native";

import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { ListItem } from "../components/List";

const Home = () => (
  <Container>
    {/* <StatusBar backgroundColor="blue" barStyle="light-content" /> */}
    <Header />
    <ListItem />
  </Container>
);

export default Home;
