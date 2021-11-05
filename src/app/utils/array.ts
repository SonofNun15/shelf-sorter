export function ensureArray<TItem>(array: TItem[] | null): TItem[] {
  return array ?? [];
}

export function first<TItem>(array: TItem[]): TItem | null {
  return ensureArray(array).length > 0
    ? array[0]
    : null;
}

export function any<TItem>(array: TItem[], predicate: ((item: TItem) => boolean)): boolean {
  return ensureArray(array)
    .filter(predicate)
    .length > 0;
}

export function split<TItem>(
  array: TItem[],
  predicate: ((item: TItem) => boolean)
): [TItem[], TItem[]] {
  array = ensureArray(array);
  return [
    array.filter(predicate),
    array.filter(item => !predicate(item)),
  ];
}
