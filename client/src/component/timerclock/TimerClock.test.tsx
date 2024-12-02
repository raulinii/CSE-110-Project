import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StopwatchTimer from './StopwatchTimer';

describe('StopwatchTimer Component', () => {
  test('renders stopwatch timer and starts in stopwatch mode', () => {
    render(<StopwatchTimer />);

    const timeDisplay = screen.getByTestId('hours-span');
    expect(timeDisplay).toHaveTextContent('00');
  });

  test('stopwatch starts and increments time correctly', async () => {
    render(<StopwatchTimer />);

    // Start the stopwatch
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    // Wait for the stopwatch to increment to 03 seconds
    await waitFor(() => {
      const secondsDisplay = screen.getByTestId('seconds-span');
      expect(secondsDisplay).toHaveTextContent('03');
    }, { timeout: 4000 });
  });

  test('stopwatch stops and retains current time', async () => {
    render(<StopwatchTimer />);

    // Start the stopwatch
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    // Wait for the stopwatch to increment to 03 seconds
    await waitFor(() => {
      const secondsDisplay = screen.getByTestId('seconds-span');
      expect(secondsDisplay).toHaveTextContent('03');
    }, { timeout: 4000 });

    // Stop the stopwatch
    const stopButton = screen.getByText('Stop');
    fireEvent.click(stopButton);

    // Ensure that the time is still "03" seconds after stop
    const secondsDisplay = screen.getByTestId('seconds-span');
    expect(secondsDisplay).toHaveTextContent('03');
  });

  test('reset button resets the stopwatch to 00:00:00', async () => {
    render(<StopwatchTimer />);

    // Start the stopwatch
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    // Wait for 03 seconds
    await waitFor(() => {
      const secondsDisplay = screen.getByTestId('seconds-span');
      expect(secondsDisplay).toHaveTextContent('03');
    }, { timeout: 4000 });

    // Stop the stopwatch
    const stopButton = screen.getByText('Stop');
    fireEvent.click(stopButton);

    // Click the reset button
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);

    // Ensure time is reset
    const hoursDisplay = screen.getByTestId('hours-span');
    const minutesDisplay = screen.getByTestId('minutes-span');
    const secondsDisplay = screen.getByTestId('seconds-span');
    expect(hoursDisplay).toHaveTextContent('00');
    expect(minutesDisplay).toHaveTextContent('00');
    expect(secondsDisplay).toHaveTextContent('00');
  });

  test('switching to timer mode and setting a timer works', async () => {
    render(<StopwatchTimer />);

    // Switch to timer mode
    const modeButton = screen.getByText('Timer');
    fireEvent.click(modeButton);

    // Check if the mode is switched back to Stopwatch
    const stopwatchButton = screen.getByText('Stopwatch');
    expect(stopwatchButton).toBeInTheDocument();

    // Check for time reset
    const hoursDisplay = screen.getByTestId('hours-span');
    const minutesDisplay = screen.getByTestId('minutes-span');
    const secondsDisplay = screen.getByTestId('seconds-span');
    expect(hoursDisplay).toHaveTextContent('00');
    expect(minutesDisplay).toHaveTextContent('00');
    expect(secondsDisplay).toHaveTextContent('00');
  });

  test('timer starts from a specific value when set', async () => {
    render(<StopwatchTimer />);

    // Switch to timer mode
    const timerButton = screen.getByText('Timer');
    fireEvent.click(timerButton);

    // Simulate setting hours and minutes
    const hoursSpan = screen.getByTestId('hours-span');
    fireEvent.click(hoursSpan);
    const hoursInput = screen.getByTestId('hours-input');
    fireEvent.change(hoursInput, { target: { value: '1' } });
    fireEvent.blur(hoursInput);

    const minutesSpan = screen.getByTestId('minutes-span');
    fireEvent.click(minutesSpan);
    const minutesInput = screen.getByTestId('minutes-input');
    fireEvent.change(minutesInput, { target: { value: '30' } });
    fireEvent.blur(minutesInput);

    // Start the timer
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    // Wait for the timer to display 01:30:00
    await waitFor(() => {
      const hoursDisplay = screen.getByTestId('hours-span');
      const minutesDisplay = screen.getByTestId('minutes-span');
      expect(hoursDisplay).toHaveTextContent('01');
      expect(minutesDisplay).toHaveTextContent('30');
    });
  });
});