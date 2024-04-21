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

  perspectiveProjection(objPos, playerPos, playerRotation, angle, { focalLength = 0.5 }) {
    const { cosRx, cosRy, sinRx, sinRy } = playerRotation;

    //Move parallel
    let x = objPos.x - playerPos.x;
    let y = objPos.y - playerPos.y;
    let z = objPos.z - playerPos.z;

    //Rotation along the y-axis
    [x, z] = [
      x * cosRx - z * sinRx,
      x * sinRx + z * cosRx
    ];

    //Tilt up and down
    [y, z] = [
      y * cosRy - z * sinRy,
      y * sinRy + z * cosRy
    ];

    //Convert 3D to 2D
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
    this.ctx.beginPath();
    this.ctx.moveTo(this.centerWidth + posA.x, this.centerHeight - posA.y);
    this.ctx.lineTo(this.centerWidth + posB.x, this.centerHeight - posB.y);
    this.ctx.lineTo(this.centerWidth + posC.x, this.centerHeight - posC.y);
    this.ctx.lineTo(this.centerWidth + posD.x, this.centerHeight - posD.y);
    this.ctx.closePath();
    context.fillStyle = color;
    this.ctx.fill();
  }

  drawCube(objPos, playerPos, playerRotation, angle, color) {
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

    const vertex = planePos.map(pos => perspectiveProjection(pos, playerPos, playerRotation, angle));

    if (objPos.z - 0.5 > playerPos.z) {
      drawPlane(vertex[0], vertex[1], vertex[3], vertex[2], color);
    }
    if (objPos.x - 0.5 > playerPos.x) {
      drawPlane(vertex[0], vertex[2], vertex[6], vertex[4], color);
    }
    if (objPos.x + 0.5 < playerPos.x) {
      drawPlane(vertex[1], vertex[3], vertex[7], vertex[5], color);
    }
    if (objPos.y - 0.5 > playerPos.y) {
      drawPlane(vertex[0], vertex[1], vertex[5], vertex[4], color);
    }
    if (objPos.y + 0.5 < playerPos.y) {
      drawPlane(vertex[2], vertex[3], vertex[7], vertex[6], color);
    }
    if (objPos.z + 0.5 < playerPos.z) {
      drawPlane(vertex[4], vertex[5], vertex[7], vertex[6], color);
    }
  }

  displayCoordinates(playerPos) {
    context.fillStyle = "rgba(80, 80, 80, 0.8)";
    context.fillRect(0, 0, 280, 50);
    context.fillStyle = 'white';
    context.font = '16px Arial';
    context.fillText(`player(${Math.floor(playerPos.x * 10) / 10},${Math.floor(playerPos.y * 10) / 10},${Math.floor(playerPos.z * 10) / 10})`, 10, 20);
  }

  drawCross() {
    context.strokeStyle = "white";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(this.centerWidth + 10, this.centerHeight);
    context.lineTo(this.centerWidth - 10, this.centerHeight);
    context.stroke();
    context.beginPath();
    context.moveTo(this.centerWidth , this.centerHeight + 10);
    context.lineTo(this.centerWidth , this.centerHeight - 10);
    context.stroke();
  }
}
