
import {  useCallback } from "react";
import { useDispatch} from "react-redux";
import { setFormValue } from "../../services/auth/auth-actions";

export const useForm = () => {
    const dispatch = useDispatch() as any;
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setFormValue( { field: event.target.name, value: event.target.value })
          );
    }, [dispatch]);

   return handleChange;
}

