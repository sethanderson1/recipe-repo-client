import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import RecipeCardList from '../RecipeCardList/RecipeCardList';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import RecipePageMain from '../RecipePageMain/RecipePageMain';
import Categories from '../Categories/Categories';
import RecipesContext from '../RecipesContext';
// import recipes from "../dummyStore";
// import { categories } from "../dummyStore";
import AddCategory from '../AddCategory/AddCategory';
import AddRecipe from '../AddRecipe/AddRecipe';
import EditRecipe from '../EditRecipe/EditRecipe';
export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      recipes: [],
      currCategoryId: 'all'
    }
  }

  componentDidMount() {

    this.handleGetCategories()
    this.handleGetRecipes()
  }

  handleCurrCategoryId = (currCategoryId) => {
    this.setState({
      currCategoryId: currCategoryId
    })
  }

  handleAddCategory = (categoryTitle) => {

  }


  async handleGetCategories() {
    try {
      const authToken = localStorage.getItem('authToken')
      console.log('authToken', authToken)
      const res = await fetch(`http://localhost:8000/api/categories`, {
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

  async handleGetRecipes() {
    try {
      const authToken = localStorage.getItem('authToken')
      console.log('authToken', authToken)
      const res = await fetch(`http://localhost:8000/api/recipes`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "authorization": `bearer ${authToken}`
        },
      })
      const ownedRecipes = await res.json()
      this.setState({
        recipes: ownedRecipes
      })
    } catch (err) {
      console.log('err', err)
    }
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
        {console.log('value', value)}
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






