import React, { useContext } from 'react';
import RecipesContext from '../RecipesContext';
import config from '../config';
import './RecipePageMain.css';
import BackButton from '../BackButton/BackButton';
import MainNav from '../MainNav/MainNav';
import '../palette.css';

export default function RecipePageMain(props) {
    const recipeId = props.match.params.recipeId;
    const context = useContext(RecipesContext);
    const recipes = useContext(RecipesContext).recipes;
    const selectedRecipe = recipes.filter(recipe => recipe.id == recipeId);
    const recipe = selectedRecipe && selectedRecipe[0];
    const currentCategoryId = sessionStorage.getItem('currentCategoryId');

    function handleClickBack() {
        props.history.push(`/categories/${currentCategoryId}`);
    };

    async function handleDeleteRecipe() {
        try {
            const authToken = localStorage.getItem('authToken');
            await fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "authorization": `bearer ${authToken}`
                },
            });
            context.handleGetRecipes();
            props.history.push(`/categories/${currentCategoryId}`);
        } catch (err) {
            
        };
    };

    function handleEditRecipe() {
        props.history.push(`/edit/recipes/${recipe.id}`);
    };

    function recipeNotEmpty(recipe) {
        if (recipe) {
            return (
                <div className='RecipePageMain__container 
                                primary-text-color'>
                    <BackButton handleClickBack={handleClickBack} />
                    <MainNav />
                    <div className='RecipePageMain__header
                    default-primary-color'>
                        <h1 className='RecipePageMain__recipe-title
                                           text-primary-color'>
                            {recipe && recipe.title}
                        </h1>
                        <p className='RecipePageMain__description-content
                        light-primary-color '>
                            {recipe && recipe.description}</p>
                    </div>
                    <div className='RecipePageMain__content-container'>
                        <h2 className='RecipePageMain__ingredients-title'>
                            Ingredients</h2>
                        <p className='RecipePageMain__ingedients-content'>
                            {recipe && recipe.ingredients}</p>
                        <h2 className='RecipePageMain__directions-title'>
                            Directions</h2>
                        <p className='RecipePageMain__directions-content'>
                            {recipe && recipe.directions}</p>
                        <div className='RecipePageMain__flex-wrapper'>
                            <div className='RecipePageMain__btn-container'>
                                <button
                                    className='btn edit-button
                                text-primary-color '
                                    onClick={handleEditRecipe}>
                                    Edit
                                </button>
                                <button
                                    className='btn delete-button'
                                    onClick={() => {
                                        if (window.confirm('Are you sure you wish to delete this item?')) {
                                            handleDeleteRecipe()
                                        }
                                    }}
                                >
                                    Delete Recipe
                        </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };
        return null
    };

    return (
        recipeNotEmpty(recipe)
    );
};