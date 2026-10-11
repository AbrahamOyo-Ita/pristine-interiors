'use client';

import { useTransition } from 'react';

export default function StatusSelect({
  id,
  value,
  options,
  action,
  label,
}: {
  id: string;
  value: string;
  options: { value: string; label: string }[];
  action: (id: string, status: never) => Promise<{ ok: boolean }>;
  label: string;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <select
      value={value}
      disabled={pending}
      aria-label={label}
      onChange={(e) => {
        const status = e.target.value;
        startTransition(async () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (action as any)(id, status);
        });
      }}
      className="input !w-auto !py-1.5 text-xs font-semibold disabled:opacity-60"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
