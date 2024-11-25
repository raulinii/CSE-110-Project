import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import StopwatchTimer from "./component/timerclock/StopwatchTimer"; // Adjust the import path as necessary

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

test('reset functionality resets the timer', () => {
  render(<StopwatchTimer />);

  // Start the timer
  fireEvent.click(screen.getByText(/start/i));

  // Fast-forward time by 1 second
  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // Stop the timer
  fireEvent.click(screen.getByText(/stop/i));

  // Now reset the timer
  fireEvent.click(screen.getByText(/reset/i));

  // Verify that the time is reset to 00:00:00
  expect(screen.getByTestId("hours").textContent).toBe("00");
  expect(screen.getByTestId("minutes").textContent).toBe("00");
  expect(screen.getByTestId("seconds").textContent).toBe("00");
});

test('timer cannot start without a set duration', () => {
  // Mock the window.alert function
  const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

  render(<StopwatchTimer />);

  // Switch to timer mode
  fireEvent.click(screen.getByText(/timer/i));

  // Try to start the timer without setting a duration
  fireEvent.click(screen.getByText(/start/i));

  // Ensure an alert is triggered to set the timer duration
  expect(alertMock).toHaveBeenCalledWith("Please set the timer duration first.");

  // Clean up mock
  alertMock.mockRestore();
});

test('editing timer values', () => {
  render(<StopwatchTimer />);

  // Click on the hours input field to edit
  fireEvent.click(screen.getByTestId("hours"));

  // Simulate typing a new value in the hours input
  fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '10' } });

  // Simulate blur to confirm the change
  fireEvent.blur(screen.getByRole('spinbutton'));

  // Verify that the new value is saved
  expect(screen.getByTestId("hours").textContent).toBe("10");
});

test('handling invalid input (non-numeric)', () => {
  render(<StopwatchTimer />);

  // Click on the hours input field to edit
  fireEvent.click(screen.getByTestId("hours"));

  // Simulate typing a non-numeric value
  fireEvent.change(screen.getByRole('spinbutton'), { target: { value: 'abc' } });

  // Simulate blur to confirm the change
  fireEvent.blur(screen.getByRole('spinbutton'));

  // Verify that the value should be reset to 0 or ignored
  expect(screen.getByTestId("hours").textContent).toBe("00");
});

test('ensuring maximum value input for timer (hours, minutes, seconds)', () => {
  render(<StopwatchTimer />);

  // Click on the hours input field to edit
  fireEvent.click(screen.getByTestId("hours"));

  // Simulate typing a value greater than the max (100 for hours)
  fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '100' } });

  // Simulate blur to confirm the change
  fireEvent.blur(screen.getByRole('spinbutton'));

  // Verify that the value is capped at 99 for hours
  expect(screen.getByTestId("hours").textContent).toBe("99");
});

test('timer countdown in timer mode', () => {
  render(<StopwatchTimer />);

  // Switch to timer mode
  fireEvent.click(screen.getByText(/timer/i));

  // Set a timer duration (e.g., 00:00:05)
  fireEvent.click(screen.getByTestId("hours"));  // Start editing hours
  fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '0' } });
  fireEvent.blur(screen.getByRole('spinbutton'));
  
  fireEvent.click(screen.getByTestId("minutes"));  // Start editing minutes
  fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '0' } });
  fireEvent.blur(screen.getByRole('spinbutton'));

  fireEvent.click(screen.getByTestId("seconds"));  // Start editing seconds
  fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '5' } });
  fireEvent.blur(screen.getByRole('spinbutton'));

  // Start the timer
  fireEvent.click(screen.getByText(/start/i));

  // Fast-forward time by 1 second
  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // Ensure that the seconds decrease by 1
  expect(screen.getByTestId("seconds").textContent).toBe("04");
});

// test('disallow editing when timer is running', () => {

