import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import RecipeCardList from '../RecipeCardList/RecipeCardList';

export default function Dashboard(props) {
    console.log('props', props)


    function handleClickBack() {
        props.history.push('/')
    }

    function handleAddRecipe() {
        // go to add recipe page
    }
// todo: make another nav component
// 
    return (
            <div>
                <button onClick={handleClickBack}>
                    Back
                </button>
                <RecipeCardList />
                <button onClick={handleAddRecipe}>Add Recipe</button>
            </div>

    )
}


