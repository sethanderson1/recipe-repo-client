import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { categories } from '../dummyStore'
import RecipeCardList from '../RecipeCardList/RecipeCardList';


export default function Categories(props) {

    function handleClickBack() {
        props.history.push('/')

    }
    function handleAddRecipe() {
        // go to add recipe page
    }

    // change when implement users
    const ownedCategories = categories
    console.log('ownedCategories', ownedCategories)



    return (
        <div>
            <button onClick={handleClickBack}>back</button>
            <li key={'asdf'}
                className={'Categories__categories'}
            >
                <NavLink to={`/categories/all`}>
                    All categories
                </NavLink>
            </li>
            {ownedCategories.map(category => {
                return <li key={category.id}
                    className={'Categories__categories'}
                >
                    <NavLink to={`/categories/${category.id}`}>
                        {category.title}
                    </NavLink>
                </li>
            })}
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
