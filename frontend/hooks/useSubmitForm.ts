"use client";

import { useActionState, startTransition } from "react";

export function useSubmitForm<TState>(
  action: (prevState: Awaited<TState>, formData: FormData,) => Promise<TState>,
  initialState: Awaited<TState>
) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  const handleSubmit = (
    e: React.SyntheticEvent<HTMLFormElement>,
    customFormData?: FormData
  ) => {
    e.preventDefault();

    const formData = customFormData || new FormData(e.currentTarget);

    startTransition(() => {
      formAction(formData);
    });
  };



  return {
    state,
    isPending,
    handleSubmit,
   formAction,
  };
}