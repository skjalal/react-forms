import React, { useActionState } from "react";

import {
  isEmail,
  isNotEmpty,
  isEqualsToOtherValue,
  hasMinLength,
} from "../util/validation.ts";
import type { FormState } from "../util/data-types.ts";

const signupAction = (
  prevFormState: FormState,
  formData: FormData
): FormState => {
  const data = Object.fromEntries(formData);
  const email = data["email"] as string;
  const password = data["password"] as string;
  const confirmPassword = data["confirm-password"] as string;
  const firstName = data["first-name"] as string;
  const lastName = data["last-name"] as string;
  const role = data["role"] as string;
  const terms = formData.has("terms");
  const acquisitionChannel = formData.getAll("acquisition") as string[];

  const errors: string[] = [];
  if (!isEmail(email)) {
    errors.push("Invalid email address.");
  }
  if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
    errors.push("You must provide a password with atleast six characters.");
  }

  if (!isEqualsToOtherValue(password, confirmPassword)) {
    errors.push("Passwords do not match.");
  }

  if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
    errors.push("Please provide both your first and last name.");
  }

  if (!isNotEmpty(role)) {
    errors.push("Please select a role.");
  }

  if (!terms) {
    errors.push("You must agree to terms and conditions.");
  }
  if (acquisitionChannel.length === 0) {
    errors.push("Please select at least one acuisition channel.");
  }

  console.log("Previous Form State: ", prevFormState);
  if (errors.length > 0) {
    return {
      errors,
      enteredValues: {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        role,
        acquisitionChannel,
        terms,
      },
    };
  }
  return { errors };
};

const Signup: React.FC = () => {
  const [formState, formAction] = useActionState(signupAction, { errors: [] });

  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          defaultValue={formState.enteredValues?.email}
        />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            defaultValue={formState.enteredValues?.password}
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.enteredValues?.confirmPassword}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            defaultValue={formState.enteredValues?.firstName}
          />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            defaultValue={formState.enteredValues?.lastName}
          />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select
          id="role"
          name="role"
          defaultValue={formState.enteredValues?.role}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes(
              "google"
            )}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes(
              "friend"
            )}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="other"
            name="acquisition"
            value="other"
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes(
              "other"
            )}
          />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <input
          type="checkbox"
          id="terms-and-conditions"
          name="terms"
          defaultChecked={formState.enteredValues?.terms}
        />
        <label htmlFor="terms-and-conditions">
          I agree to the terms and conditions
        </label>
      </div>

      {formState.errors.length > 0 && (
        <ul className="error">
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
};

export default Signup;
