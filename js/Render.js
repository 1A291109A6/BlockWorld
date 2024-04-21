class Render {

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.centerWidth = this.canvas.width / 2;
    this.centerHeight = this.canvas.height / 2;

    document.body.style.overflow = 'hidden';
  }

  perspectiveProjection(objPos, playerPos, playerRotation, angle, { focalLength = 0.5 } = {}) {
    const [cosRx, cosRy, sinRx, sinRy] = playerRotation;

    //move parallel
    let x = objPos.x - playerPos.x;
    let y = objPos.y - playerPos.y;
    let z = objPos.z - playerPos.z;

    //rotation along the y-axis
    [x, z] = [
      x * cosRx - z * sinRx,
      x * sinRx + z * cosRx
    ];

    //tilt up and down
    [y, z] = [
      y * cosRy - z * sinRy,
      y * sinRy + z * cosRy
    ];

    //convert 3D to 2D
    if (z > focalLength) {
      [x, y] = [
        angle * x / z,
        angle * y / z
      ];
    } else {
      [x, y] = [null, null];
    }

    return { x, y }
  }

  drawPlane(posA, posB, posC, posD, color) {
    if(posA.x * posB.x * posC.x * posD.x != 0){
      this.ctx.beginPath();
      this.ctx.moveTo(this.centerWidth + posA.x, this.centerHeight - posA.y);
      this.ctx.lineTo(this.centerWidth + posB.x, this.centerHeight - posB.y);
      this.ctx.lineTo(this.centerWidth + posC.x, this.centerHeight - posC.y);
      this.ctx.lineTo(this.centerWidth + posD.x, this.centerHeight - posD.y);
      this.ctx.closePath();
      this.ctx.fillStyle = color;
      this.ctx.fill();
    }
  }

  drawBlock(objPos, playerPos, playerRotation, angle, color) {
    const planePos = [
      { x: objPos.x - 0.5, y: objPos.y - 0.5, z: objPos.z - 0.5 },
      { x: objPos.x + 0.5, y: objPos.y - 0.5, z: objPos.z - 0.5 },
      { x: objPos.x - 0.5, y: objPos.y + 0.5, z: objPos.z - 0.5 },
      { x: objPos.x + 0.5, y: objPos.y + 0.5, z: objPos.z - 0.5 },
      { x: objPos.x - 0.5, y: objPos.y - 0.5, z: objPos.z + 0.5 },
      { x: objPos.x + 0.5, y: objPos.y - 0.5, z: objPos.z + 0.5 },
      { x: objPos.x - 0.5, y: objPos.y + 0.5, z: objPos.z + 0.5 },
      { x: objPos.x + 0.5, y: objPos.y + 0.5, z: objPos.z + 0.5 }
    ];

    const vertex = planePos.map(pos => this.perspectiveProjection(pos, playerPos, playerRotation, angle));

    if (objPos.z - 0.5 > playerPos.z) {
      this.drawPlane(vertex[0], vertex[1], vertex[3], vertex[2], color);
    }
    if (objPos.x - 0.5 > playerPos.x) {
      this.drawPlane(vertex[0], vertex[2], vertex[6], vertex[4], color);
    }
    if (objPos.x + 0.5 < playerPos.x) {
      this.drawPlane(vertex[1], vertex[3], vertex[7], vertex[5], color);
    }
    if (objPos.y - 0.5 > playerPos.y) {
      this.drawPlane(vertex[0], vertex[1], vertex[5], vertex[4], color);
    }
    if (objPos.y + 0.5 < playerPos.y) {
      this.drawPlane(vertex[2], vertex[3], vertex[7], vertex[6], color);
    }
    if (objPos.z + 0.5 < playerPos.z) {
      this.drawPlane(vertex[4], vertex[5], vertex[7], vertex[6], color);
    }
  }

  displayCoordinates(playerPos) {
    this.ctx.fillStyle = "rgba(80, 80, 80, 0.8)";
    this.ctx.fillRect(0, 0, 280, 50);
    this.ctx.fillStyle = 'white';
    this.ctx.font = '16px Arial';
    this.ctx.fillText(`player(${Math.floor(playerPos.x * 10) / 10},${Math.floor(playerPos.y * 10) / 10},${Math.floor(playerPos.z * 10) / 10})`, 10, 20);
  }

  drawCross() {
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(this.centerWidth + 10, this.centerHeight);
    this.ctx.lineTo(this.centerWidth - 10, this.centerHeight);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(this.centerWidth , this.centerHeight + 10);
    this.ctx.lineTo(this.centerWidth , this.centerHeight - 10);
    this.ctx.stroke();
  }

  drawAllBlocks(playerPos, playerRotation, angle) {
    for(let i = 0; i < 20; i++){
      for(let j = 0; j < 20; j++){
        if((i + j) % 2 == 0) {
          this.drawBlock({ x: i - 10, y: -2, z: j - 10 },playerPos, playerRotation, angle, "#008000");
        }else{
          this.drawBlock({ x: i - 10, y: -2, z: j - 10 },playerPos, playerRotation, angle, "#006400");
        }
      }
    }
  }

  drawBackground() {
  this.ctx.fillStyle = '#4169e1';
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
