"use client";
import React from "react";
import AuthWrapper from "../../../components/auth/AuthWrapper";
import SignInForm from "../../../components/auth/SignInForm";

const SignInPage = () => (
  <AuthWrapper title="Sign In" subtitle="Access your account.">
    <SignInForm />
  </AuthWrapper>
);

export default SignInPage;
