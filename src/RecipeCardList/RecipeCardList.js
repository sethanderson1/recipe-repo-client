import React, { useContext } from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';
import RecipesContext from '../RecipesContext';
import BackButton from '../BackButton/BackButton';
import MainNav from '../MainNav/MainNav';
import './RecipeCardList.css';

export default function RecipeCardList(props) {
    const context = useContext(RecipesContext);
    const { recipes, categories } = context;
    const category_id = props.match.params.categoryId;
    const selectedCategory = categories.filter(category => category_id == category.id)[0];
    const category_name = category_id == 0
        ? 'All Recipes'
        : selectedCategory
        && selectedCategory.category_name;

    function handleClickBack() {
        props.history.push(`/categories`);
    };

    const recipesFromCategory = category_id == 0
        ? recipes
        : recipes
            .filter(recipe => recipe.category_id == category_id);

    return (
        <section className='RecipeCardList__container'>
            <BackButton 
            value='back-button'
            handleClickBack={handleClickBack} />
            <MainNav />
            <div className='RecipeCardList__category-title-container
            default-primary-color'>
                <h1 className='RecipeCardList__category-title'>
                    {category_name}
                </h1>
            </div>
            <section className='RecipeCardList__list-container '>
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
                    })}
                </ul>
                <button
                    className='RecipeCardList__add-recipe-btn'
                    aria-label='Add-Recipe'
                    onClick={() => props.history.push('/add-recipe')}>Add Recipe</button>
                <div className='bottom-color-area 
                       default-primary-color'>
                </div>
            </section>
        </section>
    );
};
