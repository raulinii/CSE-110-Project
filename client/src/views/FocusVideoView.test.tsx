// import {render, screen, fireEvent} from "@testing-library/react";
// import FocusVideoView from "./FocusVideoView";
// describe("Check Focus Videos", () =>{
//     test("check page title", () =>{
//         render(<FocusVideoView/>);
//         const title = screen.getByText("Focus Meditations");
//         expect(title).toBeInTheDocument
//     })
// })

import { render, screen, waitFor } from "@testing-library/react";
import FocusVideoView from "./FocusVideoView";
import { getMeditations } from "../services/firebaseServices";
import ReactPlayer from "react-player";

// Mock the external modules and services
jest.mock("../services/firebaseServices", () => ({
  getMeditations: jest.fn(),
}));
jest.mock("react-player", () => (props: any) => (
  <div data-testid="react-player" data-url={props.url} />
));

// Test suite
describe("FocusVideoView", () => {
  const mockMeditations = [
    { id: "1", link: "https://example.com/video1" },
    { id: "2", link: "https://example.com/video2" },
  ];

  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls
  });

  test("renders loading state initially", () => {
    (getMeditations as jest.Mock).mockReturnValue(new Promise(() => {})); // Mock pending promise

    render(<FocusVideoView />);

    expect(screen.getByText(/Focus Meditations/i)).toBeInTheDocument();
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("renders error message when fetch fails", async () => {
    (getMeditations as jest.Mock).mockRejectedValue(new Error("Fetch failed"));

    render(<FocusVideoView />);

    await waitFor(() =>
      expect(
        screen.getByText(/Failed to fetch meditations/i)
      ).toBeInTheDocument()
    );
  });

  test("renders video list on successful fetch", async () => {
    (getMeditations as jest.Mock).mockResolvedValue(mockMeditations);

    render(<FocusVideoView />);

    // Wait for videos to load
    expect(screen.getByText(/Focus Meditations/i)).toBeInTheDocument();
    // const players = screen.getAllByTestId("react-player");
    // expect(players).toHaveLength(2);
    // expect(players[0]).toHaveAttribute("data-url", "https://example.com/video1");
    // expect(players[1]).toHaveAttribute("data-url", "https://example.com/video2");
  });
});
