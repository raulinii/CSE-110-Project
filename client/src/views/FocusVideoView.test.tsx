import {render, screen, fireEvent} from "@testing-library/react";
import FocusVideoView from "./FocusVideoView";
describe("Check Focus Videos", () =>{
    test("check page title", () =>{
        render(<FocusVideoView/>);
        const title = screen.getByText("Focus Meditations");
        expect(title).toBeInTheDocument
    })
})