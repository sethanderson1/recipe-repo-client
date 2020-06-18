import React, { useContext, useState } from 'react';
import config from '../config';

import { Route, NavLink } from 'react-router-dom';
// import { categories } from '../dummyStore'
import RecipesContext from '../RecipesContext'
import './AddRecipe.css';
import TextareaAutosize from 'react-textarea-autosize';
import ValidationError from '../ValidationError/ValidationError';
// make sure TextareaAutosize behaves properly


// i will allow option to leave all but name blank
// todo: make sure code handles blank fields
// TODO: gray out save button if name is blank

function AddRecipe(props) {

    const { recipes, categories, currCategoryId } = useContext(RecipesContext)
    console.log('useContext(RecipesContext)', useContext(RecipesContext))
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [directions, setDirections] = useState('');

    const context = useContext(RecipesContext)

    function handleCancel() {
        props.history.push(`/categories/${currCategoryId}`)
    }

    // todo: find css responsible for ugly select colors
    //doesnt happen in mozilla..

    function validateName() {
        const recipeName = name.trim()
        if (recipeName.length === 0) {
            return '*name is required'
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        const { select_category } = e.target
        const { recipe_name } = e.target
        const { description } = e.target
        const { ingredients } = e.target
        const { directions } = e.target
        postRecipe({
            category_id: select_category.value,
            title: recipe_name.value,
            description: description.value,
            ingredients: ingredients.value,
            directions: directions.value,
        })
    }

    async function postRecipe(fields) {
        console.log('fields', fields)
        try {
            const authToken = localStorage.getItem('authToken')
            console.log('authToken', authToken)
            const res = await fetch(`${config.API_ENDPOINT}/recipes`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `bearer ${authToken}`
                },
                body: JSON.stringify(fields)
            })
            const postedRecipe = await res.json()
            context.handleGetRecipes()
            props.history.push(`/categories/${postedRecipe.category_id}`)
        } catch (err) {
            console.log('err', err)
        }
    }

    function renderOptions() {
        return categories.map(category => (
            <option
                key={category.id}
                // how do i reference the below ?
                id={category.id}
                value={category.id}
            >
                {category.category_name}
            </option>
        ))
    }
    // todo: maybe change css names
    return (
        <div className='AddRecipe__add-recipe-container'>
            <h2>Add Recipe</h2>
            <form onSubmit={handleSubmit}
                id='AddRecipe__add-recipe'>
                <label htmlFor='select_category'>
                    Select Category</label>
                <select
                    name='select_category'
                    id='select_category'>
                    {renderOptions()}
                </select>
                <label htmlFor='recipe_name'>
                    Recipe Name</label>
                <input type='text'
                    name='recipe_name'
                    id='recipe_name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <ValidationError
                    message={validateName()}
                    errorPosition={'relative'}
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
                    minRows={7}
                    maxRows={100}
                    name='ingredients'
                    id='ingredients'
                    value={ingredients}
                    onChange={e => setIngredients(e.target.value)}
                />
                <label htmlFor='directions'>
                    Directions</label>
                <TextareaAutosize
                    minRows={7}
                    maxRows={100}
                    name='directions'
                    id='directions'
                    value={directions}
                    onChange={e => setDirections(e.target.value)}
                />
                <div id='AddRecipe__buttons-wrapper'>
                    <button onClick={handleCancel}>Cancel</button>
                    <button
                        type="submit"
                        disabled={name.length === 0}
                    >Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddRecipe