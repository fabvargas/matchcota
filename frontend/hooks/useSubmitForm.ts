"use client";

import { useActionState, startTransition } from "react";
import {redirect, useRouter} from "next/navigation";


export function useSubmitForm<TState>(
  action: (prevState: Awaited<TState>, formData: FormData,) => Promise<TState>,
  initialState: Awaited<TState>,
  redirectTo?: string
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
    if (redirectTo) {
      redirect(redirectTo);
    }
  });

};



  return {
    state,
    isPending,
    handleSubmit,
   formAction,
  };
}