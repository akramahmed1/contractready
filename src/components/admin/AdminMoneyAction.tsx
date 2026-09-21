"use client";

import { useState } from "react";

interface AdminMoneyActionProps {
  purchaseId: number;
  amount: string;
  /** Server action: full Stripe refund (money back + access revoked). */
  refundAction: (formData: FormData) => void;
  /** Server action: revoke access only, no money movement. */
  revokeAction: (formData: FormData) => void;
  /** True when the purchase has a Stripe payment intent (real money moved). */
  hasPaymentIntent: boolean;
}

/**
 * Two-step refund / revoke controls for the admin purchases table.
 * The inline onSubmit confirm pattern does not work in server components,
 * so this client component owns the confirmation step: the first click
 * arms the button, the second click submits the server action.
 */
export default function AdminMoneyAction({
  purchaseId,
  amount,
  refundAction,
  revokeAction,
  hasPaymentIntent,
}: AdminMoneyActionProps) {
  const [armed, setArmed] = useState<"refund" | "revoke" | null>(null);

  const armButton = (
    kind: "refund" | "revoke",
    label: string,
    armedLabel: string,
    cls: string
  ) => (
    <button
      type="button"
      onClick={() => setArmed(kind)}
      className={cls}
    >
      {armed === kind ? armedLabel : label}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      {hasPaymentIntent ? (
        <form action={refundAction}>
          <input type="hidden" name="purchaseId" value={purchaseId} />
          {armed === "refund" ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600">
                Refund {amount} via Stripe and revoke access?
              </span>
              <button
                type="submit"
                className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-500"
              >
                Yes, refund
              </button>
              <button
                type="button"
                onClick={() => setArmed(null)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700"
              >
                Cancel
              </button>
            </div>
          ) : (
            armButton(
              "refund",
              "Refund",
              "Confirm refund",
              "rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
            )
          )}
        </form>
      ) : (
        <form action={revokeAction}>
          <input type="hidden" name="purchaseId" value={purchaseId} />
          {armed === "revoke" ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600">
                No Stripe payment on record. Revoke access only (no money moves)?
              </span>
              <button
                type="submit"
                className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-500"
              >
                Yes, revoke
              </button>
              <button
                type="button"
                onClick={() => setArmed(null)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700"
              >
                Cancel
              </button>
            </div>
          ) : (
            armButton(
              "revoke",
              "Revoke access",
              "Confirm revoke",
              "rounded-lg border border-amber-300 px-3 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-50"
            )
          )}
        </form>
      )}
    </div>
  );
}
