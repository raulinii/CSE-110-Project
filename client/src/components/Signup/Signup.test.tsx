import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Signup from "./Signup";
import { createUserWithEmailAndPassword } from "firebase/auth";


describe("Signup Component", () => {
  const mockedCreateUserWithEmailAndPassword = createUserWithEmailAndPassword as jest.MockedFunction<typeof createUserWithEmailAndPassword>;

  const renderComponent = () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
  };

  test("renders signup form correctly", () => {
    renderComponent();

    expect(screen.getByText(/Can’t wait to get you started!/i)).toBeInTheDocument(); // Header
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument(); // Email input
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument(); // Username input
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument(); // Sign Up button
  });
});
