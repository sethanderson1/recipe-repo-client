import React, { useContext } from 'react'
import RecipesContext from '../RecipesContext'
import config from '../config';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import './RecipePageMain.css'
import BackButton from '../BackButton/BackButton';

export default function RecipePageMain(props) {

    const recipeId = props.match.params.recipeId
    const context = useContext(RecipesContext)
    const recipes = useContext(RecipesContext).recipes
    const selectedRecipe = recipes.filter(recipe => recipe.id == recipeId)
    const recipe = selectedRecipe
        && selectedRecipe[0]
    // console.log('recipe', recipe)
    // refresh resets category id to 0 .....
    let currentCategoryId = recipe && recipe.category_id

    // console.log('currentCategoryId', currentCategoryId)


    // todo: add folder name that can be clicked to go back to folder (or should make a back button to go back to folder??)
    // todo: add folder hamburger menu
    // todo: keep the all categories folder even if no folders to prefvent issues
    // todo: make forbidden when try to go to forbidden recipe
    // todo: general question how to wait for second render to display page so isnt jerky?


    function handleClickBack() {

        // props.history.push(`/categories/${currentCategoryId}`)
        props.history.goBack()
    }

    async function handleDeleteRecipe() {
        // console.log('recipeId', recipeId)
        try {
            const authToken = localStorage.getItem('authToken')
            // console.log('authToken', authToken)
            await fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "authorization": `bearer ${authToken}`
                },
            })


            // todo: ensure category page not displayed until recipes fetched 
            context.handleGetRecipes()
            props.history.push(`/categories/${currentCategoryId}`)


        } catch (err) {
            console.log('err', err)
        }
    }


    function handleEditRecipe() {
        // go to edit recipe page
        props.history.push(`/edit/recipe/${recipe.id}`)

    }

    function recipeNotEmpty(recipe) {
        if (recipe) {
            return (
                <div className='RecipePageMain__container'>
                    <BackButton handleClickBack={handleClickBack} />
                    <h1>{recipe && recipe.title}</h1>
                    <p className='RecipePageMain__description-content-container'>{recipe && recipe.description}</p>
                    <h3>Ingredients</h3>
                    <p className='RecipePageMain__ingedients-content'>{recipe && recipe.ingredients}</p>
                    <h3>Directions</h3>
                    <p className='RecipePageMain__directions-content'>{recipe && recipe.directions}</p>
                    <button onClick={handleDeleteRecipe}>Delete</button>
                    <button onClick={handleEditRecipe}>Edit</button>
                </div>
            )
        }
        return null
    }

    return (
        recipeNotEmpty(recipe)
    )
}
