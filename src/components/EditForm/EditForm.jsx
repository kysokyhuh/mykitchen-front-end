import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as recipeService from '../../services/recipeService';
import { useNavigate } from 'react-router-dom';

const EditForm = (props) => {
  const { recipeId, commentId } = useParams();
  const [formData, setFormData] = useState({ text: '' });
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    recipeService.updateComment(recipeId, commentId, formData);
    navigate(`/recipes/${recipeId}`);

    setFormData({ text: '' });
    setIsOpen(false); // Close the modal on submit
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeData = await recipeService.show(recipeId);
      setFormData(recipeData.comments.find((comment) => comment._id === commentId));
    };
    if (recipeId && commentId) fetchRecipe();
  }, [recipeId, commentId]);

  return (
    <>
      
        <div className='fixed inset-0 bg-cream flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg w-1/2'>
            
            <button onClick={() => navigate(`/recipes/${recipeId}`)} className='ml-auto text-gray-700'>
              &times;
            </button>

            <form className='flex flex-col justify-center items-center mb-12 mt-9' onSubmit={handleSubmit}>
              <label className='text-lg mr-auto italic font-literata' htmlFor="text-input">
                Your comment:
              </label>
              <textarea
                rows="2"
                type="text"
                name="text"
                id="text-input"
                value={formData.text}
                onChange={handleChange}
                className='border-2 rounded-lg md:w-96'
                required
              />
              <button
                className='relative rounded-full px-5 py-1  overflow-hidden group bg-sage text-white hover:bg-gradient-to-r hover:from-sage
                   hover:to-darksage hover:ring-2 hover:ring-offset-2 hover:ring-darksage transition-all ease-out duration-300 mt-7 ml-auto'
                type="submit">
                <span className='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white 
                    opacity-10 rotate-12 group-hover:-translate-x-40 ease'></span>
                <span>SUBMIT</span>
              </button>
            </form>
          </div>
        </div>
      
    </>
  );
};

export default EditForm;

