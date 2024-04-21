class Physics {
  constructor({ vx = 0, vy = 0, vz = 0, fps = 60, g = 9.8 } = {}) {
    this.vx = vx;
    this.vy = vy;
    this.vz = vz;
    this.fps = fps;
    this.g = g;
  }

  updateParameters(playerPos) {
    this.vy -= this.g / this.fps;
    playerPos.y += this.vy / this.fps;

    if(playerPos.y < 0) {
      playerPos.y = 0;
    }

    return playerPos.y
  }
}
