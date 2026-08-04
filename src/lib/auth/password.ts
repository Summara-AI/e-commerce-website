export type PasswordRuleId =
  | "minLength"
  | "uppercase"
  | "lowercase"
  | "number"
  | "special";

export type PasswordRule = {
  id: PasswordRuleId;
  label: string;
  test: (password: string) => boolean;
};

export const PASSWORD_RULES: PasswordRule[] = [
  {
    id: "minLength",
    label: "Minimum 8 characters",
    test: (p) => p.length >= 8,
  },
  {
    id: "uppercase",
    label: "Uppercase letter",
    test: (p) => /[A-Z]/.test(p),
  },
  {
    id: "lowercase",
    label: "Lowercase letter",
    test: (p) => /[a-z]/.test(p),
  },
  {
    id: "number",
    label: "Number",
    test: (p) => /\d/.test(p),
  },
  {
    id: "special",
    label: "Special character",
    test: (p) => /[^A-Za-z0-9]/.test(p),
  },
];

export function evaluatePassword(password: string) {
  const results = PASSWORD_RULES.map((rule) => ({
    id: rule.id,
    label: rule.label,
    met: rule.test(password),
  }));
  const strength = results.filter((r) => r.met).length;
  const isStrong = results.every((r) => r.met);
  return { results, strength, isStrong };
}

export function isStrongPassword(password: string): boolean {
  return evaluatePassword(password).isStrong;
}
