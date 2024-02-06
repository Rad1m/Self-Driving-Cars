class Envelope {
  constructor(skeleton, width, roundness = 10) {
    //roundness higher the number smoother the curve radius
    this.skeleton = skeleton;
    this.poly = this.#generatePolygon(width, roundness);
  }

  #generatePolygon(width, roundness) {
    const { p1, p2 } = this.skeleton;
    const radius = width / 2;
    // const alpha = Math.atan2(p1.y - p2.y, p1 / x - p2.x);
    //can be written by using our owne function angle
    const alpha = angle(subtract(p1, p2));
    const alpha_cw = alpha + Math.PI / 2; //clockwise
    const alpha_ccw = alpha - Math.PI / 2; //counter clockwise

    //draw rounded corners
    const points = [];
    const step = Math.PI / Math.max(1, roundness); //to prevent 0 roundness
    const eps = step / 2; //to prevent rounding errors for small numbers
    for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
      points.push(translate(p1, i, radius));
    }
    for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
      points.push(translate(p2, Math.PI + i, radius)); // drawing the opposite side of the radius
    }

    return new Polygon(points);
  }

  draw(ctx) {
    this.poly.draw(ctx);
    this.poly.drawSegments(ctx);
  }
}
