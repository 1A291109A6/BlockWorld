class Render {
  
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
  }
  
  normalizeScreen() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    document.body.style.overflow = 'hidden';
  }
  
  perspectiveProjection(x, y, z, cx, cy, cz, angle, {focalLength = 0.5}) {
    //Move parallel
    let x = x - cx;
    let y = y - cy;
    let z = z - cz;

    //Rotation along the y-axis
    [x, z] = [
      x * Player.cosRx - z * Player.sinRx,
      x * Player.sinRx + z * Player.cosRx
    ];

    //Tilt up and down
    [y, z] = [
      y * Player.cosRy - z * Player.sinRy,
      y * Player.sinRy + z * Player.cosRy
    ];

    //Convert 3D to 2D
    if(z > focalLength) {
      [x, y] = [
        angle * x / z,
        angle * y / z
      ];
    }else{
      [x, y] = [null, null];
    }
    
    return { x, y }
  }
}