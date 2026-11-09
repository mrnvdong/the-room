import { describe, expect, it } from 'vitest';
import { validateGuestbookSubmission } from './validation';

describe('guestbook submission validation', () => {
  it('trims valid fields and defaults an unknown identity to visitor', () => {
    expect(validateGuestbookSubmission({ displayName: '  Linh ', message: ' Hello! ', identity: 'unknown' })).toEqual({
      ok: true,
      value: { displayName: 'Linh', message: 'Hello!', identity: 'visitor' },
    });
  });

  it('rejects blank or overlong names', () => {
    expect(validateGuestbookSubmission({ displayName: '  ', message: 'Hello' }).ok).toBe(false);
    expect(validateGuestbookSubmission({ displayName: 'x'.repeat(31), message: 'Hello' }).ok).toBe(false);
  });

  it('rejects too short or too long messages', () => {
    expect(validateGuestbookSubmission({ displayName: 'Linh', message: 'hi' }).ok).toBe(false);
    expect(validateGuestbookSubmission({ displayName: 'Linh', message: 'x'.repeat(301) }).ok).toBe(false);
  });
});
