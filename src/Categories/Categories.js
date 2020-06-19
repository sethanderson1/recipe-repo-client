import React, { useContext, useEffect, useState } from 'react';
import config from '../config';

import {  NavLink } from 'react-router-dom';
// import { categories } from '../dummyStore'
// import RecipeCardList from '../RecipeCardList/RecipeCardList';
import RecipesContext from '../RecipesContext';
import './Categories.css'

export default function Categories(props) {
    console.log('props', props)

    const context = useContext(RecipesContext)
    console.log('context', context)
    const {categories} = context

    function handleClickBack() {
        props.history.push('/')
    }

    function handleAddCategory() {
        props.history.push('/add-category')
    }

    async function handleDeleteCategory(categoryId) {
        try {
            const authToken = localStorage.getItem('authToken')
            // console.log('authToken', authToken)
            const res = await fetch(`${config.API_ENDPOINT}/categories/${categoryId}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "authorization": `bearer ${authToken}`
                },
            })

            context.handleGetCategories()
            // props.history.push(`/categories/${currentCategoryId}`)


        } catch (err) {
            console.log('err', err)
        }
    }

    console.log('categories', categories)
    return (
        <div>
            <button onClick={handleClickBack}>back</button>
            <li key={'asdf'}
                className={'Categories__categories'}
            >
                <NavLink
                    to={`/categories/0`}
                    onClick={() => context.onChangeCurrentCategoryId(0)}
                >
                    All categories
                </NavLink>
                {/* maybe can make delete button invisible so 
                css is easier to deal with */}
                {/* <button onClick={handleClickDelete}>Delete</button> */}

            </li>
            {categories.map(category => {
                console.log('category', category)
                
                return <li key={category.id}
                    className={'Categories__categories'}
                >
                    <NavLink
                        to={`/categories/${category.id}`}
                        onClick={() => context.onChangeCurrentCategoryId(category.id)}
                    >
                        {category.category_name}

                    </NavLink>
                    <button onClick={()=>handleDeleteCategory(category.id)}>Delete</button>

                </li>
            })}
            <button 
            onClick={handleAddCategory}>Add Category</button>
        </div>
    )
}