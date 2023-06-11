import { useCallback } from 'react';
import { typedUseDispatch } from '../../services/storeTypes';
import { setFormValue } from '../../services/auth/auth-actions';

export const useForm = () => {
  const dispatch = typedUseDispatch();
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        setFormValue({ field: event.target.name, value: event.target.value })
      );
    },
    [dispatch]
  );

  return handleChange;
};
