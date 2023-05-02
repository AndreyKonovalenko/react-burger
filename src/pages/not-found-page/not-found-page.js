import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <>
      <p>Страница не нейдена</p>
      <Link to="/">Вернутся на главную страницу</Link>
    </>
  );
};
export default NotFoundPage;
