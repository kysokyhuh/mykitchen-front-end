import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as recipeService from '/src/services/recipeService'; 


const RecipeForm = (props) => {

    const { recipeId } = useParams()

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


    const handleIngredientChange = (ingredientIdx, evt) => {
       const newIngredient = formData.ingredients.map((ingredient, idx) => {
        if (ingredientIdx !== idx) return ingredient;
        return { ...ingredient, [evt.target.name]: evt.target.value };
       })

       setFormData({ ...formData, ingredients: newIngredient });
    }

    const handleAddIngredient = () => {
        setFormData({...formData, ingredients: [...formData.ingredients, { name: '', measurement: '' }]});
    };
    
      const handleRemoveIngredient = (idx) => {
        setFormData({...formData,ingredients: formData.ingredients.filter((_, sidx) => idx !== sidx)});
    };
    

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (recipeId) {
            props.handleUpdateRecipe(recipeId, formData)
        } else {
            props.handleAddRecipe(formData)
        }
    };

    useEffect(() => {
        const fetchRecipe = async () => {
            const recipeData = await recipeService.show(recipeId);
            setFormData(recipeData);
        }
        if(recipeId) fetchRecipe();
    }, [recipeId])



  return (
    <div>
        <form onSubmit={handleSubmit}>

        <p>{ recipeId ? 'Edit Recipe' : 'Add Recipe' }</p>

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

        <label htmlFor="ingredients">Ingredients:</label>
        {formData.ingredients.map((ingredient, idx) => (
          <div key={idx}>
            <input
              required
              type="text"
              name="name"
              value={ingredient.name}
              onChange={evt => handleIngredientChange(idx, evt)}
            />
            <input
              required
              type="text"
              name="measurement"
              value={ingredient.measurement}
              onChange={evt => handleIngredientChange(idx, evt)}
            />
            <button type="button" onClick={() => handleRemoveIngredient(idx)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>

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
