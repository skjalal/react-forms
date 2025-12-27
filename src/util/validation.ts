const isEmail = (value: string): boolean => value.includes("@");

const isNotEmpty = (value: string): boolean => value.trim() !== "";

const hasMinLength = (value: string, minLength: number): boolean =>
  value.length >= minLength;

const isEqualsToOtherValue = (value: string, otherValue: string) =>
  value === otherValue;

export { isEmail, isNotEmpty, hasMinLength, isEqualsToOtherValue };
