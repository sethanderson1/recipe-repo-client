import React, { useContext, useState } from 'react';
// import { Route, NavLink } from 'react-router-dom';
import ValidationError from '../ValidationError/ValidationError';
import './AddCategory.css'
import RecipesContext from '../RecipesContext';
import config from '../config';



// account for when user enters already taken username

export default function AddCategory(props) {
    console.log('props', props)
    const [name, setName] = useState('');

    const context = useContext(RecipesContext)
    console.log('context', context)


    function handleCancel() {
        // go to categories page
        props.history.push('/categories')
    }

    function validateName() {
        const categoryName = name.trim()
        if (categoryName.length === 0) {
            return '*name is required'
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        const {category_name}= e.target
        console.log('category_name.value', category_name.value)
        postCategory({
            category_name: category_name.value,
            
        })
    }

    // function postCategory() {
    //     // POST fetch
    //     // add to state
    //     props.history.push('/categories')


    // }

    async function postCategory(categoryName) {
        console.log('categoryName', categoryName.cate)
        try {
            const authToken = localStorage.getItem('authToken')
            console.log('authToken', authToken)
            const res = await fetch(`${config.API_ENDPOINT}/categories`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `bearer ${authToken}`
                },
                body: JSON.stringify(categoryName)
            })
            const postedCategory = await res.json()
            console.log('postedCategory', postedCategory)
            context.handleGetCategories()
            props.history.push(`/categories`)
        } catch (err) {
            console.log('err', err)
        }
    }

    return (
        <div className='AddCategory__add-category-container'>
            <h2>Add Category</h2>

            <form onSubmit={handleSubmit}>
                <label className='category_name'
                    htmlFor='category_name'>Category Name </label>
                <input
                    type='text'
                    id='category_name'
                    onChange={e => setName(e.target.value)} />
                <ValidationError
                    message={validateName()}
                    errorPosition={'absolute'} />
                <div className='AddCategory__buttons-wrapper'>
                    <button onClick={handleCancel}>Cancel</button>
                    <button
                        type='submit'
                        disabled={name.length === 0}
                        aria-label="Add Category"
                    >Save</button>
                </div>
            </form>
        </div>
    )
}