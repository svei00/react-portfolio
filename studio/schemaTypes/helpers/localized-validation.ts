import type {Rule} from 'sanity'

// What sanity-plugin-internationalized-array (v5) stores for every localized
// field: one item per language, the language in a `language` property and the
// text (or blocks) in `value`. English ('en') is the one language this site is
// authored in; Spanish ('es') is optional and ready for later (phase-4-plan.md
// section 1, decision 1).
export type LocalizedItem<Value> = {_key: string; language?: string; value?: Value}

// The shape our `simpleBlockContent` Portable Text blocks have, reduced to
// what the plain-text helper below needs.
type BlockLike = {_type?: string; children?: Array<{text?: string}>}

// Flattens Portable Text blocks to plain text, so "is this field empty?" is a
// question about words, not about whether an empty block array exists.
export function blocksToPlainText(blocks: BlockLike[] | undefined): string {
  if (!blocks) return ''
  return blocks
    .filter((block) => block._type === 'block')
    .map((block) => (block.children ?? []).map((child) => child.text ?? '').join(''))
    .join('\n')
    .trim()
}

type ValidationResult = true | string | Array<{message: string; path: Array<{_key: string} | string>}>

// Pure function (no Sanity runtime needed) so the rules can be tested with a
// plain script. Requires an English entry with real text; optionally caps its
// length and reports the problem on the English item itself rather than on the
// whole field.
export function validateEnglishString(
  items: LocalizedItem<string>[] | undefined,
  label: string,
  maxLength?: number,
): ValidationResult {
  const english = items?.find((item) => item.language === 'en')
  const text = english?.value?.trim() ?? ''

  if (!text) return `${label} is required in English.`

  if (maxLength && text.length > maxLength && english) {
    return [
      {
        message: `${label} is ${text.length} characters; keep it to ${maxLength} or fewer.`,
        path: [{_key: english._key}, 'value'],
      },
    ]
  }

  return true
}

export function validateEnglishBlocks(
  items: LocalizedItem<BlockLike[]>[] | undefined,
  label: string,
): ValidationResult {
  const english = items?.find((item) => item.language === 'en')
  if (!blocksToPlainText(english?.value)) return `${label} is required in English.`
  return true
}

// Rule builders for use as `validation: englishString('Title')` in a schema.
export const englishString =
  (label: string, maxLength?: number) =>
  (rule: Rule) =>
    rule.custom<LocalizedItem<string>[]>((items) => validateEnglishString(items, label, maxLength))

export const englishBlocks = (label: string) => (rule: Rule) =>
  rule.custom<LocalizedItem<BlockLike[]>[]>((items) => validateEnglishBlocks(items, label))
