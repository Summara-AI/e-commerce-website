"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useId, useRef, useState, useTransition } from "react";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { loginAction } from "@/actions/auth";
import { LoginFloatingField } from "@/components/auth/LoginFloatingField";
import { MediaImage } from "@/components/common/MediaImage";
import { Button } from "@/components/ui/button";
import { LOGIN_COPY, LOGIN_IMAGE_SPEC, LOGIN_ROUTES } from "@/content/login";
import { authErrorMessage } from "@/lib/auth/messages";
import { isValidEmail, normalizeEmail } from "@/lib/validation";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

type LoginPageViewProps = {
  className?: string;
};

/**
 * Premium Shopify Customer Account login — editorial split layout.
 */
export function LoginPageView({ className }: LoginPageViewProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const errorId = useId();
  const formId = useId();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isPending, startTransition] = useTransition();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: boolean; password?: boolean }>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const { guest: guestHref, register: registerHref, recover: recoverHref } = LOGIN_ROUTES;
  const titleWords = LOGIN_COPY.title.split(" ");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const cardTransform = useMotionTemplate`perspective(900px) rotateX(${springY}deg) rotateY(${springX}deg)`;

  const emailValid = isValidEmail(email);
  const passwordValid = password.length >= 6;
  const emailSuccess = Boolean(touched.email && emailValid && !fieldErrors.email);
  const passwordSuccess = Boolean(touched.password && passwordValid && !fieldErrors.password);

  const onCardMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (reduceMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(px * 4);
      mouseY.set(py * -3);
    },
    [mouseX, mouseY, reduceMotion],
  );

  const onCardLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const normalized = normalizeEmail(email);

    if (!isValidEmail(normalized) || password.length < 1) {
      setError(authErrorMessage("VALIDATION"));
      setFieldErrors({
        email: !isValidEmail(normalized),
        password: password.length < 1,
      });
      setStatus("error");
      return;
    }

    setError(null);
    setFieldErrors({});
    setStatus("loading");

    startTransition(async () => {
      try {
        const result = await loginAction({
          email: normalized,
          password,
          rememberMe,
        });

        if (!result.ok) {
          setError(result.error);
          setStatus("error");
          setFieldErrors({
            email: result.code === "ACCOUNT_NOT_FOUND" || result.code === "VALIDATION",
            password:
              result.code === "INCORRECT_PASSWORD" ||
              result.code === "INVALID_CREDENTIALS",
          });
          return;
        }

        router.push(result.redirectTo || "/account");
        router.refresh();
      } catch {
        setError(authErrorMessage("NETWORK"));
        setStatus("error");
      }
    });
  };

  const loading = status === "loading" || isPending;

  return (
    <motion.div
      className={cn(
        "relative min-h-[calc(100vh-8rem)] overflow-hidden",
        "bg-[linear-gradient(160deg,var(--color-pearl)_0%,var(--color-canvas)_42%,var(--color-blush)_100%)]",
        className,
      )}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[8%] top-[18%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,224,239,0.45)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[12%] right-[10%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(242,236,228,0.65)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-site items-center gap-10 px-4 py-12 tablet:px-6 tablet:py-16 laptop:grid-cols-[0.55fr_0.45fr] laptop:gap-12 laptop:px-8 laptop:py-20 desktop:gap-16 desktop:px-12 desktop:py-24">
        {/* Editorial image — 55% desktop, top on mobile */}
        <motion.div
          className="relative order-1"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <div
            className={cn(
              "relative mx-auto aspect-[4/5] w-full max-w-xl overflow-hidden rounded-[1.5rem] border border-border-subtle bg-blush",
              "shadow-[0_28px_60px_-28px_rgba(17,17,17,0.35)]",
              "laptop:max-w-none desktop:rounded-[1.75rem]",
            )}
          >
            <motion.div
              className="absolute inset-[-8%] will-change-transform"
              animate={
                reduceMotion
                  ? undefined
                  : { scale: [1, 1.03, 1], y: [0, -10, 0] }
              }
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <MediaImage
                alt={LOGIN_COPY.mediaAlt}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 55vw"
                spec={LOGIN_IMAGE_SPEC.id}
                className="object-cover"
              />
            </motion.div>
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,rgba(255,255,255,0.14)_0%,transparent_45%,rgba(247,242,244,0.2)_100%)]"
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* Login panel — 45% */}
        <div className="order-2 flex justify-center laptop:justify-start">
          <motion.div
            ref={cardRef}
            onMouseMove={onCardMove}
            onMouseLeave={onCardLeave}
            style={reduceMotion ? undefined : { transform: cardTransform }}
            className={cn(
              "w-full max-w-[460px] rounded-[1.5rem] border border-border-subtle/80",
              "bg-canvas/75 px-7 py-10 shadow-[0_18px_48px_-30px_rgba(17,17,17,0.28)] backdrop-blur-[2px]",
              "transition-[box-shadow] duration-400 ease-out",
              "hover:shadow-[0_28px_56px_-28px_rgba(17,17,17,0.36)]",
              "tablet:px-10 tablet:py-12",
              "will-change-transform",
            )}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.08, ease }}
          >
            <motion.p
              className="font-sans text-overline font-medium uppercase tracking-[0.16em] text-power-pink"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12, ease }}
            >
              {LOGIN_COPY.eyebrow}
            </motion.p>

            <h1
              id={`${formId}-heading`}
              className="mt-4 font-display text-h2 font-light italic tracking-[-0.025em] text-foreground desktop:text-[2.75rem] desktop:leading-[1.1]"
            >
              {titleWords.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  className="mr-[0.28em] inline-block last:mr-0"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: reduceMotion ? 0 : 0.16 + index * 0.05,
                    ease,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="mt-4 text-sm font-light leading-[1.75] text-foreground-secondary tablet:text-base"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.34, ease }}
            >
              {LOGIN_COPY.description}
            </motion.p>

            <form
              id={formId}
              onSubmit={submit}
              noValidate
              className="mt-9 space-y-5"
              aria-labelledby={`${formId}-heading`}
              aria-busy={loading || undefined}
            >
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.4, ease }}
              >
                <LoginFloatingField
                  name="email"
                  label={LOGIN_COPY.emailLabel}
                  type="email"
                  value={email}
                  autoComplete="email"
                  inputMode="email"
                  disabled={loading}
                  error={Boolean(fieldErrors.email)}
                  success={emailSuccess}
                  describedBy={error ? errorId : undefined}
                  onChange={(value) => {
                    setEmail(value);
                    setTouched((t) => ({ ...t, email: true }));
                    if (error) {
                      setError(null);
                      setFieldErrors({});
                      setStatus("idle");
                    }
                  }}
                />
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.48, ease }}
              >
                <LoginFloatingField
                  name="password"
                  label={LOGIN_COPY.passwordLabel}
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  disabled={loading}
                  error={Boolean(fieldErrors.password)}
                  success={passwordSuccess}
                  describedBy={error ? errorId : undefined}
                  onChange={(value) => {
                    setPassword(value);
                    setTouched((t) => ({ ...t, password: true }));
                    if (error) {
                      setError(null);
                      setFieldErrors({});
                      setStatus("idle");
                    }
                  }}
                />
              </motion.div>

              <motion.div
                className="flex items-center justify-between gap-3 pt-1"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.54, ease }}
              >
                <label className="inline-flex min-h-11 cursor-pointer items-center gap-2.5 text-sm font-light text-foreground-secondary">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={rememberMe}
                    disabled={loading}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className={cn(
                      "h-4 w-4 shrink-0 rounded-[4px] border border-border-default accent-power-pink",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                    )}
                  />
                  {LOGIN_COPY.rememberMe}
                </label>
                <Link
                  href={recoverHref}
                  className="text-sm font-medium text-power-pink underline-offset-4 transition-colors hover:text-power-pink-hover hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
                >
                  {LOGIN_COPY.forgotPassword}
                </Link>
              </motion.div>

              {error ? (
                <p
                  id={errorId}
                  role="alert"
                  aria-live="assertive"
                  className="rounded-sm bg-soft-pink/40 px-3 py-2.5 text-left text-caption text-destructive"
                >
                  {error}
                </p>
              ) : null}

              <motion.div
                className="space-y-3 pt-2"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.6, ease }}
              >
                <Button
                  type="submit"
                  size="lg"
                  loading={loading}
                  disabled={loading}
                  className={cn(
                    "w-full rounded-full",
                    "hover:scale-[1.02] hover:shadow-[0_14px_36px_-14px_rgba(232,0,111,0.5)]",
                    "active:scale-[0.99]",
                  )}
                >
                  {LOGIN_COPY.submit}
                </Button>

                <div className="flex items-center gap-4 py-1" role="separator" aria-label={LOGIN_COPY.divider}>
                  <span className="h-px flex-1 bg-border-subtle" />
                  <span className="text-overline font-medium uppercase tracking-[0.14em] text-foreground-muted">
                    {LOGIN_COPY.divider}
                  </span>
                  <span className="h-px flex-1 bg-border-subtle" />
                </div>

                <Button
                  asChild
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full bg-canvas/60 hover:bg-blush"
                >
                  <Link href={guestHref}>{LOGIN_COPY.guest}</Link>
                </Button>
              </motion.div>
            </form>

            <motion.p
              className="mt-8 text-center text-sm font-light text-foreground-secondary"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.72, ease }}
            >
              {LOGIN_COPY.noAccount}{" "}
              <Link
                href={registerHref}
                className="inline-flex items-center gap-1 font-medium text-power-pink transition-[gap,color] duration-280 hover:gap-1.5 hover:text-power-pink-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
              >
                {LOGIN_COPY.createAccount}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
