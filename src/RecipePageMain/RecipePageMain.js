import React, { useContext } from 'react'
import RecipesContext from '../RecipesContext'
import './RecipePageMain.css'

export default function RecipePageMain(props) {
    const recipe_id = props.match.params.recipeId
    console.log('props', props)
    const recipes = useContext(RecipesContext).recipes
    console.log('recipes', recipes)
    // todo: need to account for if recipe not found?
    const recipe = recipes.filter(recipe => recipe.id == recipe_id)[0]
    console.log('recipe', recipe)
    const currCategoryId = useContext(RecipesContext).currCategoryId
    console.log('currCategoryId', currCategoryId)
    // todo: add edit button. make sure hard to accidentally press
    // todo: add folder name that can be clicked to go back to folder (or should make a back button to go back to folder??)
    // todo: add delete button. can be out of the way
    // todo: add folder hamburger menu
    // todo: keep the all categories folder even if no folders to prefvent issues



    function handleClickBack() {
        // todo: change to category it came from if have time
        props.history.push(`/categories/${currCategoryId}`)
        // seems like goBack() does what I need. any pitfalls of using goback?
        // goback not doing what i want
        // props.history.goBack()
    }

    function handleDeleteRecipe() {
        // delete api request 
        // go back to recipes list
    }

    function handleEditRecipe() {
        // go to edit recipe page
        props.history.push(`/edit/recipe/${recipe.id}`)

    }

    return (
        <div className='RecipePageMain__container'>
            <button onClick={handleClickBack}>Back</button>
            <h1>{recipe.title}</h1>
            <p className='RecipePageMain__description-content-container'>{recipe.description}</p>
            <h3>Ingredients</h3>
            <p className='RecipePageMain__ingedients-content'>{recipe.ingredients}</p>
            <h3>Directions</h3>
            <p className='RecipePageMain__directions-content'>{recipe.directions}</p>
            <button onClick={handleDeleteRecipe}>Delete</button>
            <button onClick={handleEditRecipe}>Edit</button>
        </div>
    )
}
