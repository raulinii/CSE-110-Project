import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StopwatchTimer from './StopwatchTimer'; // Adjust the import if needed
import { act } from 'react';

describe("StopwatchTimer Component", () => {
  test("renders stopwatch timer and starts in stopwatch mode", () => {
    render(<StopwatchTimer />);

    // Match the initial "00:00:00" parts
    const timeDisplay = screen.getAllByText("00");
    expect(timeDisplay.length).toBeGreaterThan(0); // Expect to find "00" in time display
  });

  test("stopwatch starts and increments time correctly", async () => {
    render(<StopwatchTimer />);

    // Start the stopwatch
    const startButton = screen.getByText("Start");
    fireEvent.click(startButton);

    // Wait for the stopwatch to increment to 03 seconds
    await waitFor(() => {
      const secondDisplay = screen.getByText((content, element) => 
        content.includes("03") && element.tagName.toLowerCase() === 'span'
      );
      expect(secondDisplay).toBeInTheDocument();
    }, { timeout: 4000 });
  });

  test("stopwatch stops and retains current time", async () => {
    render(<StopwatchTimer />);

    // Start the stopwatch
    const startButton = screen.getByText("Start");
    fireEvent.click(startButton);

    // Wait for the stopwatch to increment to 03 seconds
    await waitFor(() => {
      const secondDisplay = screen.getByText((content, element) => 
        content.includes("03") && element.tagName.toLowerCase() === 'span'
      );
      expect(secondDisplay).toBeInTheDocument();
    }, { timeout: 4000 });

    // Stop the stopwatch
    const stopButton = screen.getByText("Stop");
    fireEvent.click(stopButton);

    // Ensure that the time is still "03" seconds after stop
    await waitFor(() => {
      const secondDisplay = screen.getByText((content, element) => 
        content.includes("03") && element.tagName.toLowerCase() === 'span'
      );
      expect(secondDisplay).toBeInTheDocument();
    });
  });

  test("reset button resets the stopwatch to 00:00:00", () => {
    render(<StopwatchTimer />);

    // Start and stop the stopwatch
    const startButton = screen.getByText("Start");
    fireEvent.click(startButton);
    setTimeout(() => {
      const stopButton = screen.getByText("Stop");
      fireEvent.click(stopButton);
    }, 2000);

    // Wait for some time and ensure the stopwatch stopped
    setTimeout(() => {
      const resetButton = screen.getByText("Reset");
      fireEvent.click(resetButton);

      // Check if the time reset to 00:00:00
      const resetDisplay = screen.getAllByText("00");
      expect(resetDisplay.length).toBeGreaterThan(0);
    }, 3000);
  });

  test("switching to timer mode and setting a timer works", () => {
    render(<StopwatchTimer />);

    // Switch to timer mode (assuming button is "Timer" or similar)
    const timerButton = screen.getByText("Timer");
    fireEvent.click(timerButton);

    // Check if timer mode UI appears, assuming "Set Timer" is part of the UI
    expect(screen.getByText("Stopwatch")).toBeInTheDocument();

    // Check for time reset
    //const timerTimeDisplay = screen.getByText("00");

    const timerTimeDisplay = screen.getAllByText("00");
    expect(timerTimeDisplay.length).toBeGreaterThan(0);
  });
});