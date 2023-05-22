import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getIngredientsState } from "../../services/burger-constructor/burger-constructor-selectors";
import { useEffect } from "react";
import { loadIngerdients } from "../../services/burger-ingredients/burger-ingredients-actions";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { selectIngredient } from "../../services/ui/ui-actions";
import { getUiState } from "../../services/ui/ui-selectors";
import styles from "./ingredient-details-page.module.css";
import { TIngredient } from "../../utils/types";

const IngredientDetailsPage = ():JSX.Element => {
  const dispatch = useDispatch() as any;
  const navigate = useNavigate();
  const { id } = useParams();
  const { ingredients } = useSelector(getIngredientsState);
  const { ingredient } = useSelector(getUiState);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(loadIngerdients()) ;
    }
    if (ingredients.length > 0) {
      const ingredient = ingredients.find((element: TIngredient) => element._id === id);
      dispatch(selectIngredient(ingredient));
    }
  }, [dispatch, id, ingredients, navigate]);

  return ingredient  && (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <IngredientDetails />
      </div>
    </div>
  );
};

export default IngredientDetailsPage;
