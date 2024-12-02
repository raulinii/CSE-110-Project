// src/component/user/UserPage.test.tsx
import '@testing-library/jest-dom';

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { doc, getDoc } from 'firebase/firestore';
import UserPage from './UserPage';
import { db } from '../../config/firebase';

// Mock Firebase Firestore
jest.mock('../../config/firebase', () => ({
  db: {}
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn()
}));

// Mock dummy user data
const mockUserData = {
  Username: "test1",
  Email: "test@gmail.com",
  familiarity: "Beginner",
  time_choice_one: "Long",
  time_choice_two: "Median",
  time_choice_three: "Short"
};

describe('UserPage Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Mock successful Firestore response
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => mockUserData
    });
  });

  test('renders loading state initially', () => {
    render(<UserPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders user profile after loading', async () => {
    render(<UserPage />);
    
    await waitFor(() => {
      expect(screen.getByText('User Profile')).toBeInTheDocument();
    });

    expect(screen.getByText('test1')).toBeInTheDocument();
    expect(screen.getByText('test@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('Beginner')).toBeInTheDocument();
    expect(screen.getByText('Long')).toBeInTheDocument();
  });

  test('handles logout correctly', async () => {
    render(<UserPage />);
    
    await waitFor(() => {
      expect(screen.getByText('User Profile')).toBeInTheDocument();
    });

    const logoutButton = screen.getByText('Log Out');
    fireEvent.click(logoutButton);

    expect(screen.getByText('Please log in first to view your profile')).toBeInTheDocument();
  });

  test('handles Firestore error gracefully', async () => {
    // Mock Firestore error
    (getDoc as jest.Mock).mockRejectedValue(new Error('Firestore error'));
    
    render(<UserPage />);

    await waitFor(() => {
      expect(screen.getByText('Please log in first to view your profile')).toBeInTheDocument();
    });
  });

  test('displays all user preferences correctly', async () => {
    render(<UserPage />);

    await waitFor(() => {
      expect(screen.getByText('User Profile')).toBeInTheDocument();
    });

    // Check if all video length preferences are displayed
    expect(screen.getByText('Long')).toBeInTheDocument();
    expect(screen.getByText('Median')).toBeInTheDocument();
    expect(screen.getByText('Short')).toBeInTheDocument();
  });

  test('renders logo and header correctly', async () => {
    render(<UserPage />);

    await waitFor(() => {
      expect(screen.getByText('User Profile')).toBeInTheDocument();
    });

    expect(screen.getByAltText('MindfulU Logo')).toBeInTheDocument();
    expect(screen.getByText('Mindful U')).toBeInTheDocument();
  });

  test('handles non-existent user data', async () => {
    // Mock non-existent document
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => false,
      data: () => null
    });

    render(<UserPage />);

    await waitFor(() => {
      expect(screen.getByText('Please log in first to view your profile')).toBeInTheDocument();
    });
  });
});