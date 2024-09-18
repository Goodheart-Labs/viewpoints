import { useTransition } from "react";

// https://x.com/rickhanlonii/status/1755650648723300686
export function usePendingAction<T, K>(
  action: (formData: T) => Promise<K>,
  callback?: () => void,
  before?: () => void,
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

export function useBetterPendingAction<T = void, TResult = void>(
  action: (formData: T) => Promise<TResult>,
  options: {
    before?: () => void;
    after?: (result: TResult) => void;
  } = {},
) {
  const [isPending, startTransition] = useTransition();

  function handleAction(formData: T) {
    startTransition(async () => {
      options.before?.();
      const result = await action(formData);
      options.after?.(result);
    });
  }

  return [isPending, handleAction] as const;
}
