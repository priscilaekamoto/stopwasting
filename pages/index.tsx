import { NextPage } from "next";
import { useSession } from "next-auth/react";
import React from "react";
import Login from "./login";

const HomePage: NextPage = () => {
  return (
    <><Login></Login> </>
  );
};

export default HomePage;
