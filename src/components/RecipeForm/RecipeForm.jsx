import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as recipeService from '/src/services/recipeService'; 

const RecipeForm = (props) => {

    const [formData, setFormData] = useState({
        name: '',
        preptime: '',
        cooktime: '',
        ingredients: [{ name: '', measurement: '' }],
        instructions: '1. ',
    })

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
      };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleAddRecipe(formData)
    };

  return (
    <div>
        <form onSubmit="">

        <p>Add Recipe</p>

        <label htmlFor="name">Recipe Name:</label>
        <input 
        type="text" 
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        required
        />

        <label htmlFor="preptime">Preptime:</label>
        <input
        type="text" 
        name="preptime"
        id="preptime"
        value={formData.preptime}
        onChange={handleChange}
        required
        />

        <label htmlFor="cooktime">Cooktime:</label>
        <input
        type="text" 
        name="cooktime"
        id="cooktime"
        value={formData.cooktime}
        onChange={handleChange}
        required
        />

        <label htmlFor="instructions">Instructions</label>
        <textarea
          name="instructions"
          id="instructions"
          value={formData.instructions}
          onChange={handleChange}
          required
        />


        <button type="submit">SUBMIT</button>
        </form>
    </div>
  )
}

export default RecipeForm
