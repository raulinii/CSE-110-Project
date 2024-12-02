import {render, screen, fireEvent} from "@testing-library/react";
import StressVideoView from "./StressVideoView";
describe("Check Focus Videos", () =>{
    test("check page title", () =>{
        render(<StressVideoView/>);
        const title = screen.getByText("Relaxation Meditations");
        expect(title).toBeInTheDocument
    })
})