"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState, useTransition } from "react";
import { ArrowLeft, Check } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { recoverAction } from "@/actions/auth";
import { LoginFloatingField } from "@/components/auth/LoginFloatingField";
import { MediaImage } from "@/components/common/MediaImage";
import { Button } from "@/components/ui/button";
import {
  RECOVER_COPY,
  RECOVER_IMAGE_SPEC,
  RECOVER_RESEND_COOLDOWN,
} from "@/content/recover";
import { authErrorMessage } from "@/lib/auth/messages";
import { isValidEmail, normalizeEmail } from "@/lib/validation";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

type RecoverPageViewProps = {
  className?: string;
};

/**
 * Premium Shopify password recovery — editorial split layout.
 */
export function RecoverPageView({ className }: RecoverPageViewProps) {
  const reduceMotion = useReducedMotion();
  const errorId = useId();
  const formId = useId();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isPending, startTransition] = useTransition();

  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState(false);
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [cooldown, setCooldown] = useState(0);

  const titleWords = RECOVER_COPY.title.split(" ");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const cardTransform = useMotionTemplate`perspective(900px) rotateX(${springY}deg) rotateY(${springX}deg)`;

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setInterval(() => {
      setCooldown((c) => Math.max(0, c - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [cooldown]);

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

  const sendRecover = (address: string) => {
    setError(null);
    setEmailError(false);
    setStatus("loading");

    startTransition(async () => {
      try {
        const result = await recoverAction({ email: address });

        if (!result.ok) {
          setError(result.error);
          setStatus("error");
          setEmailError(
            result.code === "VALIDATION" || result.code === "ACCOUNT_NOT_FOUND",
          );
          return;
        }

        setSubmittedEmail(result.email);
        setStatus("success");
        setCooldown(RECOVER_RESEND_COOLDOWN);
      } catch {
        setError(authErrorMessage("NETWORK"));
        setStatus("error");
      }
    });
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "loading") return;

    const normalized = normalizeEmail(email);
    if (!isValidEmail(normalized)) {
      setError("Invalid email");
      setEmailError(true);
      setStatus("error");
      return;
    }

    sendRecover(normalized);
  };

  const resend = () => {
    if (cooldown > 0 || status === "loading" || !submittedEmail) return;
    sendRecover(submittedEmail);
  };

  const loading = status === "loading" || isPending;
  const emailSuccess = Boolean(touched && isValidEmail(email) && !emailError);

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
        <div className="absolute bottom-[12%] right-[10%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(239,232,224,0.65)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-site items-center gap-10 px-4 py-12 tablet:px-6 tablet:py-16 laptop:grid-cols-[0.55fr_0.45fr] laptop:gap-12 laptop:px-8 laptop:py-20 desktop:gap-16 desktop:px-12 desktop:py-24">
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
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            >
              <MediaImage
                alt={RECOVER_COPY.mediaAlt}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 55vw"
                spec={RECOVER_IMAGE_SPEC.id}
                className="object-cover"
              />
            </motion.div>
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,rgba(255,255,255,0.14)_0%,transparent_45%,rgba(247,242,244,0.2)_100%)]"
              aria-hidden="true"
            />
          </div>
        </motion.div>

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
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  className="text-center"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease }}
                  role="status"
                  aria-live="polite"
                >
                  <motion.span
                    className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-pink-mist text-power-pink"
                    initial={reduceMotion ? false : { scale: 0.75, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.45, ease }}
                  >
                    <Check className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                  </motion.span>
                  <p className="mt-6 font-display text-3xl font-light italic text-foreground">
                    {RECOVER_COPY.successTitle}
                  </p>
                  <p className="mt-4 text-sm font-light leading-relaxed text-foreground-secondary">
                    {RECOVER_COPY.successBody}
                  </p>
                  {submittedEmail ? (
                    <p className="mt-2 text-sm font-medium text-foreground">{submittedEmail}</p>
                  ) : null}
                  <p className="mt-4 text-caption font-light leading-relaxed text-foreground-muted">
                    {RECOVER_COPY.successHint}
                  </p>

                  <div className="mt-10 space-y-3">
                    <Button asChild size="lg" className="w-full rounded-full">
                      <Link href="/account/login">{RECOVER_COPY.returnToLogin}</Link>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="w-full rounded-full bg-canvas/60"
                      disabled={cooldown > 0 || loading}
                      loading={loading}
                      onClick={resend}
                    >
                      {cooldown > 0
                        ? RECOVER_COPY.resendWait(cooldown)
                        : RECOVER_COPY.resendEmail}
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="form" initial={false}>
                  <motion.p
                    className="font-sans text-overline font-medium uppercase tracking-[0.16em] text-power-pink"
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease }}
                  >
                    {RECOVER_COPY.eyebrow}
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
                          delay: reduceMotion ? 0 : 0.14 + index * 0.05,
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
                    transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.32, ease }}
                  >
                    {RECOVER_COPY.description}
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
                        label={RECOVER_COPY.emailLabel}
                        type="email"
                        value={email}
                        autoComplete="email"
                        inputMode="email"
                        disabled={loading}
                        error={emailError}
                        success={emailSuccess}
                        describedBy={error ? errorId : undefined}
                        onChange={(value) => {
                          setEmail(value);
                          setTouched(true);
                          if (error) {
                            setError(null);
                            setEmailError(false);
                            setStatus("idle");
                          }
                        }}
                      />
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
                      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.5, ease }}
                    >
                      <Button
                        type="submit"
                        size="lg"
                        loading={loading}
                        disabled={loading}
                        className={cn(
                          "w-full rounded-full",
                          "hover:scale-[1.02] hover:shadow-[0_14px_36px_-14px_rgba(228,19,111,0.5)]",
                          "active:scale-[0.99]",
                        )}
                      >
                        {RECOVER_COPY.submit}
                      </Button>
                    </motion.div>
                  </form>

                  <motion.p
                    className="mt-8 text-center text-sm font-light text-foreground-secondary"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.62, ease }}
                  >
                    {RECOVER_COPY.rememberPassword}
                    <br />
                    <Link
                      href="/account/login"
                      className="mt-2 inline-flex items-center gap-1.5 font-medium text-power-pink transition-[gap,color] duration-280 hover:gap-2 hover:text-power-pink-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                      {RECOVER_COPY.backToSignIn}
                    </Link>
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
