import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import { signInWithEmailAndPassword } from "firebase/auth";

// Mock Firebase auth functions
jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

describe("Login Component", () => {
  const mockedSignInWithEmailAndPassword = signInWithEmailAndPassword as jest.MockedFunction<typeof signInWithEmailAndPassword>;

  const renderComponent = () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  };

  test("renders login form correctly", () => {
    renderComponent();

    expect(screen.getByText(/welcome to mindfulu/i)).toBeInTheDocument(); // Header
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument(); // Email input
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument(); // Password input
    expect(screen.getByText(/login/i)).toBeInTheDocument(); // Login button
    expect(screen.getByText(/new user\? sign up here!/i)).toBeInTheDocument(); // Signup link
  });

  test("shows error message if login fails", async () => {
    mockedSignInWithEmailAndPassword.mockRejectedValueOnce(new Error("Invalid credentials"));

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: "wrongpassword" } });

    fireEvent.click(screen.getByText(/login/i));

    const errorMessage = await screen.findByText(/failed to log in\. please check your email and password\./i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("redirects to /main on successful login", async () => {
    mockedSignInWithEmailAndPassword.mockResolvedValueOnce({
      user: { uid: "123", email: "test@example.com", displayName: "Test User" },
    } as any);

    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: "correctpassword" } });

    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/main"));
  });

  test("displays validation error if email or password is empty", async () => {
    renderComponent();

    fireEvent.click(screen.getByText(/login/i)); // Click login without filling fields

    expect(screen.getByPlaceholderText(/email/i)).toBeInvalid();
    expect(screen.getByPlaceholderText(/password/i)).toBeInvalid();
  });

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
