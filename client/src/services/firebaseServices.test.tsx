import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../components/Login/Login";
import { signInWithEmailAndPassword } from "firebase/auth";
import MainPage from '../views/MainPageView';
import SleepVideoView from "../views/SleepVideoView";
import '@testing-library/jest-dom';
import { getFirestore, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import Signup from "../components/Signup/Signup";



const db = getFirestore();


describe("Store signup user information", () => {
    const mockedSignInWithEmailAndPassword = signInWithEmailAndPassword as jest.MockedFunction<typeof signInWithEmailAndPassword>;
  
    const renderComponent = () => {
      render(
        <BrowserRouter>
          <Signup/>
        </BrowserRouter>
      );
    };
    test("store user and check with user email", async () => {
        renderComponent();

        const email = "firetest@gmail.com"

        const email_holder = screen.getByPlaceholderText('Email');

        const user_holder = screen.getByPlaceholderText('Username');

        const Password = screen.getByPlaceholderText('Password');

        const Password_retype = screen.getByPlaceholderText('Confirm Password');

        const signUp = screen.getByText('Sign Up');


        fireEvent.change(email_holder, { target: { value: email } });

        fireEvent.change(Password, { target: { value: '123456' } });

        fireEvent.change(user_holder, { target: { value: 'testUser' } });

        fireEvent.change(Password_retype, { target: { value: '123456' } });

        fireEvent.click(signUp);

        


        const usersRef = collection(db, "dummy");
        const q = query(usersRef, where("Email", "==", email));
        const querySnapshot = await getDocs(q);
        querySnapshot.docs[0]; 



    });
  
    test("store user and check with user name", async () => {
        renderComponent();

        const email = "firetest@gmail.com"

        const email_holder = screen.getByPlaceholderText('Email');

        const user_holder = screen.getByPlaceholderText('Username');

        const Password = screen.getByPlaceholderText('Password');

        const Password_retype = screen.getByPlaceholderText('Confirm Password');

        const signUp = screen.getByText('Sign Up');


        fireEvent.change(email_holder, { target: { value: email } });

        fireEvent.change(Password, { target: { value: '123456' } });

        fireEvent.change(user_holder, { target: { value: 'testUser' } });

        fireEvent.change(Password_retype, { target: { value: '123456' } });

        fireEvent.click(signUp);

        


        const usersRef = collection(db, "dummy");
        const q = query(usersRef, where("Name", "==", 'testUser'));
        const querySnapshot = await getDocs(q);
        querySnapshot.docs[0]; 

    });
  });


  describe("Deal with information in the user database", () => {
    const mockedSignInWithEmailAndPassword = signInWithEmailAndPassword as jest.MockedFunction<typeof signInWithEmailAndPassword>;
  
    const renderComponent = () => {
      render(
        <BrowserRouter>
          <Login />
          <MainPage/>
          <SleepVideoView/>
        </BrowserRouter>
      );
    };
    test("Sign in with the existing user in database", async () => {
      renderComponent();

      const email = screen.getByPlaceholderText('Email');

      const Password = screen.getByPlaceholderText('Password');

      const loginButton = screen.getByText('Login');


      fireEvent.change(email, { target: { value: 't111@gmail.com' } });

      fireEvent.change(Password, { target: { value: '123456' } });

      fireEvent.click(loginButton);

      const sleepButton = screen.getByText('Sleep');

      fireEvent.click(sleepButton);


    });



    });
