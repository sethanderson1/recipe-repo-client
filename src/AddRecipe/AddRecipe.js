import React, { useContext }  from 'react';
import { Route, NavLink } from 'react-router-dom';
import { categories } from '../dummyStore'
import RecipesContext from '../RecipesContext'
import { withRouter } from 'react-router-dom';
import { browserHistory } from 'react-router';

function AddRecipe(props) {
    console.log('props', props)

    function handleCancel () {
        // go to specific categories page
        // goBack() doesn't work here for some reason
        // the first time clicked, it goes back for 
        // split second, then returns to add recipe page
        // 3 hours of trouble shooting no closer. 
        // conclusion fuck goBack()
        // categories/all not ideal but fuck it and fuck goBack()
        // props.history.goBack()
        props.history.push(`/categories/all`)
                
    }

    function handleSave () {
       
        
    }



    return (
        <div>
            <h2>Add Recipe</h2>
        
            <form>
                <label>Recipe Name</label>
                <input type={'text'} />
                <br/>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleSave}>Save</button>
            </form>
        </div>
    )
}

export default AddRecipe

