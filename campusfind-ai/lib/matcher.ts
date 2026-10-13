export interface Item {
  itemName: string;
  category: string;
  location: string;
  description: string;
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text: string) {
  return normalize(text)
    .split(" ")
    .filter(Boolean);
}

function keywordSimilarity(a: string, b: string) {
  const wordsA = tokenize(a);
  const wordsB = tokenize(b);

  if (wordsA.length === 0 || wordsB.length === 0) return 0;

  let common = 0;

  for (const word of wordsA) {
    if (wordsB.includes(word)) {
      common++;
    }
  }

  return (2 * common) / (wordsA.length + wordsB.length);
}

function containsBonus(a: string, b: string) {
  a = normalize(a);
  b = normalize(b);

  if (a.includes(b) || b.includes(a)) {
    return 0.2;
  }

  return 0;
}

function similarity(a: string, b: string) {
  const keywordScore = keywordSimilarity(a, b);

  const bonus = containsBonus(a, b);

  const score = Math.min(1, keywordScore + bonus);

  return Math.round(score * 100);
}

export function calculateMatchScore(
  lost: Item,
  found: Item
) {
  const nameScore = similarity(
    lost.itemName,
    found.itemName
  );

  const categoryScore =
    normalize(lost.category) === normalize(found.category)
      ? 100
      : 0;

  const descriptionScore = similarity(
    lost.description,
    found.description
  );

  const locationScore = similarity(
    lost.location,
    found.location
  );

  const finalScore =
    nameScore * 0.40 +
    categoryScore * 0.20 +
    descriptionScore * 0.25 +
    locationScore * 0.15;

  return {
    finalScore: Math.round(finalScore),
    nameScore,
    categoryScore,
    descriptionScore,
    locationScore,
  };
}