import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard(props) {
    return  (
        <div>
            <Link
                to={{
                    pathname:`/recipe/${props.id}`,
                    RecipeCardProps:props
                }}
                
            >
                <h1>{props.title}</h1>
            </Link>
            <p>{props.description}</p>
        </div>
    )
}

export default RecipeCard;