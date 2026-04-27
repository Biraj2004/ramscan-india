const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const buildSearchRegex = (search: string): RegExp | null => {
  const query = search.trim();

  if (!query) {
    return null;
  }

  try {
    return new RegExp(query, 'i');
  } catch {
    return new RegExp(escapeRegex(query), 'i');
  }
};
