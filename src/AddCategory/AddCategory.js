import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { categories } from '../dummyStore'

export default function AddCategory(props) {

    function handleCancel () {
        // go to categories page
        props.history.push('/categories')
    }

    function handleSave () {
        // go to categories page
        // make sure categories page gets updated
    }



    return (
        <div>
            <h2>Add Category</h2>
        
            <form>
                <label>Category Name</label>
                <input type={'text'} />
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleSave}>Save</button>
            </form>
        </div>
    )
}

