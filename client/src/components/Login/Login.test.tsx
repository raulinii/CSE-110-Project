import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import { signInWithEmailAndPassword } from "firebase/auth";

describe("Login Component", () => {
  const mockedSignInWithEmailAndPassword = signInWithEmailAndPassword as jest.MockedFunction<typeof signInWithEmailAndPassword>;

  const renderComponent = () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  };
  test("redirects to signup page when signup link is clicked", () => {
    renderComponent();

    const signupLink = screen.getByText(/new user\? sign up here!/i);
    expect(signupLink).toHaveAttribute("href", "/signup");
  });

  test("redirects to forgot password page when forgot password link is clicked", () => {
    renderComponent();

    const forgotPasswordLink = screen.getByText(/forgot your password\?/i);
    expect(forgotPasswordLink).toHaveAttribute("href", "/forgot-password");
  });
});
