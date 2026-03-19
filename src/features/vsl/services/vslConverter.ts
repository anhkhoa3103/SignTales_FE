import { callOpenAI } from './openai';
import type { VSLConversionResult } from '../types/vsl.types';

// ─── Prompt engineering ───────────────────────────────────────────────
//
// Key decisions:
// 1. Few-shot examples teach VSL grammar (Topic-Comment, verb grouping)
// 2. JSON output → deterministic parsing, no regex fragility
// 3. Strict rules prevent hallucinated phrases
// 4. temperature: 0.1 in openai.ts keeps it consistent

const SYSTEM_PROMPT = `

You are an expert in Vietnamese Sign Language (VSL).

## 🎯 Goal

Convert a Vietnamese sentence into a list of VSL gloss phrases.

## ✅ Output Format (STRICT)

* Return ONLY a JSON array of strings
* Each item is a **phrase-level gloss**, NOT individual words
* NO explanation, NO extra text

Example:
Input: "Anh ấy không thích học toán"
Output: ["ANH ẤY", "KHÔNG THÍCH", "HỌC TOÁN"]

---

## 🧠 Core Rules
 0. Discourse Priority Rule (HIGHEST PRIORITY)

If the sentence contains communication intent phrases such as:
- "xin lỗi"
- "cảm ơn"
- addressing someone (e.g., "bạn", "anh", "chị")

Then:
- Move these phrases to the VERY BEGINNING of the output
- BEFORE time expressions

Examples:
Input: "Hôm nay tôi phải đi học rồi, xin lỗi bạn"
Output: ["XIN LỖI", "BẠN", "HÔM NAY", "TÔI", "PHẢI", "ĐI HỌC"]

### 1. Phrase-Based Conversion (VERY IMPORTANT)

* Always group meaningful phrases together
* DO NOT split into single words

Examples:

* "đi học" → "ĐI HỌC"
* "học toán" → "HỌC TOÁN"
* "không thích" → "KHÔNG THÍCH"
* "xin lỗi" → "XIN LỖI"

---

### 2. Word Order (VSL Structure)

Reorder sentence into:
TIME → SUBJECT → NEGATION / MODAL → VERB PHRASE → OBJECT

Examples:

* "Hôm nay tôi đi học" → ["HÔM NAY", "TÔI", "ĐI HỌC"]
* "Tôi không thích ăn cá" → ["TÔI", "KHÔNG THÍCH", "ĂN CÁ"]

---

### 3. Time Handling

Move time expressions to the beginning:

* "hôm nay" → "HÔM NAY"
* "hôm qua" → "HÔM QUA"
* "ngày mai" → "NGÀY MAI"

---

### 4. Negation Handling

Keep negation as a phrase:

* "không thích" → "KHÔNG THÍCH"
* "không đi" → "KHÔNG ĐI"
* "chưa làm" → "CHƯA LÀM"

---

### 5. Modal Verbs (CONTEXT-AWARE)

Modal verbs include:
- "phải"
- "muốn"
- "cần"
- "có thể"

Rules:

1. KEEP modal verbs only if they add important meaning.
2. REMOVE modal verbs if they are redundant or implied by context.

Specifically:
- REMOVE "PHẢI" when it does not change the core meaning.
  Example:
  "tôi phải đi học" → ["TÔI", "ĐI HỌC"]

- KEEP "MUỐN", "CẦN", "CÓ THỂ" when expressing intention or ability.
  Example:
  "tôi muốn ăn cơm" → ["TÔI", "MUỐN", "ĂN CƠM"]
---

### 6. Ignore Non-Meaning Words

REMOVE these completely:

* particles: "à", "nhé", "đấy", "nhỉ"
* endings: "rồi", "mất rồi"
* intensifiers: "rất", "lắm", "quá"

Example:

* "vui lắm" → "VUI"
* "đi học mất rồi" → "ĐI HỌC"

---

### 7. Emotion Words (Keep as Meaning)

If emotion is meaningful, keep it as a phrase:

* "vui" → "VUI"
* "buồn" → "BUỒN"
* "xin lỗi" → "XIN LỖI"

---

### 8. Subject Grouping

Keep pronouns as full phrases:

* "anh ấy" → "ANH ẤY"
* "cô ấy" → "CÔ ẤY"
* "chúng tôi" → "CHÚNG TÔI"

---

### 9. Uppercase Rule

* All output must be UPPERCASE
* Keep Vietnamese accents
* Use spaces inside phrases, NOT underscores

---

### 10. Meaning Priority Rule

Always prioritize natural VSL meaning over literal translation.

If a word does not change the core visual meaning, REMOVE it.
---

## ⚠️ Constraints

* Output ONLY JSON array
* NO explanation
* NO punctuation outside JSON
* DO NOT split phrases incorrectly

---

## ✅ Examples

Input: "Hôm nay tôi đi học vui lắm"
Output: ["HÔM NAY", "TÔI", "ĐI HỌC", "VUI"]

---

Input: "Xin lỗi, hôm nay tôi phải đi học mất rồi"
Output: ["XIN LỖI", "HÔM NAY", "TÔI", "PHẢI", "ĐI HỌC"]

---

Input: "Tôi không muốn ăn cơm"
Output: ["TÔI", "KHÔNG MUỐN", "ĂN CƠM"]

---

## 🚀 Your Task

Convert any Vietnamese sentence into a correct VSL gloss phrase array following ALL rules above.
`;

// ─── Parser ───────────────────────────────────────────────────────────

function parseAIResponse(raw: string): string[] {
  // Strip markdown fences if model wraps output anyway
  const cleaned = raw.replace(/```json|```/gi, '').trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(`AI returned non-JSON: "${raw.slice(0, 80)}"`);
  }

  if (!Array.isArray(parsed)) {
    throw new Error('AI response is not an array');
  }

  const phrases = parsed.filter(
    (item): item is string => typeof item === 'string' && item.trim().length > 0,
  );

  if (phrases.length === 0) {
    throw new Error('AI returned an empty phrase list');
  }

  // Normalize: trim whitespace, uppercase
  return phrases.map((p) => p.trim().toUpperCase());
}

// ─── Main conversion function ─────────────────────────────────────────

export async function convertToVSL(
  sentence: string,
  apiKey: string,
): Promise<VSLConversionResult> {
  const trimmed = sentence.trim();
  if (!trimmed) throw new Error('Input sentence is empty');

  const raw = await callOpenAI(
    [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: trimmed },
    ],
    apiKey,
  );

  const phrases = parseAIResponse(raw);

  return {
    originalSentence: trimmed,
    phrases,
  };
}