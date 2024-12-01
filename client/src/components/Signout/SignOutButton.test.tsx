import { render, screen, fireEvent } from "@testing-library/react";
import { getAuth, signOut } from "firebase/auth";
import SignOutButton from "./SignOutButton";

jest.mock("firebase/auth", () => ({
    getAuth: jest.fn(),
    signOut: jest.fn(),
}));

describe("SignOutButton", () => {
  it("renders the button", () => {
    render(<SignOutButton />);
    const button = screen.getByRole("button", { name: /sign out/i });
    expect(button).toBeInTheDocument();
  });

  it("calls signOut when the button is clicked", async () => {
    const mockSignOut = signOut as jest.Mock;

    // Mock signOut to resolve successfully
    mockSignOut.mockResolvedValueOnce(null);

    render(<SignOutButton />);
    const button = screen.getByRole("button", { name: /sign out/i });

    // Click the button
    fireEvent.click(button);

    // Assert signOut was called
    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });

  it("handles signOut errors", async () => {
    const mockSignOut = signOut as jest.Mock;

    // Mock signOut to throw an error
    mockSignOut.mockRejectedValueOnce(new Error("Sign-out failed"));

    render(<SignOutButton />);
    const button = screen.getByRole("button", { name: /sign out/i });

    // Click the button
    fireEvent.click(button);

    // Since the error is logged to console.error, there's no visible output to assert
    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });
});
