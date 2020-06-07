import React, { useContext } from 'react'
import RecipesContext from '../RecipesContext'

export default function RecipePageMain(props) {
    const recipe_id = props.match.params.recipeId
    console.log('props', props)
    const recipes = useContext(RecipesContext).recipes
    // todo: need to account for if recipe not found?
    const recipe = recipes.filter(recipe => recipe.id == recipe_id)[0]

    // todo: add edit button. make sure hard to accidentally press
    // todo: add folder name that can be clicked to go back to folder (or should make a back button to go back to folder??)
    // todo: add delete button. can be out of the way
    // todo: add folder hamburger menu
    // todo: 

    function handleClickBack() {
        props.history.push('/dashboard')
    }

    function handleDeleteRecipe() {
        // delete api request 
        // go back to recipes list
    }

    function handleEditRecipe() {
        // go to edit recipe page
        // 
    }

    return (
        <div>
            <button onClick={handleClickBack}>Back</button>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <h3>Ingredients</h3>
            <p>{recipe.ingredients}</p>
            <h3>Steps</h3>
            <p>{recipe.steps}</p>
            <button onClick={handleDeleteRecipe}>Delete</button>
            <button onClick={handleEditRecipe}>Edit</button>
        </div>
    )
}
