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

  addSegment(seg) {
    this.segments.push(seg);
  }

  // we don't want to have 2 points/segments in the same location therefore we check for existing ones
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

  removePoint(point) {
    const segs = this.getSegmentsWithPoint(point);
    for (const seg of segs) {
      this.removeSegment(seg);
    }
    this.points.splice(this.segments.indexOf(point), 1);
  }

  getSegmentsWithPoint(point) {
    const segs = [];
    for (const seg of this.segments) {
      if (seg.includes(point)) {
        segs.push(seg);
      }
    }
    return segs;
  }

  containsSegment(seg) {
    return this.segments.find((s) => s.equals(seg));
  }

  tryAddSegment(seg) {
    if (!this.containsSegment(seg) && !seg.p1.equals(seg.p2)) {
      this.addSegment(seg);
      return true;
    }
    return false;
  }

  removeSegment(seg) {
    this.segments.splice(this.segments.indexOf(seg), 1);
  }

  // remove everything - clear the screen
  dispose() {
    this.points.length = 0;
    this.segments.length = 0;
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
