import React from "react";
import Navbar from "./components/navbar/Navbar";
import {
  currentUser,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

const HomePage = async () => {
  const user = await currentUser();

  return (
    <>
      <Navbar />

      <h1>My App</h1>
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
    </>
  );
};

export default HomePage;
