import React from 'react';
import { Route, Link } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import RecipeCardList from '../RecipeCardList/RecipeCardList';
import SignUp from '../SignUp/SignUp';
import RecipePageMain from '../RecipePageMain/RecipePageMain';
import Categories from '../Categories/Categories';
import RecipesContext from '../RecipesContext';
import recipes from "../dummyStore";
import AddCategory from '../AddCategory/AddCategory';
import AddRecipe from '../AddRecipe/AddRecipe';

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
          <Route
            path={'/add-category'}
            component={AddCategory}
          />       
             <Route
          path={'/add-recipe'}
          component={AddRecipe}
        />
        </main>
      </div>
    </RecipesContext.Provider>

  );
}

export default App;