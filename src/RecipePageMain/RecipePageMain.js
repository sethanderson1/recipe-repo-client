import React, { useContext } from 'react'
import RecipesContext from '../RecipesContext'
import './RecipePageMain.css'

export default function RecipePageMain(props) {
    const recipe_id = props.match.params.recipeId
    const recipes = useContext(RecipesContext).recipes
    const selectedRecipe = recipes.filter(recipe => recipe.id == recipe_id)
    const recipe = selectedRecipe
        && selectedRecipe[0]
    console.log('recipe', recipe)
    const currCategoryId = useContext(RecipesContext).currCategoryId
    console.log('currCategoryId', currCategoryId)
    // todo: add edit button. make sure hard to accidentally press
    // todo: add folder name that can be clicked to go back to folder (or should make a back button to go back to folder??)
    // todo: add delete button. can be out of the way
    // todo: add folder hamburger menu
    // todo: keep the all categories folder even if no folders to prefvent issues
    // todo: make forbidden when try to go to forbidden recipe
    // todo: general question how to wait for second render to display page so isnt jerky?


    function handleClickBack() {
        props.history.push(`/categories/${currCategoryId}`)
    }

    function handleDeleteRecipe() {
        // todo: delete api request 
        // go back to recipes list
        props.history.push(`/categories/${currCategoryId}`)

    }

    function handleEditRecipe() {
        // go to edit recipe page
        props.history.push(`/edit/recipe/${recipe.id}`)

    }

    function recipeNotEmpty(recipe) {
        if (recipe) {
            return (
                <div className='RecipePageMain__container'>
                <button onClick={handleClickBack}>Back</button>
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
