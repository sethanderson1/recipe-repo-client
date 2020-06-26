import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

function RecipeCard(props) {
    return (
        <div className='RecipeCard__container
                        default-primary-color'>
            <Link
                to={{
                    pathname: `/recipe/${props.id}`,
                    RecipeCardProps: {
                        category_id: props.category_id
                    }

                }}
            >
                <h2 className='RecipeCard__title
                text-primary-color'>{props.title}</h2>
                <p className='RecipeCard__description 
                          light-primary-color'>{props.description}</p>
            </Link>
        </div>
    )
}

export default RecipeCard;