import { useSelector } from "react-redux";
import styles from "./ingredient-details.module.css";
import { getUiState } from "../../services/ui/ui-selectors";

const NUTRIENTS = [
  {
    name: "calories",
    text: "Калории, ккал",
  },
  { name: "proteins", text: "Белки, г" },
  { name: "fat", text: "Жиры, г" },
  { name: "carbohydrates", text: "Углеводы, г" },
];

const IngredientDetails = () => {
  const { ingredient } = useSelector(getUiState);
  return (
    ingredient && (
      <div className={styles.container}>
        <div>
          <img
            className={styles.image}
            src={ingredient.image_large}
            alt="ingredient"
          />
        </div>
        <div>
          <p className='className="text text_type_main-medium'>
            {ingredient.name}
          </p>
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
    )
  );
};

export default IngredientDetails;
