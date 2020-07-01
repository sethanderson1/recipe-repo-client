import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import RecipeCardList from "./RecipeCardList";

describe("RecipeCardList Page", () => {
    
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
        <RecipeCardList {...props}/>
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});