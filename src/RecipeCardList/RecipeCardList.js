import React from 'react'
import RecipeCard from '../RecipeCard/RecipeCard'
import recipes from '../dummyStore';
import { categories } from '../dummyStore';

export default function RecipeCardList(props) {
    console.log('recipes', recipes)

    console.log('categories', categories)

    // change when implement user permissions
    const ownedRecipes = recipes;

    // const recipesFromCategory = ownedRecipes.filter()



    const category_id = props.match.params.categoryId

    function handleClickBack() {
        props.history.push(`/categories`)
    }

    const recipesFromCategory = category_id === 'all'
        ? ownedRecipes
        : ownedRecipes
            .filter(recipes => recipes.category_id == category_id)
    // is okay to coerce with '==' or is a better solution?

    return (
        <section className='RecipeCardList'>
            <button onClick={handleClickBack}>back</button>

            <ul>
                {recipesFromCategory.map(recipeCard => {
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
