import { Link } from 'react-router-dom';
import styles from './not-found-page.module.css';
const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className='text text_type_main-large'>Ошибка 404.</p>
        <p className='text text_type_main-medium'>Страница не нейдена.</p>
        <Link className={styles.link} to='/'>
          <p className='text text_type_main-medium'>
            Вернутся на главную страницу
          </p>
        </Link>
      </div>
    </div>
  );
};
export default NotFoundPage;
