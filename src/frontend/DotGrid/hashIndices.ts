/**
 * Creates a hash from a set of painted dot indices using FNV-1a algorithm.
 * Sorts indices first to ensure order-independence.
 * FNV-1a is extremely fast and has good distribution for small integer sets.
 * 
 * @param indexSet - Set of number indices representing painted dots
 * @returns A 32-bit hash as a number
 */
export function hashIndices(indexSet: Set<number>): number {
  const sorted = [...indexSet].sort((a, b) => a - b);
  
  // FNV-1a 32-bit hash
  let hash = 2166136261; // FNV offset basis
  const FNV_PRIME = 16777619;
  
  for (const index of sorted) {
    hash ^= index;
    hash = Math.imul(hash, FNV_PRIME); // Math.imul for fast 32-bit multiplication
  }
  
  return hash >>> 0; // Convert to unsigned 32-bit
}

/**
 * Checks if a given set of indices matches a predetermined password hash.
 * 
 * @param indexSet - Current set of painted dot indices
 * @param passwordHash - The target hash to match against
 * @returns true if the current pattern matches the password
 */
export function checkPassword(indexSet: Set<number>, passwordHash: number): boolean {
  return hashIndices(indexSet) === passwordHash;
}

/**
 * Creates a password hash from an array of index numbers.
 * Useful for defining the password pattern.
 * 
 * @param indices - Array of indices that form the password pattern
 * @returns The password hash as a number
 */
export function createPasswordHash(indices: number[]): number {
  return hashIndices(new Set(indices));
}