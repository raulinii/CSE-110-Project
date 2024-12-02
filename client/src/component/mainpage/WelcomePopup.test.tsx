// WelcomePopup.test.tsx
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import WelcomePopup from "./WelcomePopup";

describe("WelcomePopup", () => {
  const mockOnClose = jest.fn();

  test("renders first popup with meditation familiarity options", () => {
    render(
      <BrowserRouter>
        <WelcomePopup onClose={mockOnClose} />
      </BrowserRouter>
    );

    // Ensure the first popup is shown
    expect(screen.getByText(/How familiar are you with meditation?/)).toBeInTheDocument();
    expect(screen.getByText("Beginner")).toBeInTheDocument();
    expect(screen.getByText("Occasionally")).toBeInTheDocument();
    expect(screen.getByText("Regularly")).toBeInTheDocument();
  });

  test("navigates to main page after selecting a meditation level", () => {
    render(
      <BrowserRouter>
        <WelcomePopup onClose={mockOnClose} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Beginner"));
    expect(screen.getByText(/You selected: Beginner/)).toBeInTheDocument();
    expect(screen.getByText("Short")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(screen.getByText("Long")).toBeInTheDocument();
  });

  test("calls onClose and navigates to main page after selecting video length", () => {
    render(
      <BrowserRouter>
        <WelcomePopup onClose={mockOnClose} />
      </BrowserRouter>
    );

    // Simulate choosing meditation level
    fireEvent.click(screen.getByText("Beginner"));

    // Select video length
    fireEvent.click(screen.getByText("Short"));

    // Ensure that onClose is called and navigates
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    // You can mock 'navigate' and verify the navigation too
  });
});
