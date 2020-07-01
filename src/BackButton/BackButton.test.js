import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import BackButton from "./BackButton";

describe("BackButton Page", () => {
  it(`renders without crashing`, () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <BackButton />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});