jest.mock("firebase/firestore", () => ({
    getFirestore: jest.fn(),
    collection: jest.fn(() => ({
      withConverter: jest.fn(() => ({
        get: jest.fn(),
      })),
    })),
    getDocs: jest.fn(() => Promise.resolve({ docs: [] })), // Mock a resolved empty response
  }));

import {render, screen, fireEvent} from "@testing-library/react";
import SleepVideoView from "./SleepVideoView";
describe("Check Sleep Videos", () =>{
    test("check page title", () =>{
        render(<SleepVideoView/>);
        const title = screen.getByText("Sleep Meditations");
        expect(title).toBeInTheDocument
    })
})
