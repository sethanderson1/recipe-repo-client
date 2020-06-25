import React, { useContext, useState, useEffect } from 'react';
import RecipesContext from '../RecipesContext'
import config from '../config';

import './EditRecipe.css';
import TextareaAutosize from 'react-textarea-autosize';

function EditRecipe(props) {
    const context = useContext(RecipesContext)
    const { recipes } = context
    const recipe_id = props.match.params.recipeId
    const recipe = recipes.filter(recipe => recipe.id == recipe_id)
        && recipes.filter(recipe => recipe.id == recipe_id)[0]
    const category_id = recipe && recipe.category_id
    // console.log('recipe', recipe)
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
        patchRecipe({
            category_id,
            title,
            description,
            ingredients,
            directions,
        })
    }

    async function patchRecipe(fields) {
        // console.log('fields', fields)
        // console.log('recipe.category_id', recipe.category_id)
        try {
            const authToken = localStorage.getItem('authToken')
            // console.log('authToken', authToken)
            await fetch(`${config.API_ENDPOINT}/recipes/${recipe_id}`, {
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
            props.history.goBack()
            // props.history.push(`/categories/${recipe.category_id}`)
        } catch (err) {
            console.log('err', err)
        }
    }

    // todo: maybe change css names
    // console.log('recipes', recipes)

    return (
        <div className='EditRecipe__add-recipe-container
                        default-primary-color'>
            <h2 className='EditRecipe__heading
             text-primary-color'>Edit Recipe</h2>
            <form
                onSubmit={handleSubmit}
                id='EditRecipe__add-recipe'>
                <label
                    className='text-primary-color'
                    htmlFor='recipe_title'>
                    Recipe Name</label>
                <input
                    type='text'
                    name='title'
                    id='recipe_title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <label
                    className='text-primary-color'
                    htmlFor='description'>
                    Description</label>
                <textarea
                    name='description'
                    id='description'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <label
                    className='text-primary-color'
                    htmlFor='ingredients'>
                    Ingredients</label>
                <TextareaAutosize
                    minRows={10}
                    maxRows={100}
                    name='ingredients'
                    id='ingredients'
                    value={ingredients}
                    onChange={e => setIngredients(e.target.value)}
                />
                <label
                    className='text-primary-color'
                    htmlFor='directions'>
                    Instructions</label>
                <TextareaAutosize
                    minRows={10}
                    maxRows={100}
                    name='directions'
                    id='directions'
                    value={directions}
                    onChange={e => setDirections(e.target.value)}
                />
                <div className='EditRecipe__buttons-wrapper'>
                    <button
                        className='edit-button'
                        type="button"
                        onClick={handleCancel}>Cancel</button>
                    <button
                        className='edit-button'
                        type="submit"
                    >Save</button>
                </div>
            </form>
        </div>
    )
}

export default EditRecipe