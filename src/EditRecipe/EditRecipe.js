import React, { useContext, useState, useEffect } from 'react';
import { Route, NavLink } from 'react-router-dom';
import RecipesContext from '../RecipesContext'
import config from '../config';

// import './AddRecipe.css';
import TextareaAutosize from 'react-textarea-autosize';
// make sure TextareaAutosize behaves properly

function EditRecipe(props) {
    const context = useContext(RecipesContext)
    const { recipes } = context
    const recipe_id = props.match.params.recipeId
    const recipe = recipes.filter(recipe => recipe.id == recipe_id)
    && recipes.filter(recipe => recipe.id == recipe_id)[0]
    
    console.log('recipe', recipe)
    const titleInitialValue = recipe && recipe.title
    const descriptionInitialValue = recipe && recipe.description
    const ingredientsInitialValue = recipe && recipe.ingredients
    const directionsInitialValue = recipe && recipe.directions

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [directions, setDirections] = useState('')

    useEffect(() => { setTitle(titleInitialValue) }, [titleInitialValue])
    useEffect(() => { setDescription(descriptionInitialValue) }, [descriptionInitialValue])
    useEffect(() => { setIngredients(ingredientsInitialValue) }, [ingredientsInitialValue])
    useEffect(() => { setDirections(directionsInitialValue) }, [directionsInitialValue])

    // TODO: fix this error if i must
    // only get error when refresh, not when navigate to there
    // index.js:1 Warning: A component is changing a controlled input of type text to be uncontrolled. Input elements should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://fb.me/react-controlled-components
    // in input (at EditRecipe.js:65)

    function handleCancel() {
        // props.history.push(`/recipe/${recipe_id}`)
        props.history.goBack()
    }


    function handleSubmit(e) {
        e.preventDefault()
        const { recipe_title } = e.target
        console.log('e.target', e.target)
        const { description } = e.target
        const { ingredients } = e.target
        const { directions } = e.target
        patchRecipe({
            category_id: recipe.category_id,
            title: recipe_title.value,
            description: description.value,
            ingredients: ingredients.value,
            directions: directions.value,
        })
    }
    
    // next steps: when refresh page, shouldnt lose currentCategoryId
    // now, it seems to be getting set back to category id = 0
 
    async function patchRecipe(fields) {
        console.log('fields', fields)
        console.log('recipe.category_id', recipe.category_id)
        try {
            const authToken = localStorage.getItem('authToken')
            console.log('authToken', authToken)
            const res = await fetch(`${config.API_ENDPOINT}/recipes/${recipe_id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "authorization": `bearer ${authToken}`
                },
                body: JSON.stringify(fields)
            })
            // const postedRecipe = await res.json()
            // console.log('postedRecipe', postedRecipe)
            context.handleGetRecipes()
            props.history.push(`/categories/${recipe.category_id}`)
        } catch (err) {
            console.log('err', err)
        }
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
                    value={ingredients}
                    onChange={e => setIngredients(e.target.value)}
                />
                <label htmlFor='directions'>
                    Instructions</label>
                <TextareaAutosize
                    minRows={10}
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
                    >Save</button>
                </div>
            </form>
        </div>
    )
}

export default EditRecipe