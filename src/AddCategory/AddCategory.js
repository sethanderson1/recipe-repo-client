import React, { useContext, useState } from 'react';
import ValidationError from '../ValidationError/ValidationError';
import RecipesContext from '../RecipesContext';
import config from '../config';
import './AddCategory.css';

export default function AddCategory(props) {
    const [name, setName] = useState('');
    const context = useContext(RecipesContext);

    function handleCancel() {
        props.history.push('/categories');
    };

    function validateName() {
        const categoryName = name.trim();
        if (categoryName.length === 0) {
            return '*name is required'
        };
    };

    function handleSubmit(e) {
        e.preventDefault();
        const { category_name } = e.target;
        postCategory({
            category_name: category_name.value,
        });
    };

    async function postCategory(categoryName) {
        try {
            const authToken = localStorage.getItem('authToken');
            const res = await fetch(`${config.API_ENDPOINT}/categories`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `bearer ${authToken}`
                },
                body: JSON.stringify(categoryName)
            });
            await res.json();
            context.handleGetCategories();
            props.history.push(`/categories`);
        } catch (err) {
            
        };
    };

    function toggleHoverClass() {
        if (name.length !== 0) {
            return ['AddCategory__submit', 'allowHover'].join(' ')
        } else {
            return 'AddCategory__submit'
        }
    };

    return (
        <div className='AddCategory__outermost-wrapper
        default-primary-color'>
            <div className='AddCategory__add-category-container
            default-primary-color'>
                <h2 className='AddCategory__heading 
            text-primary-color'>Add Category</h2>
                <form
                    className='AddCategory__add-category'
                    onSubmit={handleSubmit}>
                    <label
                        className='text-primary-color'
                        htmlFor='category_name'>Category Name </label>
                    <input
                        type='text'
                        id='category_name'
                        onChange={e => setName(e.target.value)} 
                        autoFocus />
                        
                    <ValidationError
                        message={validateName()}
                        errorPosition={'absolute'} />
                    <div className='AddCategory__buttons-wrapper'>
                        <button
                            className='AddCategory__cancel-button 
                                       allowHover'
                            onClick={handleCancel}
                            aria-label="Cancel"
                            >Cancel</button>
                        <button
                            className={toggleHoverClass()}
                            type='submit'
                            disabled={name.length === 0}
                            aria-label="Add Category"
                        >Save</button>
                    </div>
                </form>
            </div>
            <div className='bottom-color-area 
                       default-primary-color'>
            </div>
        </div>
    )
};