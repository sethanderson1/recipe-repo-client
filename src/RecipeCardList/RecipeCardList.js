import React, { useContext } from 'react'
import RecipeCard from '../RecipeCard/RecipeCard'
// import recipes from '../dummyStore';
// import { categories } from '../dummyStore';
import RecipesContext from '../RecipesContext'
import './RecipeCardList.css'

export default function RecipeCardList(props) {
    const context = useContext(RecipesContext)
    console.log('context', context)
    const { recipes, categories } = context

    console.log('recipes', recipes)
    const category_id = props.match.params.categoryId


    const selectedCategory = categories.filter(category => category_id == category.id)[0]
    const category_name = category_id === 'all'
        ? 'all recipes'
        : selectedCategory
        && selectedCategory.category_name


    function handleClickBack() {
        props.history.push(`/categories`)
    }


    const recipesFromCategory = category_id === 'all'
    ? recipes
    : recipes
    .filter(recipe => recipe.category_id == category_id)
    
    // is okay to coerce with '==' or is a better solution?
    
    console.log('recipesFromCategory', recipesFromCategory)

    return (
        <section className='RecipeCardList'>
            <button onClick={handleClickBack}>back</button>
            <h3>{category_name}</h3>
            <ul>
                {recipesFromCategory.map(recipeCard => {
                    const { id, title, description } = recipeCard

                    return <li key={recipeCard.id}>
                        <RecipeCard
                            id={id}
                            title={title}
                            description={description}
                            category_id={category_id}
                        />
                    </li>
                }
                )}
            </ul>
            <button onClick={() => props.history.push('/add-recipe')}>Add Recipe</button>
        </section>

    )
}
