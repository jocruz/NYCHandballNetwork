import React from "react";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/hero";
import{  UserButton, SignedIn, SignOutButton } from "@clerk/nextjs";
const HomePage = async () => {
  // const user = await currentUser();

  return (
    <>
      <Navbar />
      <Hero/>
      {/* <Dashboard/> */}
    </>
  );
};

export default HomePage;




