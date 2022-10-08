import { useEffect, useState } from 'react';
import { getAuthUser } from '../utils/api';

export const useAuth = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    getAuthUser()
      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err));
  }, []);
};
