import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./register-page.module.css";
import { LOGIN, REGISTER, REGISTRATION } from "../../utils/ui-constants";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import LoadingBage from "../../components/loading-bage/loading-bage";
import {
  getAuthState,
  getFormState,
  getUserState,
} from "../../services/auth/auth-selectors";
import {
  setFormValue,
  register,
  clearForm,
} from "../../services/auth/auth-actions";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, email, password } = useSelector(getFormState);
  const user = useSelector(getUserState);
  const { loading } = useSelector(getAuthState);

  const onChange = useCallback(
    (e) => {
      dispatch(setFormValue({ field: e.target.name, value: e.target.value }));
    },
    [dispatch]
  );
  const onRegister = useCallback(() => {
    dispatch(register());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(clearForm());
      navigate("/profile");
    }
  }, [user, navigate, dispatch]);

  const content = (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <p className="text text_type_main-medium">{REGISTER}</p>
        <Input
          onChange={onChange}
          value={name}
          name={"name"}
          placeholder="Имя"
        />
        <EmailInput
          onChange={onChange}
          value={email}
          name={"email"}
          placeholder="E-mail"
        />
        <PasswordInput onChange={onChange} value={password} name={"password"} />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={onRegister}
        >
          {REGISTRATION}
        </Button>
      </div>
      <div>
        <span className="text text_type_main-default text_color_inactive">
          Ужу зарегисртрировались?{" "}
          <Link className={styles.link} to="/login">
            {LOGIN}
          </Link>
        </span>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {loading ? <LoadingBage /> : content}
    </div>
  );
};

export default RegisterPage;
