"use client";

import { SegmentError } from "@/components/common/SegmentError";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function SearchError(props: ErrorProps) {
  return <SegmentError {...props} scope="search" />;
}
