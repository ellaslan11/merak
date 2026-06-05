/**
 * OpenAI prompt templates — deferred for v0 (static content used instead).
 * When enabling live generation, implement:
 * - generateDailyNote(signalsForDay, userProfile)
 * - generateReminderSuggestion(patternObservation, userProfile)
 * - generateWeeklyLetter(allWeekSignals, patternObservations, userProfile)
 * - generateMemoryCapsule(allWeekSignals, patternObservations, userProfile)
 *
 * All prompts must enforce: consent-first language, no sensitive inference,
 * only use provided signals, word limits per output type.
 */

export const GENERATION_RULES = `
- Only use provided signals.
- Do not invent major events.
- Do not infer sensitive personal facts.
- Do not diagnose emotions.
- Prefer "you wrote that…" over unsupported emotional claims.
- Prefer "this seems like…" over "you are…"
`;
