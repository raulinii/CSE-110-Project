// MainPage.test.tsx
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MainPage from "./mainPage";

describe("MainPage", () => {
  test("displays the WelcomePopup initially", () => {
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    // Check if the WelcomePopup is shown
    expect(screen.getByText("Welcome to Mindful U!")).toBeInTheDocument();
  });

  test("closes the WelcomePopup and displays the main content", () => {
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    // Simulate closing the popup
    fireEvent.click(screen.getByText("Beginner"));

    // After closing the popup, the main content should be visible
    expect(screen.getByText("Sleep")).toBeInTheDocument();
    expect(screen.getByText("Stress")).toBeInTheDocument();
    expect(screen.getByText("Focus")).toBeInTheDocument();
  });

  test("navigates to the correct category page when clicked", () => {
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    // Close the popup
    fireEvent.click(screen.getByText("Beginner"));

    // Click on a category
    fireEvent.click(screen.getByText("Sleep"));

    // Assuming `useNavigate` is properly mocked, you can check the route
    expect(window.location.pathname).toBe("/player/sleep");
  });
});
