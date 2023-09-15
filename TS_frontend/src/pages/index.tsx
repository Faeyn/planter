import React from "react";
import type { NextPage } from "next";
import HeadComponent from "../components/header";

const Home: NextPage = () => (
  <div>
    <HeadComponent />
    <div className="flex h-screen flex-col bg-black text-white">Hello</div>
  </div>
);

export default Home;
