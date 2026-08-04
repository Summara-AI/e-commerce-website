/**
 * Shared API / commerce error shapes for services + server actions.
 */

export type ApiErrorCode =
  | "NOT_FOUND"
  | "GONE"
  | "TIMEOUT"
  | "NETWORK"
  | "SHOPIFY_DOWN"
  | "VALIDATION"
  | "UNAUTHORIZED"
  | "NOT_CONNECTED"
  | "UNKNOWN";

export class CommerceError extends Error {
  readonly code: ApiErrorCode;
  readonly status: number;
  readonly causeDetail?: unknown;

  constructor(
    code: ApiErrorCode,
    message: string,
    options?: { status?: number; cause?: unknown },
  ) {
    super(message);
    this.name = "CommerceError";
    this.code = code;
    this.status = options?.status ?? statusForCode(code);
    this.causeDetail = options?.cause;
  }
}

function statusForCode(code: ApiErrorCode): number {
  switch (code) {
    case "NOT_FOUND":
    case "GONE":
      return 404;
    case "UNAUTHORIZED":
      return 401;
    case "VALIDATION":
      return 400;
    case "TIMEOUT":
      return 504;
    case "NETWORK":
    case "SHOPIFY_DOWN":
      return 503;
    case "NOT_CONNECTED":
      return 501;
    default:
      return 500;
  }
}

export function isNotFoundError(error: unknown): boolean {
  return error instanceof CommerceError && (error.code === "NOT_FOUND" || error.code === "GONE");
}

/**
 * Map commerce/API errors to customer-safe copy. Never expose stack traces or GraphQL.
 */
export function toUserFacingMessage(error: unknown, fallback?: string): string {
  if (error instanceof CommerceError) {
    switch (error.code) {
      case "NOT_FOUND":
      case "GONE":
        return error.message || "We couldn’t find what you’re looking for.";
      case "VALIDATION":
        return error.message || "Please check your details and try again.";
      case "UNAUTHORIZED":
        return "Please sign in to continue.";
      case "TIMEOUT":
      case "NETWORK":
      case "SHOPIFY_DOWN":
        return "We’re having trouble connecting. Please try again in a moment.";
      case "NOT_CONNECTED":
        return fallback || "This feature will be available when the store goes live.";
      default:
        return fallback || "Something went wrong. Please try again.";
    }
  }
  /* Never surface raw Error.message — may include internals */
  return fallback || "Something went wrong. Please try again.";
}

