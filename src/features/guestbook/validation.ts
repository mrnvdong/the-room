export const GUEST_IDENTITIES = [
  'recruiter',
  'partner',
  'friend',
  'visitor',
  'thief',
  'ghost',
  'robot',
  'mystery',
] as const;

export type GuestIdentity = (typeof GUEST_IDENTITIES)[number];

export type ValidGuestbookSubmission = {
  displayName: string;
  message: string;
  identity: GuestIdentity;
};

export function validateGuestbookSubmission(input: unknown):
  | { ok: true; value: ValidGuestbookSubmission }
  | { ok: false; error: string } {
  if (!input || typeof input !== 'object') {
    return { ok: false, error: 'Expected a JSON object.' };
  }

  const record = input as Record<string, unknown>;
  const displayName = typeof record.displayName === 'string' ? record.displayName.trim() : '';
  const message = typeof record.message === 'string' ? record.message.trim() : '';
  const identity = GUEST_IDENTITIES.includes(record.identity as GuestIdentity)
    ? (record.identity as GuestIdentity)
    : 'visitor';

  if (displayName.length < 1 || displayName.length > 30) {
    return { ok: false, error: 'Name must be 1-30 characters.' };
  }
  if (message.length < 3 || message.length > 300) {
    return { ok: false, error: 'Message must be 3-300 characters.' };
  }

  return { ok: true, value: { displayName, message, identity } };
}
