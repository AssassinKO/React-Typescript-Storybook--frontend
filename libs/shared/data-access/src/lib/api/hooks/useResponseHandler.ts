import { useLogout } from '@homeproved/shared-feature-auth-codana';
import { ErrorMessageResponse } from '../../getErrorMessage';

const useResponseHandler = (mapFunction?: (data: unknown) => unknown) => {
  const logout = useLogout();

  return async (response: Response) => {
    if (response.status === 401) {
      logout();
      return Promise.reject(response.status);
    }
    const data = await response.json();
    if (response.ok) {
      return mapFunction?.(data) || data;
    } else {
      const errorMessage: ErrorMessageResponse = {
        response: {
          data: {
            status: data.status,
            message: data.message,
          },
        },
      };
      return Promise.reject(errorMessage);
    }
  };
};

export default useResponseHandler;
