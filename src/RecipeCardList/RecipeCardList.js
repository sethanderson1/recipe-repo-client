import React, { useContext } from 'react'
import RecipeCard from '../RecipeCard/RecipeCard'
import RecipesContext from '../RecipesContext'
import './RecipeCardList.css'
import BackButton from '../BackButton/BackButton';

export default function RecipeCardList(props) {
    const context = useContext(RecipesContext)
    // console.log('context', context)
    const { recipes, categories } = context

    // console.log('recipes', recipes)
    const category_id = props.match.params.categoryId

    const selectedCategory = categories.filter(category => category_id == category.id)[0]
    // console.log('selectedCategory', selectedCategory)
    const category_name = category_id == 0
        ? 'all recipes'
        : selectedCategory
        && selectedCategory.category_name

    function handleClickBack() {
        props.history.push(`/categories`)
    }

    const recipesFromCategory = category_id == 0
        ? recipes
        : recipes
            .filter(recipe => recipe.category_id == category_id)

    // is okay to coerce with '==' or is a better solution?

    // console.log('recipesFromCategory', recipesFromCategory)

    return (
        <section className='RecipeCardList__container 
        '>
            <BackButton handleClickBack={handleClickBack} />
            <div className='RecipeCardList__category-title-container
            default-primary-color'>
                <h1 className='RecipeCardList__category-title 
             '>{category_name}</h1>
            </div>
            <section className='RecipeCardList__list-container 
            dark-primary-color  '>
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
                <button
                    className='RecipeCardList__add-recipe-btn 
                            '
                    onClick={() => props.history.push('/add-recipe')}>Add Recipe</button>

            </section>
        </section>

    )
}
