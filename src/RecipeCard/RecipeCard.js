import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

function RecipeCard(props) {
    return (
        <Link
            to={{
                pathname: `/recipes/${props.id}`,
                RecipeCardProps: {
                    category_id: props.category_id
                }
            }}
        >
            <div className='RecipeCard__container
                        default-primary-color'>
                <h2 className='RecipeCard__title
                text-primary-color'>{props.title}</h2>
                <p className='RecipeCard__description '>
                    {props.description}</p>
            </div>
        </Link>
    );
};

export default RecipeCard;