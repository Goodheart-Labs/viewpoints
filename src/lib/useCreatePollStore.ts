import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CreatePoll } from "@/lib/schemas";
import { DEFAULT_CORE_QUESTION } from "./copy";

type UseCreatePollStore = Partial<CreatePoll> & { expirationDate?: string };

const initialStore: UseCreatePollStore = {
  title: "",
  slug: "",
  statements: "",
  with_demographic_questions: false,
  new_statements_visible_by_default: true,
  question: DEFAULT_CORE_QUESTION,
};
export const useCreatePollStore = create<UseCreatePollStore>()(
  persist((set) => initialStore, {
    name: "use-create-poll-store",
  }),
);

// load default values from store on init, or reset them if the expiration date has passed
export const getStoredState = (): UseCreatePollStore => {
  const storedState = useCreatePollStore.getState();
  if (storedState.expirationDate) {
    const expirationDate = new Date(storedState.expirationDate);
    if (expirationDate > new Date()) {
      return storedState;
    }
  }
  return initialStore;
};

// This function writes values to the store and writes an execution date 3 hours in the future
export function saveStore(values: Partial<CreatePoll>) {
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 3);

  useCreatePollStore.setState({
    ...values,
    expirationDate: expirationDate.toISOString(),
  });
}

/**
 * Resets the store to its initial state
 */
export function resetStore() {
  useCreatePollStore.setState(initialStore);
}
