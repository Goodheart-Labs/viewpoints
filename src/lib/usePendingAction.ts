import { useTransition } from "react";

// https://x.com/rickhanlonii/status/1755650648723300686
export function usePendingAction<T>(
  action: (formData: T) => Promise<void>,
  callback?: () => void,
  before?: () => void
) {
  const [isPending, startTransition] = useTransition();

  function handleAction(formData: T) {
    startTransition(async () => {
      if (before) before();
      await action(formData);
      if (callback) callback();
    });
  }

  return [isPending, handleAction] as const;
}
