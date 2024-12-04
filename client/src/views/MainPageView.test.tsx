import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom"
import MainPage from './MainPageView';


test("resources CAPS link working", () => {
  render(
    <MemoryRouter>
      <MainPage />
    </MemoryRouter>)

    const createLink = screen.getByText("CAPS");
    expect(createLink).toBeInTheDocument();
    

    expect(createLink.closest("a")).toHaveAttribute("href", "https://caps.ucsd.edu/");

    expect(createLink.closest("a")).toHaveAttribute("target", "_blank"); //make sure it opens the link in a new tab securely
        
    });

test("Meditation Location link working", () => {
    render(
        <MemoryRouter>
        <MainPage />
        </MemoryRouter>)
      
        const createLink = screen.getByText("Meditation Location");
        expect(createLink).toBeInTheDocument();
          
        expect(createLink.closest("a")).toHaveAttribute("href", "https://students.ucsd.edu/sponsor/ethics-spirit/meditation.html");
      
        expect(createLink.closest("a")).toHaveAttribute("target", "_blank"); //make sure it opens the link in a new tab securely
              
          });
