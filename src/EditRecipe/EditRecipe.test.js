import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import EditRecipe from "./EditRecipe";

describe("EditRecipe Page", () => {
    
  it(`renders without crashing`, () => {
    const div = document.createElement("div");
    const props = {
        match:{
            params: {
                recipeId:1
            }
        }
    }
    ReactDOM.render(
      <BrowserRouter>
        <EditRecipe {...props}/>
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});