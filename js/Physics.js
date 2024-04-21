class Physics {
  constructor({ vx = 0, vy = 0, vz = 0, fps = 60, g = 9.8}) {
    this.vx = vx;
    this.vy = vy;
    this.vz = vz;
    this.fps = fps;
    this.g = g;
  }

  updateParameters() {
    this.vy -= this.g / this.fps;
    Player.pos.x += this.vy / this.fps;

    if (Player.pos.y < 0) {
      Player.pos.y = 0;
      this.vy = 0;
    }
  }
}