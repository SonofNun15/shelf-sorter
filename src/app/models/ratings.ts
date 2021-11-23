import { Emoji } from "../emoji/emojis";

export const ratings: [number, Emoji][] = [
  [1, Emoji.slightly_frowning_face],
  [2, Emoji.neutral_face],
  [3, Emoji.slightly_smiling_face],
  [4, Emoji.smiley],
  [5, Emoji.grinning_face_with_star_eyes],
];

export function ratingToEmoji(rating: number): Emoji | null {
  const result = ratings.find(r => r[0] === rating);

  if (result != null) {
    return result[1];
  }

  return null;
}

export function emojiToRating(emoji: Emoji | null): number | null {
  const result = ratings.find(r => r[1] === emoji);

  if (result != null) {
    return result[0];
  }

  return null;
}

export function getRating(value: number | null): [number, Emoji] | null | undefined {
  if (value == null) { return null; }
  return ratings.find(r => r[0] === value);
}
