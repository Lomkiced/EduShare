/**
 * Simple utility to suggest email domain corrections.
 */

const POPULAR_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "edushare.edu", // Adding the example school domain
];

/**
 * Calculates the Levenshtein distance between two strings.
 */
function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = Array(a.length + 1)
    .fill(null)
    .map(() => Array(b.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) {
    matrix[i][0] = i;
  }
  for (let j = 0; j <= b.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + indicator // substitution
      );
    }
  }

  return matrix[a.length][b.length];
}

/**
 * Suggests a corrected email address if a common typo is detected in the domain.
 * Returns null if no typo is detected or if the email is invalid.
 */
export function suggestEmailCorrection(email: string): string | null {
  if (!email || !email.includes("@")) return null;

  const parts = email.split("@");
  if (parts.length !== 2) return null;

  const userPart = parts[0];
  const domainPart = parts[1].toLowerCase();

  if (!domainPart || domainPart.length < 3) return null;

  // Exact match, no suggestion needed
  if (POPULAR_DOMAINS.includes(domainPart)) return null;

  let bestMatch = "";
  let lowestDistance = Infinity;

  for (const popularDomain of POPULAR_DOMAINS) {
    const distance = levenshteinDistance(domainPart, popularDomain);
    
    // If the distance is small (1 or 2 depending on length) and it's the best so far
    // We allow a distance of 2 for longer domains, 1 for shorter ones.
    const threshold = popularDomain.length > 6 ? 3 : 1; // Increased to 3 to catch 'vns' vs 'com'
    
    if (distance <= threshold && distance < lowestDistance) {
      lowestDistance = distance;
      bestMatch = popularDomain;
    }

    // Special rule: if the domain starts with exactly the same name (e.g. "gmail.") but has a weird extension
    const providerName = popularDomain.split('.')[0];
    if (domainPart.startsWith(providerName + ".") && domainPart !== popularDomain) {
      bestMatch = popularDomain;
      lowestDistance = 0; // Highest priority
    }
  }

  // Common specific hardcoded misspellings that Levenshtein might miss or miscategorize
  const hardcodedTypos: Record<string, string> = {
    "gma.cm": "gmail.com",
    "gamil.com": "gmail.com",
    "gmail.con": "gmail.com",
    "yaho.com": "yahoo.com",
    "yahoo.con": "yahoo.com",
    "outlok.com": "outlook.com",
  };

  if (hardcodedTypos[domainPart]) {
    bestMatch = hardcodedTypos[domainPart];
  }

  if (bestMatch) {
    return `${userPart}@${bestMatch}`;
  }

  return null;
}

