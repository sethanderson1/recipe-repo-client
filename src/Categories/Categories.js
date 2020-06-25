import React, { useContext } from 'react';
import config from '../config';
import { NavLink } from 'react-router-dom';
import RecipesContext from '../RecipesContext';
import './Categories.css'
import BackButton from '../BackButton/BackButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
export default function Categories(props) {


    const context = useContext(RecipesContext)

    const { categories } = context

    function handleClickBack() {
        props.history.push('/')
    }

    function handleAddCategory() {
        props.history.push('/add-category')
    }

    async function handleDeleteCategory(categoryId) {
        try {
            const authToken = localStorage.getItem('authToken')
            // console.log('authToken', authToken)
            await fetch(`${config.API_ENDPOINT}/categories/${categoryId}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "authorization": `bearer ${authToken}`
                },
            })
            context.handleGetCategories()
        } catch (err) {
            console.log('err', err)
        }
    }

    return (
        <div>
            <BackButton handleClickBack={handleClickBack} />
            <li key={'asdf'}
                className={'Categories__categories heading'}
            >
                <NavLink
                    to={`/categories/0`}
                    onClick={() => context.onChangeCurrentCategoryId(0)}
                >
                    All categories
                </NavLink>
                {/* maybe can make delete button invisible so 
                css is easier to deal with */}
                {/* <button onClick={handleClickDelete}>Delete</button> */}

            </li>
            {categories.map(category => {
                // console.log('category', category)

                return <li key={category.id}
                    className={'Categories__categories heading'}
                >
                    <NavLink
                        to={`/categories/${category.id}`}
                        onClick={() => context.onChangeCurrentCategoryId(category.id)}
                    >
                        {category.category_name}
                    </NavLink>
                    <button
                        className='btn delete-button'
                        onClick={() => {
                            if (window.confirm('Are you sure you wish to delete this item?')) {
                                handleDeleteCategory(category.id)
                            }
                        }}
                    >
                        <FontAwesomeIcon
                            className='fontawesome-delete'
                            icon={faTrashAlt} />

                    </button>
                </li>
            })}
            <button
                onClick={handleAddCategory}>Add Category</button>
        </div>
    )
}