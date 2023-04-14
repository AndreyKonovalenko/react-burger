import PropTypes from "prop-types";

export const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf("main", "sauce", "bun").isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

export const burgerPropTypes = PropTypes.shape({
  bun: PropTypes.shape({
    id: PropTypes.string,
    ingredientId: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  mainAndSauce: PropTypes.arrayOf(PropTypes.string).isRequired,
  totol: PropTypes.number.isRequired,
  order: PropTypes.arrayOf(PropTypes.string).isRequired,
});
