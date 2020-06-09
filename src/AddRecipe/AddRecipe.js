import React, { useContext } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { categories } from '../dummyStore'
import RecipesContext from '../RecipesContext'
import { withRouter } from 'react-router-dom';
import { browserHistory } from 'react-router';
import './AddRecipe.css';
import TextareaAutosize from 'react-textarea-autosize';
// make sure TextareaAutosize behaves properly



function AddRecipe(props) {
    console.log('props', props)


    function handleCancel() {
        // go to specific categories page
        // goBack() doesn't work here for some reason
        // the first time clicked, it goes back for 
        // split second, then returns to add recipe page
        // 3 hours of trouble shooting no closer. 
        // conclusion fuck goBack()
        // categories/all not ideal but fuck it and fuck goBack()
        // props.history.goBack()
        // i'll just use state later
        props.history.push(`/categories/all`)

    }

    function handleSave() {

    }

    return (
        <div className='AddRecipe__add-recipe-container'>
            <h2>Add Recipe</h2>

            <form id='AddRecipe__add-recipe'>
                <label htmlFor='recipe-name'>
                    Recipe Name</label>
                <input type='text'
                    name='recipe-name'
                    id='recipe-name' />
                <label htmlFor='description'>
                    Description</label>
                <textarea
                    name='description'
                    id='description' />
                <label htmlFor='ingredients'>
                    Ingredients</label>
                <TextareaAutosize
                    minRows={10}
                    maxRows={100}
                    name='ingredients'
                    id='ingredients' />
                <label htmlFor='steps'>
                    Steps</label>
                <TextareaAutosize
                    minRows={10}
                    maxRows={100}
                    name='steps'
                    id='steps' />
                <div id='AddRecipe__buttons-wrapper'>
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddRecipe

