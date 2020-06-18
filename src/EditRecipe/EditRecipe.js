import React, { useContext, useState, useEffect } from 'react';
import { Route, NavLink } from 'react-router-dom';
// import { categories } from '../dummyStore'
// import  recipes  from '../dummyStore'
import RecipesContext from '../RecipesContext'
// import './AddRecipe.css';
import TextareaAutosize from 'react-textarea-autosize';
// make sure TextareaAutosize behaves properly


function EditRecipe(props) {
    const context = useContext(RecipesContext)

    
    const { recipes } = context
    const recipe_id = props.match.params.recipeId
    const recipe = recipes.filter(recipe => recipe.id == recipe_id)
    && recipes.filter(recipe => recipe.id == recipe_id)[0]
    const titleInitialState = recipe && recipe.title
    const descriptionInitialState = recipe && recipe.description
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    useEffect(() => { setTitle(titleInitialState) }, [titleInitialState])
    // FINALLY figured out how to set initial values in edit forms
    console.log('title', title)
    // index.js:1 Warning: A component is changing a controlled input of type text to be uncontrolled. Input elements should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://fb.me/react-controlled-components
    // in input (at EditRecipe.js:62)
    
    // didnt realize that user cant delete entire entry
    // it will just re initialize when back to no letters....
    // implement wasTouched for the fields?? this getting complicated
    // useEffect(() => {
        //     if (!title) {
            //         setTitle(titleInitialState)
    //     }
    //     if (!description) {
        //         setDescription(descriptionInitialState)
    //     }
    // }, [title, titleInitialState, description, descriptionInitialState])

    function handleCancel() {
        props.history.push(`/recipe/${recipe_id}`)
    }

    function handleSubmit(e) {
        e.preventDefault()
        // POST data
        postRecipe(e.target)
        console.log('e.target', e.target.title.value)
        // go back to recipes page
        // props.history.push(`/recipe/${recipe_id}`)
    }
    
    function postRecipe(recipeFields) {
        
    }
    
    // todo: maybe change css names
    console.log('recipes', recipes)

    return (

        <div className='AddRecipe__add-recipe-container'>
            <h2>Edit Recipe</h2>

            <form
                onSubmit={handleSubmit}
                id='AddRecipe__add-recipe'>
                <label htmlFor='recipe_title'>
                    Recipe Name</label>
                <input type='text'
                    name='title'
                    id='recipe_title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <label htmlFor='description'>
                    Description</label>
                <textarea
                    name='description'
                    id='description'
                    value={description}
                    onChange={e => setDescription(e.target.value)}

                />
                <label htmlFor='ingredients'>
                    Ingredients</label>
                <TextareaAutosize
                    minRows={10}
                    maxRows={100}
                    name='ingredients'
                    id='ingredients'
                // value={ingredients}
                />
                <label htmlFor='instructions'>
                    Instructions</label>
                <TextareaAutosize
                    minRows={10}
                    maxRows={100}
                    name='instructions'
                    id='instructions'
                // value={instructions}
                />
                <div id='AddRecipe__buttons-wrapper'>
                    <button onClick={handleCancel}>Cancel</button>
                    <button
                        type="submit"
                    >Save</button>
                </div>
            </form>
        </div>
    )
}

export default EditRecipe