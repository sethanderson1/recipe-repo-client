import React, { useContext } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { categories } from '../dummyStore'
import  recipes  from '../dummyStore'
import RecipesContext from '../RecipesContext'
// import './AddRecipe.css';
import TextareaAutosize from 'react-textarea-autosize';
// make sure TextareaAutosize behaves properly


function EditRecipe(props) {
    console.log('props', props)
    console.log('recipes', recipes)

    const recipe_id = props.match.params.recipeId
    const recipe = recipes.filter(recipe=>recipe.id==recipe_id)[0]
    const {id, title,description,ingredients,steps} = recipe
    
    console.log('recipe', recipe)
 
    function handleCancel() {
        // go to specific categories page
        props.history.push(`/recipe/${recipe_id}`)
    }

    function handleSave() {

    }

    return (
        <div className='AddRecipe__add-recipe-container'>
            <h2>Edit Recipe</h2>

            <form id='AddRecipe__add-recipe'>
                <label htmlFor='recipe-name'>
                    Recipe Name</label>
                <input type='text'
                    name='recipe-name'
                    id='recipe-name' 
                    value={title}
                    />
                <label htmlFor='description'>
                    Description</label>
                <textarea
                    name='description'
                    id='description' 
                    value={description}
                    />
                <label htmlFor='ingredients'>
                    Ingredients</label>
                <TextareaAutosize
                    minRows={10}
                    maxRows={100}
                    name='ingredients'
                    id='ingredients' 
                    value={ingredients}
                    />
                <label htmlFor='steps'>
                    Steps</label>
                <TextareaAutosize
                    minRows={10}
                    maxRows={100}
                    name='steps'
                    id='steps' 
                    value={steps}
                    />
                <div id='AddRecipe__buttons-wrapper'>
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </div>
            </form>
        </div>
    )
}

export default EditRecipe