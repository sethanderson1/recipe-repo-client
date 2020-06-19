import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import RecipeCardList from '../RecipeCardList/RecipeCardList';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import RecipePageMain from '../RecipePageMain/RecipePageMain';
import Categories from '../Categories/Categories';
import RecipesContext from '../RecipesContext';
import AddCategory from '../AddCategory/AddCategory';
import AddRecipe from '../AddRecipe/AddRecipe';
import EditRecipe from '../EditRecipe/EditRecipe';
import config from '../config';
export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      recipes: [],
      currentCategoryId: 0
    }
  }

  componentDidMount() {
    // console.log('componentDidMount ran')
    this.handleGetCategories()
    this.handleGetRecipes()
  }

  handleCurrentCategoryId = (currentCategoryId) => {
    this.setState({
      currentCategoryId: currentCategoryId
    })
  }

  handleAddCategory = (categoryTitle) => {

  }


  handleGetCategories = async () => {
    try {
      const authToken = localStorage.getItem('authToken')
      // console.log('authToken', authToken)
      const res = await fetch(`${config.API_ENDPOINT}/categories`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "authorization": `bearer ${authToken}`
        },
      })
      const ownedCategories = await res.json()
      this.setState({
        categories: ownedCategories
      })
    } catch (err) {
      console.log('err', err)
    }
  }

  handleGetRecipes = async () => {
    try {
      const authToken = localStorage.getItem('authToken')
      // console.log('authToken', authToken)
      const res = await fetch(`${config.API_ENDPOINT}/recipes`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "authorization": `bearer ${authToken}`
        },
      })
      const ownedRecipes = await res.json()
      // console.log('ownedRecipes', ownedRecipes)
      this.setState({
        recipes: ownedRecipes
      })
    } catch (err) {
      console.log('err', err)
    }
  }

  render() {

    const value = {
      state: this.state,
      categories: this.state.categories,
      recipes: this.state.recipes,
      currentCategoryId: this.state.currentCategoryId,
      onChangeCurrentCategoryId: this.handleCurrentCategoryId,
      onAddCategory: this.handleAddCategory,
      handleGetRecipes: this.handleGetRecipes,
      handleGetCategories: this.handleGetCategories
    }

    return (
      <RecipesContext.Provider value={value}>
        {/* {console.log('value', value)} */}
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