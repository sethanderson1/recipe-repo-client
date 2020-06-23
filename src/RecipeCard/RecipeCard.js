import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

function RecipeCard(props) {

    // console.log('props', props)
    return (
        <div>
            <Link
                to={{
                    pathname: `/recipe/${props.id}`,
                    RecipeCardProps: {
                        category_id: props.category_id
                    }
                    
                }}
            >
                <h1>{props.title}</h1>
            </Link>
            <p className='RecipeCard__description'>{props.description}</p>
        </div>
    )
}

export default RecipeCard;