"use client";

import { SegmentError } from "@/components/common/SegmentError";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AccountError(props: ErrorProps) {
  return <SegmentError {...props} scope="account" />;
}
