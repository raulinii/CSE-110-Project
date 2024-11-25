import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Signup from "./Signup";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Mock Firebase auth functions
jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
}));

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

    expect(screen.getByText(/can’t wait to get you started!/i)).toBeInTheDocument(); // Header
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument(); // Email input
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument(); // Username input
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument(); // Password input
    expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument(); // Confirm Password input
    expect(screen.getByText(/sign up/i)).toBeInTheDocument(); // Sign Up button
  });

  test("shows error message if passwords do not match", async () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: "password123" } });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), { target: { value: "password456" } });
    fireEvent.click(screen.getByText(/sign up/i));

    const errorMessage = await screen.findByText(/passwords do not match/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("shows error message on signup failure", async () => {
    mockedCreateUserWithEmailAndPassword.mockRejectedValueOnce(new Error("Email already in use"));

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: "password123" } });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), { target: { value: "password123" } });
    fireEvent.click(screen.getByText(/sign up/i));

    const errorMessage = await screen.findByText(/email already in use/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("redirects to /main on successful signup", async () => {
    mockedCreateUserWithEmailAndPassword.mockResolvedValueOnce({
      user: { uid: "123", email: "test@example.com", displayName: "Test User" },
    } as any);

    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: "password123" } });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), { target: { value: "password123" } });
    fireEvent.click(screen.getByText(/sign up/i));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/main"));
  });

  test("does not allow signup if email or password is missing", async () => {
    renderComponent();

    // Leave email and password fields empty
    fireEvent.click(screen.getByText(/sign up/i));

    expect(screen.getByPlaceholderText(/email/i)).toBeInvalid();
    expect(screen.getByPlaceholderText(/password/i)).toBeInvalid();
  });
});
