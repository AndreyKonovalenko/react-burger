import { useCallback, useEffect, useRef } from 'react';
import { typedUseDispatch } from '../../services/storeTypes';
import Ingredient from './ingredient/ingredient';
import TabBar from './tab-bar/tab-bar';
import Collection from './collection/collection';
import styles from './burger-ingredients.module.css';
import { BUN, SAUCE, MAIN } from '../../utils/ui-constants';
import { useSelector } from 'react-redux';
import { selectIngredientCollection } from '../../services/ui/ui-actions';
import { getIngredientsState } from '../../services/burger-ingredients/burger-ingredients-selector';
import { TIngredient } from '../../utils/types';

const BurgerIngredients = (): JSX.Element => {
  const dispatch = typedUseDispatch();
  const { ingredients } = useSelector(getIngredientsState);

  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  const handleTabSelect = useCallback(
    (value: string) => {
      dispatch(selectIngredientCollection(value));
      switch (value) {
        case BUN:
          bunRef.current?.scrollIntoView({ behavior: 'smooth' });
          break;
        case SAUCE:
          sauceRef.current?.scrollIntoView({ behavior: 'smooth' });
          break;
        case MAIN:
          mainRef.current?.scrollIntoView({ behavior: 'smooth' });
          break;
        default:
          bunRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [dispatch]
  );

  const splitterToColumn = (ingredients: Array<TIngredient>, type: string) => {
    const left: Array<JSX.Element> = [];
    const right: Array<JSX.Element> = [];
    const filtered = ingredients.filter(
      (ingredient) => ingredient.type === type
    );
    filtered.forEach((element, index) => {
      if (index % 2 === 0) {
        left.push(<Ingredient key={element._id} {...element} />);
      } else {
        right.push(<Ingredient key={element._id} {...element} />);
      }
    });
    return { left, right };
  };

  useEffect(() => {
    const options = {
      root: container.current,
      rootMargin: '0% 0% -90% 0% ',
      threshold: [0],
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { intersectionRatio, target } = entry;
        if (intersectionRatio !== 0) {
          (target as React.HTMLAttributes<HTMLDivElement>).title === BUN &&
            dispatch(selectIngredientCollection(BUN));
          (target as React.HTMLAttributes<HTMLDivElement>).title === SAUCE &&
            dispatch(selectIngredientCollection(SAUCE));
          (target as React.HTMLAttributes<HTMLDivElement>).title === MAIN &&
            dispatch(selectIngredientCollection(MAIN));
        }
      });
    }, options);
    observer.observe(bunRef.current!);
    observer.observe(sauceRef.current!);
    observer.observe(mainRef.current!);
  }, [dispatch]);

  const bun = splitterToColumn(ingredients, 'bun');
  const sauce = splitterToColumn(ingredients, 'sauce');
  const main = splitterToColumn(ingredients, 'main');

  return (
    <div className={styles.container}>
      <div className='pb-5 pt-10'>
        <span className='text text_type_main-large'>Соберите бургер</span>
      </div>
      <TabBar onClick={handleTabSelect} />
      <div className={styles.scrollbar} ref={container}>
        <Collection headline={BUN} columns={bun} ref={bunRef} />
        <Collection headline={SAUCE} columns={sauce} ref={sauceRef} />
        <Collection headline={MAIN} columns={main} ref={mainRef} />
      </div>
    </div>
  );
};

export default BurgerIngredients;
