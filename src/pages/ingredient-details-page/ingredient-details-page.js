import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getIngredientsState } from '../../services/burger-constructor/burger-constructor-selectors';
import { useEffect, useState } from 'react';
import { loadIngerdients } from '../../services/burger-ingredients/burger-ingredients-actions';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient-details-page.module.css';

const IngredientDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { ingredients } = useSelector(getIngredientsState);
  const [ingredient, setIngredient] = useState(null);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(loadIngerdients());
    }
    if (ingredients.length > 0) {
      const ingredient = ingredients.find((element) => element._id === id);
      setIngredient(ingredient);
    }
  }, [dispatch, id, ingredients, navigate]);

  return ingredient ? (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <IngredientDetails ingredient={ingredient} />
      </div>
    </div>
  ) : null;
};

export default IngredientDetailsPage;
