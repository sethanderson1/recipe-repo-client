import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import RecipePageMain from "./RecipePageMain";

describe("RecipePageMain Page", () => {
    
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
        <RecipePageMain {...props}/>
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});