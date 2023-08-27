import { useSelector } from 'react-redux';

function useAuthToken() {
  const token = useSelector((state) => state.auth.token);
  return token;
}

export default useAuthToken;