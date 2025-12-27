import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

type FormState = {
  errors: string[];
  enteredValues?: {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    role: string;
    acquisitionChannel: string[];
    terms: boolean;
  };
};

export type { InputProps, FormState };
