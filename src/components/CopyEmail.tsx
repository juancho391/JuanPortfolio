"use client";

import { LuCopy } from "react-icons/lu";
import { copyText } from "@/lib/bus";

export function CopyEmail({ email }: { email: string }) {
  return (
    <button
      type="button"
      className="btn btn--secondary"
      onClick={() => void copyText(email, "Address copied.")}
    >
      <LuCopy aria-hidden="true" />
      Copy address
    </button>
  );
}
