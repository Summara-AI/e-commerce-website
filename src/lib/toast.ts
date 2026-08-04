import { toast as sonnerToast } from "sonner";

/** Design-system toast API wrapping Sonner */
export const toast = {
  success: (message: string, description?: string, options?: Parameters<typeof sonnerToast.success>[1]) =>
    sonnerToast.success(message, { description, ...options }),
  error: (message: string, description?: string, options?: Parameters<typeof sonnerToast.error>[1]) =>
    sonnerToast.error(message, { description, ...options }),
  warning: (message: string, description?: string, options?: Parameters<typeof sonnerToast.warning>[1]) =>
    sonnerToast.warning(message, { description, ...options }),
  info: (message: string, description?: string, options?: Parameters<typeof sonnerToast>[1]) =>
    sonnerToast(message, { description, ...options }),
  loading: (message: string) => sonnerToast.loading(message),
  dismiss: (id?: string | number) => sonnerToast.dismiss(id),
  promise: sonnerToast.promise,
};
