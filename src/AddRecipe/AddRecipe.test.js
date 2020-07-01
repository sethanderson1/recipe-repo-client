import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AddRecipe from "./AddRecipe";

describe("AddRecipe Page", () => {
  it(`renders without crashing`, () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <AddRecipe />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});