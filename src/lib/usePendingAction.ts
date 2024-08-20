import { useTransition } from "react";

// https://x.com/rickhanlonii/status/1755650648723300686
export function usePendingAction<T>(action: (formData: T) => Promise<void>) {
  const [isPending, startTransition] = useTransition();

  function handleAction(formData: T) {
    startTransition(async () => {
      await action(formData);
    });
  }

  return [isPending, handleAction] as const;
}
