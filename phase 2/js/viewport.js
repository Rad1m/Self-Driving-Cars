class Viewport {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.zoom = 1;
    this.center = new Point(canvas.width / 2, canvas.height / 2);
    this.offset = scale(this.center, -1);

    //implement pan the screen function
    this.pan = {
      start: new Point(0, 0),
      end: new Point(0, 0),
      offset: new Point(0, 0),
      active: false,
    };

    this.#addEventListeners();
  }

  getMouse(evt) {
    return new Point(evt.offsetX * this.zoom, evt.offsetY * this.zoom);
  }

  getOffset() {
    return add(this.offset, this.pan.offset);
  }

  #addEventListeners() {
    this.canvas.addEventListener(
      "mousewheel",
      this.#handleMouseWheel.bind(this)
    );
    this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
    this.canvas.addEventListener("mouseup", this.#handleMouseUp.bind(this));
  }

  #handleMouseDown(evt) {
    if (evt.button == 1) {
      this.pan.start = this.getMouse(evt);
      this.pan.active = true;
    }
  }

  #handleMouseMove(evt) {
    if (this.pan.active) {
      this.pan.end = this.getMouse(evt);
      this.pan.offset = subtract(this.pan.end, this.pan.start);
    }
  }

  #handleMouseUp(evt) {
    if (this.pan.active) {
      this.offset = add(this.offset, this.pan.offset);
      this.pan = {
        start: new Point(0, 0),
        end: new Point(0, 0),
        offset: new Point(0, 0),
        active: false,
      };
    }
  }

  #handleMouseWheel(evt) {
    const dir = Math.sign(evt.deltaY);
    const step = 0.1;
    this.zoom += dir * step;
    this.zoom = Math.max(1, Math.min(5, this.zoom));
  }
}
