import React, { useContext, useState } from 'react';
import config from '../config';
import RecipesContext from '../RecipesContext'
import './AddRecipe.css';
import TextareaAutosize from 'react-textarea-autosize';
import ValidationError from '../ValidationError/ValidationError';

function AddRecipe(props) {
    // console.log('useContext(RecipesContext)', useContext(RecipesContext))
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [directions, setDirections] = useState('');
    const context = useContext(RecipesContext)
    // console.log('context', context)
    const { categories } = context

    function handleCancel() {
        props.history.goBack()
        // props.history.push(`/categories/${currentCategoryId}`)
    }
    // console.log('props.history', props.history)

    function validateName() {
        const recipeName = name.trim()
        if (recipeName.length === 0) {
            return ` *name is required `
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        const { select_category } = e.target
        postRecipe({
            category_id: select_category.value,
            title: name,
            description,
            ingredients,
            directions,
        })
    }

    async function postRecipe(fields) {
        // console.log('fields', fields)
        try {
            const authToken = localStorage.getItem('authToken')
            // console.log('authToken', authToken)
            const res = await fetch(`${config.API_ENDPOINT}/recipes`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `bearer ${authToken}`
                },
                body: JSON.stringify(fields)
            })
            await res.json()
            context.handleGetRecipes()
            // props.history.push(`/categories/${postedRecipe.category_id}`)
            props.history.goBack()
        } catch (err) {
            console.log('err', err)
        }
    }

    function renderOptions() {
        return categories.map(category => (
            <option
                key={category.id}
                id={category.id}
                value={category.id}
            >
                {category.category_name}
            </option>
        ))
    }

    console.log('toggleHoverClass()', toggleHoverClass())
    function toggleHoverClass() {
        if (name.length !== 0) {
            return ['AddRecipe__submit', 'allowHover'].join(' ')
        } else {
            return 'AddRecipe__submit'

        }
    }

    return (
        <div className='AddRecipe__outermost-wrapper
        default-primary-color'>

            <div className='AddRecipe__add-recipe-container
        default-primary-color'>
                <h2 className='AddRecipe__heading 
            text-primary-color'>Add Recipe</h2>
                <form
                    onSubmit={handleSubmit}
                    className='AddRecipe__add-recipe'>
                    <label
                        className='text-primary-color'
                        htmlFor='select_category'>
                        Select Category</label>
                    <select
                        className='select-category'
                        name='select_category'
                        id='select_category'>
                        {renderOptions()}
                    </select>
                    <label
                        className='text-primary-color'
                        htmlFor='recipe_name'>
                        Recipe Name</label>
                    <input type='text'
                        name='recipe_name'
                        id='recipe_name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <ValidationError
                        className='accent-color'
                        message={validateName()}
                        errorPosition={'relative'}
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
                        minRows={7}
                        maxRows={100}
                        name='ingredients'
                        id='ingredients'
                        value={ingredients}
                        onChange={e => setIngredients(e.target.value)}
                    />
                    <label
                        className='text-primary-color'
                        htmlFor='directions'>
                        Directions</label>
                    <TextareaAutosize
                        minRows={7}
                        maxRows={100}
                        name='directions'
                        id='directions'
                        value={directions}
                        onChange={e => setDirections(e.target.value)}
                    />
                    <div className='AddRecipe__buttons-wrapper'>
                        <button
                            className='AddRecipe__cancel-button 
                        allowHover'
                            type="button"
                            onClick={handleCancel}>Cancel</button>
                        <button
                            className={toggleHoverClass()}
                            type="submit"
                            disabled={name.length === 0}
                        >Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddRecipe