
export function isNullOrWhitespace(str: string): boolean {
  if (isNull(str)) { return true; }

  return str.trim() === '';
}

export function isNull(str: string): boolean {
  return str == null;
}
