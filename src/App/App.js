import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import RecipeCardList from '../RecipeCardList/RecipeCardList';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import RecipePageMain from '../RecipePageMain/RecipePageMain';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
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
      currentCategoryId: 0,
      isLoggedIn: true
    }
  }



  handleLogout = () => {
    console.log('handleLogout ran')
    localStorage.removeItem('authToken')
    this.setState({
      isLoggedIn: false
    })
  }

  handleChangeIsLoggedIn = (status) => {
    this.setState({
      isLoggedIn: status
    })
  }

  componentDidMount() {
    console.log('componentDidMount ran')
    this.checkLoggedInStatus()
    this.handleGetCategories()
    this.handleGetRecipes()
  }


  // next steps fiugre o  ut how to prevent red scary error when 
  // user not logged in but goes to /categories or /recipe
  checkBeforeAnything = () => {
    console.log('checkBeforeAnything ran')
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      return (
        <Redirect to={'/'} />
      )
    }
  }

  checkLoggedInStatus = () => {
    const authToken = localStorage.getItem('authToken')
    const loggedInStatus = authToken ? true : false
    this.setState({
      isLoggedIn: loggedInStatus
    })
  }

  handleCurrentCategoryId = (currentCategoryId) => {
    sessionStorage.setItem('currentCategoryId', `${currentCategoryId}`)
    this.setState({
      currentCategoryId
    })
  }

  handleGetCategories = async () => {
    try {
      const authToken = localStorage.getItem('authToken')
      // console.log('authToken', authToken)
      console.log('config.API_ENDPOINT', config.API_ENDPOINT)
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
      isLoggedIn: this.state.isLoggedIn,
      onChangeCurrentCategoryId: this.handleCurrentCategoryId,
      handleGetRecipes: this.handleGetRecipes,
      handleGetCategories: this.handleGetCategories,
      handleLogout: this.handleLogout,
      handleChangeIsLoggedIn: this.handleChangeIsLoggedIn,
      checkBeforeAnything: this.checkBeforeAnything
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
            <PrivateRoute>
              <Route
                exact
                path={'/categories'}
                component={Categories}
              />
            </PrivateRoute>
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