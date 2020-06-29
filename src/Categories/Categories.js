import React, { useContext } from 'react';
import config from '../config';
import { NavLink } from 'react-router-dom';
import RecipesContext from '../RecipesContext';
import './Categories.css'
import BackButton from '../BackButton/BackButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import MainNav from '../MainNav/MainNav';
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
            context.handleGetRecipes()
        } catch (err) {
            console.log('err', err)
        }
    }

    return (
        <div className='Categories__categories-container'>
            <BackButton handleClickBack={handleClickBack} />
            <MainNav />
            <div className='Categories__title-container
                            default-primary-color'>
                <h1 className='Categories__heading 
                            text-primary-color '>Categories</h1>
            </div>
            <section className='Categories__list-container'>
                {/* <div className='Categories__categories-wrapper'> */}

                    <div className='Categories__categories
                link-and-delete-btn-wrapper  default-primary-color'>
                        <NavLink
                            className='Categories__link-to-category 
                        Categories__navlink navlink-div'
                            to={`/categories/0`}
                            onClick={() => context.onChangeCurrentCategoryId(0)}
                        >
                            <li key={'asdf'}
                                className={'list-div text-primary-color   heading'}>
                                <div className=''>
                                    <h2 className='Categories__categories-name'>All Recipes</h2>
                                </div>
                            </li>
                        </NavLink>

                        <div className='btn-wrapper'>
                            <NavLink
                                className=''
                                to={`/categories/0`}
                                onClick={() => context.onChangeCurrentCategoryId(0)}
                            >
                                <button
                                    className='btn delete-button invisible-btn'>
                                    <FontAwesomeIcon
                                        className='fontawesome-delete'
                                        icon={faTrashAlt} />

                                </button>
                            </NavLink>

                        </div>
                    </div>
                    {categories.map(category => {

                        return <div
                            key={category.id}
                            className='Categories__categories 
                default-primary-color
                link-and-delete-btn-wrapper'>

                            {/* <div className='Categories__link-to-category default-primary-color'> */}

                            <NavLink
                                className='Categories__link-to-category 
                                Categories__navlink navlink-div'
                                to={`/categories/${category.id}`}
                                onClick={() => context.onChangeCurrentCategoryId(category.id)}>

                                <li

                                    className={'list-div text-primary-color   heading'}>

                                    <div className='Categories__categories-name-wrapper'>
                                        <h2 className='Categories__categories-name'>{category.category_name} </h2>
                                    </div>

                                </li>

                            </NavLink>

                            {/* </div> */}


                            <div className='btn-wrapper'>

                                <button
                                    className='btn delete-button'
                                    onClick={() => {
                                        if (window.confirm('Are you sure you wish to delete this item?')) {
                                            handleDeleteCategory(category.id)
                                        }
                                    }}>
                                    <FontAwesomeIcon
                                        className='fontawesome-delete'
                                        icon={faTrashAlt} />

                                </button>

                            </div>

                        </div>


                    })}
                    <button
                        className='Categories__add-category-btn'
                        onClick={handleAddCategory}>Add Category</button>
            </section>
            <div className='bottom-color-area 
                       default-primary-color'>
            </div>

        </div >
    )
}