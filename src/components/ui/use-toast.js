import { useState } from 'react';

const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const toast = ({ title, description, variant }) => {
    setToasts(prevToasts => [
      ...prevToasts,
      {
        id: Date.now(),
        title,
        description,
        variant
      }
    ]);
    setTimeout(() => {
      setToasts(prevToasts => prevToasts.slice(1));
    }, 5000);
  };

  return { toast };
};

export { useToast };