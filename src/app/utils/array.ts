export function first<TItem>(array: TItem[]): TItem | null {
  if (array?.length > 0) {
    return array[0];
  }

  return null;
}

export function any<TItem>(array: TItem[], predicate: ((item: TItem) => boolean)): boolean {
  if (array === null) {
    return false;
  }

  return array.filter(predicate).length > 0;
}
