// src/app/sign-up/[[...sign-up]]/page.js
'use client'
import { SignUp } from "@clerk/clerk-react";

import { useSearchParams } from 'next/navigation' // useSearchParams is a Client Component hook that lets you read the current URL's query string.

const SignUpPage = () => {
  const searchParams = useSearchParams()
 
  const search = searchParams.get('role')
  console.log(search);

  return (
    <div>
      <SignUp 
        // afterSignUpUrl={`${process.env.REACT_APP_BACKEND_URL}/process-rol e?role=${role}`} 
      />
      {/* <>Search: {search}</> */}
    </div>
  );
};

export default SignUpPage;
