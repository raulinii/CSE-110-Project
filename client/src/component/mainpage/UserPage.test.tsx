import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getMeditations } from '../../services/firebaseServices';
import UserPage from './UserPage';
import { getUserInfo } from "../../services/firebaseServices";
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { auth } from "../../../src/firebaseConfig" 
import { initializeApp } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth"
import { User } from '../../types/User'
import {ToggleMusicButton } from "../toggleMusic/ToggleMusicButton"

const mockUserData: User = {
  id: 'Y4b12Gk4EGMBy7lJaZyBWM4qSH63', // Provided id
  Username: '111',
  Email: 't111@gmail.com',
  Password: '123456',
  familiarity: 'Casual', 
  time_choice_one: 'Long', 
  time_choice_two: 'Median',
  time_choice_three: 'Short',
};

jest.mock('../../services/firebaseServices', () => ({
  getUserInfo: jest.fn(),
}));




  describe('UserPage Component', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('displays user data after successful login', async () => {
  
      render(<UserPage />);
      render(<ToggleMusicButton />);
      const element = screen.getByRole('button');

      const style = window.getComputedStyle(element);

    });
  });


  describe('User page Info', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('displays user data after successful login', async () => {
      (getUserInfo as jest.Mock).mockResolvedValue(mockUserData);
      console.log('hello world', getUserInfo);
  
      render(<UserPage />);

      expect(screen.getByText("User Profile")).toBeInTheDocument();
      
    });
  });