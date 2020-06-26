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
        console.log('handleDeleteCategory) ran')

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
        <div className='Categories__categories-container'>
            <BackButton handleClickBack={handleClickBack} />
            <div className='Categories__title-container
                            default-primary-color'>
                <h1 className='Categories__heading 
                            text-primary-color '>Categories</h1>
            </div>
            <section className='Categories__list-container'>
            <div className='Categories__categories default-primary-color'>
                    <NavLink
                        to={`/categories/0`}
                        onClick={() => context.onChangeCurrentCategoryId(0)}
                    >
                        <li key={'asdf'}
                            className={'list-div text-primary-color   heading'}>
                            <div className='Categories__categories-name'>
                                 <h2>All Recipes</h2>
                            </div>
                        </li>
                    </NavLink>
                
                    <div className='btn-wrapper'>
                        <button
                            className='btn delete-button'>
                            <FontAwesomeIcon
                                className='fontawesome-delete'
                                icon={faTrashAlt} />

                        </button>
                    </div>
                </div>
            {categories.map(category => {
                // console.log('category', category)

                            {/* maybe can make delete button invisible so 
                            css is easier to deal with */}
                            {/* <button onClick={handleClickDelete}>Delete</button> */}
                return <>
                <div className='Categories__categories default-primary-color'>
                    <NavLink
                    className='Categories__navlink navlink-div'
                    to={`/categories/${category.id}`}
                    onClick={() => context.onChangeCurrentCategoryId(category.id)}>
                        <li key={category.id}
                            className={'list-div text-primary-color   heading'}>
                            <div className='Categories__categories-name'>
                                 <h2>{category.category_name} </h2>
                            </div>
                        </li>
                    </NavLink>
                
                <div className='btn-wrapper'>

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
                </div>

                </div>
                
            </>
            })}
            <button
            className='Categories__add-category-btn'
                onClick={handleAddCategory}>Add Category</button>
            </section>
            
        </div>
    )
}