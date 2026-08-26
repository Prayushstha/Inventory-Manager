import { useToast } from './ToastContext';

export function useErrorHandler() {
  const showToast = useToast();

  const handleAsync = async (asyncFn, errorMessage = "An error occurred") => {
    try {
      return await asyncFn();
    } catch (error) {
      console.error(error);
      showToast(errorMessage, "error");
      return null;
    }
  };

  return { handleAsync };
}
