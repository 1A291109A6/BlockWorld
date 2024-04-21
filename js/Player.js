class Player {
  
  constructor(x, y, z, rx, ry, { fps = 60 }) {
    this.pos = { x, y, z };
    this.dir = { rx, ry };
    this.fps = fps;
    this.updateTrigonometricFunction();
  }
  
  updateTrigonometricFunction() {
    this.cosRx = Math.cos(this.dir.rx);
    this.cosRy = Math.cos(this.dir.ry);
    this.sinRx = Math.sin(this.dir.rx);
    this.sinRy = Math.sin(this.dir.ry);
  }
  
  move(dx, dz, speed) {
    this.pos.x += speed * dx / this.fps;
    this.pos.z += speed * dz / this.fps;
  }
  
  rotation(drx, dry, speed) {
    this.dir.rx += speed * drx / this.fps;
    this.dir.ry += speed * dry / this.fps;

    this.dir.ry = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.dir.ry));
    
    this.updateTrigonometricFunction();
  }
  
}