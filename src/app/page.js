import React from "react";
import Navbar from "./components/navbar/Navbar";
import {
  currentUser,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Hero from "./components/hero/hero";
import Dashboard from "./components/dashboard/Dashboard";

const HomePage = async () => {
  // const user = await currentUser();

  return (
    <>
      <Navbar />
      <Hero/>
      <Dashboard/>
    </>
  );
};

export default HomePage;




