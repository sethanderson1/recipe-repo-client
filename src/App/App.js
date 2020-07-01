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
    };
  };

  handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('currentCategoryId');
    this.setState({
    isLoggedIn: false
    });
  };

  handleChangeIsLoggedIn = (status) => {
    this.setState({
      isLoggedIn: status
    });
  };

  componentDidMount() {
    this.checkLoggedInStatus();
    this.handleGetCategories();
    this.handleGetRecipes();
    sessionStorage.setItem('currentCategoryId', '0');
  };

  checkBeforeAnything = () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      return (
        <Redirect to={'/'} />
      )
    };
  };

  checkLoggedInStatus = () => {
    const authToken = localStorage.getItem('authToken');
    const loggedInStatus = authToken ? true : false;
    this.setState({
      isLoggedIn: loggedInStatus
    });
  };

  handleCurrentCategoryId = (currentCategoryId) => {
    sessionStorage.setItem('currentCategoryId', `${currentCategoryId}`);
    this.setState({
      currentCategoryId
    });
  };

  handleGetCategories = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const res = await fetch(`${config.API_ENDPOINT}/categories`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "authorization": `bearer ${authToken}`
        },
      });
      const ownedCategories = await res.json();
      this.setState({
        categories: ownedCategories
      });
    } catch (err) {
      
    };
  };

  handleGetRecipes = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const res = await fetch(`${config.API_ENDPOINT}/recipes`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "authorization": `bearer ${authToken}`
        },
      });
      const ownedRecipes = await res.json();
      this.setState({
        recipes: ownedRecipes
      });
    } catch (err) {
      
    };
  };

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
    };

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
            <PrivateRoute>
              <Route
                path={'/recipes/:recipeId'}
                component={RecipePageMain}
              />
            </PrivateRoute>
            <PrivateRoute>
              <Route
                path={'/add-category'}
                component={AddCategory}
              />
            </PrivateRoute>
            <PrivateRoute>
              <Route
                path={'/add-recipe'}
                component={AddRecipe}
              />
            </PrivateRoute>
            <PrivateRoute>
              <Route
                path={'/edit/recipes/:recipeId'}
                component={EditRecipe}
              />
            </PrivateRoute>
          </main>
        </div>
      </RecipesContext.Provider>
    );
  };
};