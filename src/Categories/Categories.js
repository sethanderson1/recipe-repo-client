import React, { useContext, useEffect } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { categories } from '../dummyStore'
import RecipeCardList from '../RecipeCardList/RecipeCardList';
import RecipesContext from '../RecipesContext';
import './Categories.css'

export default function Categories(props) {
    console.log('props', props)

    const context = useContext(RecipesContext)
    console.log('context', context)

    function handleClickBack() {
        props.history.push('/')
    }
    function handleAddCategory() {
        props.history.push('/add-category')

    }

    function handleClickDelete() {
        // delete
    }
    // change when implement users

    let ownedCategories;
    useEffect(() => {
        const authToken = localStorage.getItem('authToken')
        console.log('authToken', authToken)
        fetch(`http://localhost:8000/api/categories`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "authorization": `bearer ${authToken}`
            },
        })
        .then((res) => {
            return !res.ok
                ? res.json().then((e) => Promise.reject(e))
                : res.json();
        })
        .then(res => {
            console.log('res', res)
        })
        .catch(err => {
            console.log('err', err)
        })
    }
        , [])

        ownedCategories = categories
        console.log('ownedCategories', ownedCategories)

    return (
        <div>
            <button onClick={handleClickBack}>back</button>
            <li key={'asdf'}
                className={'Categories__categories'}
            >
                <NavLink
                    to={`/categories/all`}
                    onClick={() => context.onChangeCurrCategoryId('all')}
                >
                    All categories
                </NavLink>
                <button onClick={handleClickDelete}>delete</button>

            </li>
            {ownedCategories.map(category => {
                return <li key={category.id}
                    className={'Categories__categories'}
                >
                    <NavLink
                        to={`/categories/${category.id}`}
                        onClick={() => context.onChangeCurrCategoryId(category.id)}
                    >
                        {category.title}

                    </NavLink>
                    <button onClick={handleClickDelete}>delete</button>

                </li>
            })}
            <button onClick={handleAddCategory}>Add Category</button>
        </div>
    )
















    // return (
    //     <div>
    //         <button onClick={handleClickBack}>
    //             Back
    //             </button>
    //         <ul>
    //             {categories.map(category =>
    //                 <li key={category.id}>
    //                     <NavLink to={`/categories/${category.id}`}>
    //                         {category.title}
    //                     </NavLink>
    //                 </li>)}
    //         </ul>
    //     </div>
    // )
}
