import React, { useContext, useState } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { categories } from '../dummyStore'
import RecipesContext from '../RecipesContext'
import './AddRecipe.css';
import TextareaAutosize from 'react-textarea-autosize';
import ValidationError from '../ValidationError/ValidationError';
// make sure TextareaAutosize behaves properly


// i will allow option to leave all but name blank
// todo: make sure code handles blank fields

function AddRecipe(props) {



    const { recipes, categories, currCategoryId } = useContext(RecipesContext)
    console.log('useContext(RecipesContext)', useContext(RecipesContext))

    const [name, setName] = useState('');

    function handleCancel() {
        props.history.push(`/categories/${currCategoryId}`)
    }
    function handleSave() {
        // add new recipe
    }

    // todo: find css responsible for ugly select colors
    //doesnt happen in mozilla..
    function renderOptions() {
        return categories.map(category => (
            console.log('category', category),

            <option
                key={category.id}>
                {category.title}
            </option>
        )

        )
    }


    function updateName(e) {
        setName(e.target.value)
    }

    function validateName() {
        const recipeName = name.trim()
        if (recipeName.length === 0) {
            return '*name is required'
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        postRecipe()

    }

    function postRecipe() {
        // POST fetch
        // then push history to posted recipe
        // 
    }

    return (
        <div className='AddRecipe__add-recipe-container'>
            <h2>Add Recipe</h2>

            <form onSubmit={handleSubmit}
                id='AddRecipe__add-recipe'>
                <label htmlFor='select-category'>
                    Select Category</label>
                <select
                    name='select-category'
                    id='select-category'>
                    {renderOptions()}
                </select>
                <label htmlFor='recipe-name'>
                    Recipe Name</label>
                <input type='text'
                    name='recipe-name'
                    id='recipe-name'
                    onChange={updateName}
                />
                <ValidationError
                    message={validateName()}
                    errorPosition={'relative'}
                />
                <label htmlFor='description'>
                    Description</label>
                <textarea
                    name='description'
                    id='description' />
                <label htmlFor='ingredients'>
                    Ingredients</label>
                <TextareaAutosize
                    minRows={7}
                    maxRows={100}
                    name='ingredients'
                    id='ingredients' />
                <label htmlFor='directions'>
                    Directions</label>
                <TextareaAutosize
                    minRows={7}
                    maxRows={100}
                    name='directions'
                    id='directions' />
                <div id='AddRecipe__buttons-wrapper'>
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddRecipe

