"use client";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

/**
 * SignUpForm is a React component that provides a user interface for signing up a new user.
 * It utilizes ClerkAuth's useSignUp hook for handling the sign-up process.
 */
export default function SignUpForm() {
  // Destructuring properties from useSignUp hook for sign-up process.
  const { isLoaded, signUp, setActive } = useSignUp();
  // State for storing and updating user email.
  const [emailAddress, setEmailAddress] = useState("");
  // State for storing and updating user name:
  const [name, setName] = useState("");
  // State for storing and updating user name:
  const [categoryRank, setCategoryRank] = useState("");
  // State for storing and updating user password.
  const [password, setPassword] = useState("");
  // State for tracking if the email verification is pending.
  const [pendingVerification, setPendingVerification] = useState(false);
  // State for storing the email verification code.
  const [code, setCode] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const {user} = useUser();
  
  // useRouter hook for programmatically navigating between routes.

  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("role");
  /**
   * Handles the form submission for signing up a new user.
   * Prevents default form submission behavior.
   * Initiates the sign-up process if isLoaded is true.
   * If isLoaded is false, that means the instance of ClerkAuth are not yet ready, and in such a case, these functions will exit early without executing further.
   * -- This prevents the sign-up or verification process from being initiated if the necessary functionalities are not ready.
   * @param {Event} e - The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      // Attempt to create a new user with the provided email address and password.
      await signUp.create({
        emailAddress,
        password,
      });

      // Prepare email address verification process.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Update the UI to show the email code verification section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  /**
   * Handles the verification of the user's email using the code they received.
   * Only proceeds if isLoaded is true.
   *
   * @param {Event} e - The event object.
   */
  const onPressVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    let completeSignUp;
    try {
      // Attempt to verify the email address with the provided code.
      completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }

    // Check the status of the sign-up process.
    if (completeSignUp.status !== "complete") {
      // Log the response for investigation if the status is not complete.
      console.log(JSON.stringify(completeSignUp, null, 2));
    }

    // If the sign-up is complete, set the active session and redirect to home page.
    if (completeSignUp.status === "complete") {
      try {
        await setActive({ session: completeSignUp.createdSessionId });
        console.log(completeSignUp);

        const clerkUserId = completeSignUp.createdUserId;

        const userData = { email: emailAddress, name, clerkUserId };
        if (categoryRank) {
          userData.categoryRank = categoryRank;
        }
        if (phoneNumber) {
          userData.phoneNumber = phoneNumber;
        }

        const apiEndpoint =
          search === "player" ? "/api/players" : "/api/tournamentdirectors";
        axios.post(apiEndpoint, userData);
        router.push("/user-profile");
      } catch (err) {
        // This catch will now also handle errors from axios.post
        console.error("Error during post request or redirect:", err);
      }
    }
  };

  // Render the sign-up form.
  return (
    <div>
      {!pendingVerification && (
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmailAddress(e.target.value)}
              id="email"
              name="email"
              type="email"
            />
          </div>
          <div>
            <label htmlFor="firstname">First Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              id="firstName"
              name="firstName"
              type="firstName"
            />
          </div>
          {search === "player" && (
            <div>
              <label htmlFor="categoryRank">What Rank Are You?</label>
              <input
                onChange={(e) => setCategoryRank(e.target.value)}
                id="categoryRank"
                name="categoryRank"
                type="categoryRank"
              />
            </div>
          )}
          {search === "director" && (
            <div>
              <label htmlFor="categoryRank">Phone Number</label>
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                id="categoryRank"
                name="categoryRank"
                type="categoryRank"
              />
            </div>
          )}
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              type="password"
            />
          </div>
          <button onClick={handleSubmit}>Sign up</button>
        </form>
      )}
      {pendingVerification && (
        <div>
          <form>
            <input
              value={code}
              placeholder="Code..."
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={onPressVerify}>Verify Email</button>
          </form>
        </div>
      )}
    </div>
  );
}
