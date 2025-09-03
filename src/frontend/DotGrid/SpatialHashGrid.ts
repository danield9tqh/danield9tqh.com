/**
 * Spatial Hash Grid for efficient spatial queries
 * Divides 2D space into grid cells for fast proximity searches
 */
export class SpatialHashGrid {
  private grid: Map<string, number[]> = new Map();
  private cellSize: number;
  private points: [number, number, number][] = [];

  constructor(cellSize: number = 1) {
    this.cellSize = cellSize;
  }

  /**
   * Clear all points from the grid
   */
  clear() {
    this.grid.clear();
    this.points = [];
  }

  /**
   * Convert world position to grid cell coordinates
   */
  private hash(x: number, z: number): string {
    const gridX = Math.floor(x / this.cellSize);
    const gridZ = Math.floor(z / this.cellSize);
    return `${gridX},${gridZ}`;
  }

  /**
   * Add a point to the spatial grid
   */
  addPoint(index: number, x: number, y: number, z: number) {
    // Store the actual position for distance calculations
    this.points[index] = [x, y, z];
    
    // Add to spatial hash
    const key = this.hash(x, z);
    if (!this.grid.has(key)) {
      this.grid.set(key, []);
    }
    this.grid.get(key)!.push(index);
  }

  /**
   * Build grid from array of positions
   */
  buildFromPositions(positions: [number, number, number][]) {
    this.clear();
    positions.forEach((pos, i) => {
      this.addPoint(i, pos[0], pos[1], pos[2]);
    });
  }

  /**
   * Get all point indices in cells that could contain points within radius
   */
  private getCandidatesInRadius(x: number, z: number, radius: number): number[] {
    const candidates: number[] = [];
    const cellRadius = Math.ceil(radius / this.cellSize);
    
    const centerGridX = Math.floor(x / this.cellSize);
    const centerGridZ = Math.floor(z / this.cellSize);
    
    // Check all cells that could contain points within radius
    for (let dx = -cellRadius; dx <= cellRadius; dx++) {
      for (let dz = -cellRadius; dz <= cellRadius; dz++) {
        const gridX = centerGridX + dx;
        const gridZ = centerGridZ + dz;
        const key = `${gridX},${gridZ}`;
        
        const indices = this.grid.get(key);
        if (indices) {
          candidates.push(...indices);
        }
      }
    }
    
    return candidates;
  }

  /**
   * Find all points within exact radius (with distance check)
   */
  findPointsWithinRadius(x: number, z: number, radius: number): number[] {
    const candidates = this.getCandidatesInRadius(x, z, radius);
    const radiusSquared = radius * radius;
    const results: number[] = [];
    
    // Check actual distances for candidate points
    candidates.forEach(index => {
      const pos = this.points[index];
      if (!pos) return;
      
      const dx = x - pos[0];
      const dz = z - pos[2];
      const distSquared = dx * dx + dz * dz;
      
      if (distSquared <= radiusSquared) {
        results.push(index);
      }
    });
    
    return results;
  }

  /**
   * Find the single closest point within a maximum radius
   */
  findClosestPoint(x: number, z: number, maxRadius: number): { index: number; distance: number } | null {
    const candidates = this.getCandidatesInRadius(x, z, maxRadius);
    
    let closestIndex = -1;
    let closestDistSquared = maxRadius * maxRadius;
    
    candidates.forEach(index => {
      const pos = this.points[index];
      if (!pos) return;
      
      const dx = x - pos[0];
      const dz = z - pos[2];
      const distSquared = dx * dx + dz * dz;
      
      if (distSquared < closestDistSquared) {
        closestDistSquared = distSquared;
        closestIndex = index;
      }
    });
    
    if (closestIndex === -1) {
      return null;
    }
    
    return {
      index: closestIndex,
      distance: Math.sqrt(closestDistSquared)
    };
  }

  /**
   * Get position of a point by index
   */
  getPosition(index: number): [number, number, number] | undefined {
    return this.points[index];
  }

  /**
   * Debug: Get statistics about the grid
   */
  getStats() {
    const cellCounts = Array.from(this.grid.values()).map(arr => arr.length);
    return {
      totalPoints: this.points.length,
      totalCells: this.grid.size,
      avgPointsPerCell: cellCounts.reduce((a, b) => a + b, 0) / cellCounts.length,
      maxPointsInCell: Math.max(...cellCounts),
      minPointsInCell: Math.min(...cellCounts)
    };
  }
}