import React, { useContext, useEffect, useState } from 'react';
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

    function handleClickDelete() {
        // delete
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
                <button onClick={handleClickDelete}>delete</button>

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
                    <button onClick={handleClickDelete}>Delete</button>

                </li>
            })}
            <button 
            onClick={handleAddCategory}>Add Category</button>
        </div>
    )
}