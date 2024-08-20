import { useTransition } from "react";

// https://x.com/rickhanlonii/status/1755650648723300686
export function usePendingAction<T>(
  action: (formData: T) => Promise<void>,
  callback?: () => void
) {
  const [isPending, startTransition] = useTransition();

  function handleAction(formData: T) {
    startTransition(async () => {
      await action(formData);
      if (callback) callback();
    });
  }

  return [isPending, handleAction] as const;
}
