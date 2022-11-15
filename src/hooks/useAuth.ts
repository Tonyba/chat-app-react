import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../utils/context/AuthContext';
import { getAuthUser } from '../utils/api';

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const controller = new AbortController();
  const { user, updateAuthUser } = useContext(AuthContext);

  useEffect(() => {
    getAuthUser()
      .then(({ data }) => {
        updateAuthUser(data);
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setTimeout(() => setLoading(false), 1000);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return { user, loading };
};
