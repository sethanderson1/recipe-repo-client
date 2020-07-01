import React, { useContext, useState, useEffect } from 'react';
import RecipesContext from '../RecipesContext'
import config from '../config';
import './EditRecipe.css';
import TextareaAutosize from 'react-textarea-autosize';
import ValidationError from '../ValidationError/ValidationError';

function EditRecipe(props) {
    const context = useContext(RecipesContext);
    const { recipes } = context;
    const recipe_id = props.match.params.recipeId;
    const recipe = recipes.filter(recipe => recipe.id == recipe_id)
        && recipes.filter(recipe => recipe.id == recipe_id)[0];
    const category_id = recipe && recipe.category_id;
    const titleInitialValue = recipe && recipe.title;
    const descriptionInitialValue = recipe && recipe.description;
    const ingredientsInitialValue = recipe && recipe.ingredients;
    const directionsInitialValue = recipe && recipe.directions;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [directions, setDirections] = useState('');

    useEffect(() => { setTitle(titleInitialValue) }, [titleInitialValue]);
    useEffect(() => { setDescription(descriptionInitialValue) }, [descriptionInitialValue]);
    useEffect(() => { setIngredients(ingredientsInitialValue) }, [ingredientsInitialValue]);
    useEffect(() => { setDirections(directionsInitialValue) }, [directionsInitialValue]);

    function handleCancel() {
        props.history.goBack();
    };

    function handleSubmit(e) {
        e.preventDefault();
        patchRecipe({
            category_id,
            title,
            description,
            ingredients,
            directions,
        });
    };

    function validateName() {
        const recipeName = title && title.trim();
        if (title !== undefined) {
            if (recipeName.length === 0) {
                return ` *name is required `
            };
        };
    };

    async function patchRecipe(fields) {
        try {
            const authToken = localStorage.getItem('authToken');
            await fetch(`${config.API_ENDPOINT}/recipes/${recipe_id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "authorization": `bearer ${authToken}`
                },
                body: JSON.stringify(fields)
            });
            context.handleGetRecipes();
            props.history.goBack();
        } catch (err) {
            console.log('err', err);
        };
    };

    function toggleHoverClass() {
        if (title && title.length !== 0) {
            return ['EditRecipe__edit-recipe', 'allowHover'].join(' ')
        } else {
            return 'EditRecipe__edit-recipe'
        };
    };

    function isDisabled() {
        if (typeof title === 'string') {
            if (title.length === 0) {
                return true
            } else {
                return false
            };
        };
    };

    return (
        <>
            <div className='EditRecipe__outermost-wrapper
        default-primary-color'>
                <div className='EditRecipe__edit-recipe-container
                        default-primary-color'>
                    <div className="EditRecipe__heading-form-wrapper
                default-primary-color">
                        <h2 className='EditRecipe__heading
             text-primary-color'>Edit Recipe</h2>
                        <form
                            onSubmit={handleSubmit}
                            id='EditRecipe__edit-recipe'>
                            <label
                                className='text-primary-color'
                                htmlFor='recipe_title'>
                                Recipe Name</label>
                            <input
                                type='text'
                                name='title'
                                id='recipe_title'
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                            <ValidationError
                                className='accent-color'
                                message={validateName()}
                                errorPosition={'relative'}
                            />
                            <label
                                className='text-primary-color'
                                htmlFor='description'>
                                Description</label>
                            <textarea
                                name='description'
                                id='description'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                            <label
                                className='text-primary-color'
                                htmlFor='ingredients'>
                                Ingredients</label>
                            <TextareaAutosize
                                minRows={10}
                                maxRows={100}
                                name='ingredients'
                                id='ingredients'
                                value={ingredients}
                                onChange={e => setIngredients(e.target.value)}
                            />
                            <label
                                className='text-primary-color'
                                htmlFor='directions'>
                                Instructions</label>
                            <TextareaAutosize
                                minRows={10}
                                maxRows={100}
                                name='directions'
                                id='directions'
                                value={directions}
                                onChange={e => setDirections(e.target.value)}
                            />
                            <div className='EditRecipe__buttons-wrapper'>
                                <button
                                    className='edit-button allowHover'
                                    type="button"
                                    onClick={handleCancel}>Cancel</button>
                                <button
                                    className={toggleHoverClass()}
                                    type="submit"
                                    disabled={isDisabled()}
                                >Save</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <div className='bottom-color-area 
                       default-primary-color'>
            </div>
        </>
    )
};

export default EditRecipe