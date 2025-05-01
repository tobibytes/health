"use client";
import React from "react";
import AuthWrapper from "../../../components/auth/AuthWrapper";
import SignUpForm from "../../../components/auth/SignUpForm";

const SignUpPage = () => (
  <AuthWrapper title="Create Your Account" subtitle="Sign up to get started as a patient.">
    <SignUpForm />
  </AuthWrapper>
);

export default SignUpPage;
