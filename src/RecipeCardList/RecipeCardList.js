import React from 'react'
import RecipeCard from '../RecipeCard/RecipeCard'
import  recipes  from '../dummyStore';
import {categories} from '../dummyStore';

export default function RecipeCardList() {
    console.log('recipes', recipes)
    
    console.log('categories', categories)

    // change when implement user permissions
    const ownedRecipes = recipes;


    return (
        <section className='RecipeCardList'>
            <ul>
                {ownedRecipes.map(recipeCard => {
                    const { id, title, description } = recipeCard
                    return <li key={recipeCard.id}>
                        <RecipeCard
                            id={id}
                            title={title}
                            description={description}

                        />

                    </li>
                }
                )}
            </ul>
        </section>

    )
}
