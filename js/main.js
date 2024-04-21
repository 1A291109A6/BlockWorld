const canvas = document.getElementById('gameScreen');

const render = new Render(canvas);
const player = new Player(0, 10, 0, 0, 0);
const control = new Control(10, 2);
const physics = new Physics();


function updateFrame() {
  player.pos.y = physics.updateParameters(player.pos);
  control.action();
  render.drawBackground();
  render.drawAllBlocks(player.pos, player.trigonometricFunction, canvas.width / 2);
  render.displayCoordinates(player.pos);
  render.drawCross();
}

function gameLoop() {
  updateFrame();
  time = performance.now();
  requestAnimationFrame(gameLoop);
}

gameLoop();
