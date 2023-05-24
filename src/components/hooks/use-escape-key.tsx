import { useEffect, useCallback } from 'react';

const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keyup';

export const useEscapeKey = (handleCloseModal: () => void): void => {
  const handleEscKey = useCallback(
    (event: { key: string }) => {
      if (event.key === KEY_NAME_ESC) {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );
  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    };
  }, [handleEscKey]);
};
