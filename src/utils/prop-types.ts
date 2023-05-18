
export type TIngredient = {
  _id: string;
  name: string;
  type: 'main' | 'suece' | 'bun';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TBurger = { 
  bun: {
    id: string;
    ingredientId: string;
    price: number;
  },
  mainAndSauce: string[];
  totol: number;
  order: string[];
};
