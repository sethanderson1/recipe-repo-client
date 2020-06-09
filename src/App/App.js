import React from 'react';
import { Route, Link } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import Recipes from '../Recipes/Recipes';
import RecipeCardList from '../RecipeCardList/RecipeCardList';
import SignUp from '../SignUp/SignUp';
import RecipePageMain from '../RecipePageMain/RecipePageMain';
import Categories from '../Categories/Categories';
import RecipesContext from '../RecipesContext';
import recipes from "../dummyStore";

function App() {

  const value = {
    recipes
  }

  return (
    <RecipesContext.Provider value={value}>
      <div className="App">

        <main>
          <Route
            exact
            path={'/'}
            component={LandingPage}
          />
          <Route
            path={'/signup'}
            component={SignUp}
          />
          <Route
            exact
            path={'/categories'}
            component={Categories}
          />
          <Route
            exact
            path={'/categories/:categoryId'}
            component={RecipeCardList}
          />
          <Route
            path={'/recipe/:recipeId'}
            component={RecipePageMain}
          />
        </main>
      </div>
    </RecipesContext.Provider>

  );
}

export default App;