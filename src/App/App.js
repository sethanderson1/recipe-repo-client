import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import RecipeCardList from '../RecipeCardList/RecipeCardList';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import RecipePageMain from '../RecipePageMain/RecipePageMain';
import Categories from '../Categories/Categories';
import RecipesContext from '../RecipesContext';
import recipes from "../dummyStore";
import { categories } from "../dummyStore";
import AddCategory from '../AddCategory/AddCategory';
import AddRecipe from '../AddRecipe/AddRecipe';
import EditRecipe from '../EditRecipe/EditRecipe';


export default class App extends Component {


  constructor(props) {


    super(props)
    this.state = {
      categories: categories,
      recipes,
      currCategoryId: 'all'
    }
  }


  handleCurrCategoryId = (currCategoryId) => {
    this.setState({
      currCategoryId: currCategoryId
    })
  }

  handleAddCategory = (categoryTitle) => {
    // // fix this horror show
    // const newCategory = {
    //   id: 234234,
    //   title: categoryTitle,
    //   author_id: null
    // }
    // this.setState({
    //   categories: [newCategory,...this.state.categories]
    // })


  }

  render() {


    const value = {
      categories: this.state.categories,
      recipes: this.state.recipes,
      currCategoryId: this.state.currCategoryId,
      onChangeCurrCategoryId: this.handleCurrCategoryId,
      onAddCategory: this.handleAddCategory
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
              path={'/login'}
              component={Login}
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
            <Route
              path={'/edit/recipe/:recipeId'}
              component={EditRecipe}
            />
          </main>
        </div>
      </RecipesContext.Provider>
    );
  }
}






