import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom"
import MainPage from './MainPageView';
import SleepVideoView from "./SleepVideoView";
import StressVideoView from './StressVideoView';
import FocusVideoView from './FocusVideoView';


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

test("Buttons for sleep, stress, focus page render successfully", () => {
    render(
        <MemoryRouter>
        <MainPage />
        </MemoryRouter>)
    
    const SleepButton = screen.getByText("Sleep");
    expect(SleepButton).toBeInTheDocument();
    
    const StressButton = screen.getByText("Stress");
    expect(StressButton).toBeInTheDocument();

    
    const FocusButton = screen.getByText("Focus");
    expect(FocusButton).toBeInTheDocument();

                    
        });

test("Route successfully to the Stress Player Page", () => {
    render(
        <MemoryRouter>
        <MainPage />
        <StressVideoView />
        </MemoryRouter>)
    
    const StressButton = screen.getByText("Stress");
    fireEvent.click(StressButton);
    expect(screen.getByText("Relaxation Meditations")).toBeInTheDocument();
                    
        });

test("Route successfully to the Sleep Player Page", () => {
    render(
        <MemoryRouter>
        <MainPage />
        <SleepVideoView />
        </MemoryRouter>)
    
    const SleepButton = screen.getByText("Sleep");
    fireEvent.click(SleepButton);
    expect(screen.getByText("Sleep Meditations")).toBeInTheDocument();
                    
        });

test("Route successfully to the Focus Player Page", () => {
    render(
        <MemoryRouter>
        <MainPage />
        <FocusVideoView />
        </MemoryRouter>)
    
    const SleepButton = screen.getByText("Focus");
    fireEvent.click(SleepButton);
    expect(screen.getByText("Focus Meditations")).toBeInTheDocument();
                    
        });
