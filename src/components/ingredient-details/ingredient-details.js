import { ingredientPropTypes } from "../../utils/prop-types";
import styles from "./ingredient-details.module.css";

const NUTRIENTS = [
  {
    name: "calories",
    text: "Калории, ккал",
  },
  { name: "proteins", text: "Белки, г" },
  { name: "fat", text: "Жиры, г" },
  { name: "carbohydrates", text: "Углеводы, г" },
];

const IngredientDetails = ({ ingredient }) => {
  const { name, image_large } = ingredient;
  return (
    <div className={styles.container}>
      <div>
        <img className={styles.image} src={image_large} alt="ingredient" />
      </div>
      <div>
        <p className='className="text text_type_main-medium'>{name}</p>
      </div>
      <div className={styles.nutrientsContainer}>
        {NUTRIENTS.map((element, index) => (
          <div
            className={`${styles.infoContaienr} pt-5`}
            key={index + element.text}
          >
            <div>
              <p className="text text_type_main-default text_color_inactive">
                {element.text}
              </p>
            </div>
            <div>
              <p className="text text_type_digits-default text_color_inactive">
                {ingredient[element.name]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
IngredientDetails.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
};

export default IngredientDetails;
