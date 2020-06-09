import React,{useContext} from 'react'
import RecipeCard from '../RecipeCard/RecipeCard'
import recipes from '../dummyStore';
import { categories } from '../dummyStore';
import RecipesContext from '../RecipesContext'

export default function RecipeCardList(props) {
    console.log('categories', categories)

    const context = useContext(RecipesContext)
    console.log('context', context)

    // change when implement user permissions
    const ownedRecipes = recipes;
    const category_id = props.match.params.categoryId

    const category_name = category_id === 'all'
        ? 'all recipes'
        : categories.filter(category => category_id == category.id)[0].title

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
