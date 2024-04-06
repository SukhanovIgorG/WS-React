export const hiWords = ["прив", "добрый", "hi", "здравств", "здаров"];
export const askWords = ["как", "жизнь", "дела", "поживаешь"];
export const byWords = ["пока", "до-свидания", "спишемся", "бывай"];

export function containsAnyWord(text, words) {
  return words.some(word => text.toLowerCase().includes(word));
}