import {render, screen, fireEvent} from "@testing-library/react";
import VideoPlayerView from "./MainPageView";
import { MemoryRouter } from "react-router-dom";

describe("Check resource links", () =>{
    test("check caps link", () =>{
        render(
            <MemoryRouter>
                <VideoPlayerView/>
                </MemoryRouter>
    );
    const createLinkButton = screen.getByText("Beginner");
    fireEvent.click(createLinkButton);
    const caps = screen.getByText("CAPS");

    expect(caps).toBeInTheDocument();

    expect(caps).toHaveAttribute("href", "https://caps.ucsd.edu/"); // Replace with actual URL

    fireEvent.click(createLinkButton);

    })
})


test("test navigation to Relax player page", () => {
    render(
      <MemoryRouter>
        <VideoPlayerView />
      </MemoryRouter>
    );
    const createLinkButton = screen.getByText("Beginner");
    fireEvent.click(createLinkButton);
    const sleepLink = screen.getByText("Stress");
    expect(sleepLink).toBeInTheDocument();
  
    fireEvent.click(sleepLink);
    
  
  });



test("test navigation to sleep player page", () => {
    render(
      <MemoryRouter>
        <VideoPlayerView />
      </MemoryRouter>
    );
    const createLinkButton = screen.getByText("Beginner");
    fireEvent.click(createLinkButton);
    const sleepLink = screen.getByText("Sleep");
    expect(sleepLink).toBeInTheDocument();
  
    fireEvent.click(sleepLink);
  
  });

  test("test navigation to Focus player page", () => {
    render(
      <MemoryRouter>
        <VideoPlayerView />
      </MemoryRouter>
    );
    const createLinkButton = screen.getByText("Beginner");
    fireEvent.click(createLinkButton);
    const sleepLink = screen.getByText("Focus");
    expect(sleepLink).toBeInTheDocument();
  
    fireEvent.click(sleepLink);
    
  
  });