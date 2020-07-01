import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Categories from "./Categories";

describe("Categories Page", () => {
  it(`renders without crashing`, () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});