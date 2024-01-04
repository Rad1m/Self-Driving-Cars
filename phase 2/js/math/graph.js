// Graphs
// G - graph, V = nodes/vertices, E = links/edges
// G = (V, E)

class Graph {
  // graph parameters are points and segments
  constructor(points = [], segments = []) {
    // we will store parameters as attributes
    this.points = points;
    this.segments = segments;
  }

  addPoint(point) {
    this.points.push(point);
  }

  // we don't want to have 2 points in the same location therefore we check for existing ones
  containsPoint(point) {
    return this.points.find((p) => p.equals(point));
  }

  tryAddPoint(point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }
    return false;
  }

  // draw method implementation
  draw(ctx) {
    // go through all segments
    for (const seg of this.segments) {
      // and draw themselves
      seg.draw(ctx);
    }

    // repeat for segments
    // segments to be drawn before lines to prevent segments being out of lines
    for (const point of this.points) {
      point.draw(ctx);
    }
  }
}
