import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserPage from './UserPage';
import { getUserInfo } from "../../services/firebaseServices";
import SignOutButton from "../../components/Signout/SignOutButton";
import ToggleMusicButton from '../toggleMusic/ToggleMusicButton';
import { ToggleThemeButton } from '../toggleTheme/ToggleThemeButton';

jest.mock("../../services/firebaseServices");
jest.mock("../../components/Signout/SignOutButton", () => () => <div data-testid="sign-out-button">Sign Out</div>);
jest.mock("../toggleMusic/ToggleMusicButton", () => () => <div data-testid="toggle-music-button">Toggle Music</div>);
jest.mock("../toggleTheme/ToggleThemeButton", () => () => <div data-testid="toggle-theme-button">Toggle Theme</div>);

describe('UserPage Component', () => {
  const mockUserData = {
    Username: 'JohnDoe',
    Email: 'john@example.com',
    familiarity: 'Intermediate',
    time_choice_one: '10 minutes',
    time_choice_two: '20 minutes',
    time_choice_three: '30 minutes',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (getUserInfo as jest.Mock).mockReturnValue(new Promise(() => {}));
    render(<UserPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays user data when fetch is successful', async () => {
    (getUserInfo as jest.Mock).mockResolvedValue(mockUserData);
    render(<UserPage />);

    await waitFor(() => {
      expect(screen.getByText('JohnDoe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Intermediate')).toBeInTheDocument();
      expect(screen.getByText('10 minutes')).toBeInTheDocument();
      expect(screen.getByText('20 minutes')).toBeInTheDocument();
      expect(screen.getByText('30 minutes')).toBeInTheDocument();
    });
  });

  it('displays error message when fetch fails', async () => {
    (getUserInfo as jest.Mock).mockRejectedValue(new Error('Fetch failed'));
    render(<UserPage />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch meditations. Please try again later.')).toBeInTheDocument();
    });
  });

  it('renders SignOutButton component', async () => {
    (getUserInfo as jest.Mock).mockResolvedValue(mockUserData);
    render(<UserPage />);

    await waitFor(() => {
      expect(screen.getByTestId('sign-out-button')).toBeInTheDocument();
    });
  });

  it('renders ToggleMusicButton and ToggleThemeButton components', async () => {
    (getUserInfo as jest.Mock).mockResolvedValue(mockUserData);
    render(<UserPage />);

    await waitFor(() => {
      expect(screen.getByTestId('toggle-music-button')).toBeInTheDocument();
      expect(screen.getByTestId('toggle-theme-button')).toBeInTheDocument();
    });
  });

  it('renders the logo and title', async () => {
    (getUserInfo as jest.Mock).mockResolvedValue(mockUserData);
    render(<UserPage />);

    await waitFor(() => {
      expect(screen.getByAltText('MindfulU Logo')).toBeInTheDocument();
      expect(screen.getByText('Mindful U')).toBeInTheDocument();
    });
  });
});