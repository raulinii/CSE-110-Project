// Navbar.test.tsx
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("Navbar", () => {
  test("renders the navbar and its items", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Check for navbar items
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Clock")).toBeInTheDocument();
    expect(screen.getByText("User")).toBeInTheDocument();
  });

  test("clicking on navigation items should update the active class and navigate", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const homeButton = screen.getByText("Home");
    fireEvent.click(homeButton);

    expect(homeButton).toHaveClass("active");

    const clockButton = screen.getByText("Clock");
    fireEvent.click(clockButton);
    expect(clockButton).toHaveClass("active");
  });

  test("toggling dark mode should update the body class", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);

    // Ensure the dark mode class is toggled on the body
    expect(document.body.classList.contains("dark-mode")).toBe(true);

    // Simulate again to turn it off
    fireEvent.click(toggleButton);
    expect(document.body.classList.contains("dark-mode")).toBe(false);
  });
});
