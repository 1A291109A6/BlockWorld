class KeyControl {
  constructor() {
    this.keys = {
      up: false,
      down: false,
      right: false,
      left: false,
      w: false,
      a: false,
      s: false,
      d: false,
      q: false,
      e: false,
      space: false
    };
    this.prevKeys = { ...this.keys };
  }

  update() {
    this.prevKeys = { ...this.keys };
  }

  isKeyDown(key) {
    return this.keys[key];
  }

  isKeyPressed(key) {
    return this.isKeyDown(key) && !this.prevKeys[key];
  }

  isKeyUp(key) {
    return !this.isKeyDown(key) && this.prevKeys[key];
  }
}

class Control extends KeyControl {
  constructor(moveSpeed, rotationSpeed) {
    super();

    this.keyActions = {
      a: () => Player.move(-Player.cosRx, Player.sinRx, moveSpeed),
      d: () => Player.move(Player.cosRx, -Player.sinRx, moveSpeed),
      w: () => Player.move(Player.sinRx, Player.cosRx, moveSpeed),
      s: () => Player.move(-Player.sinRx, -Player.cosRx, moveSpeed),
      left: () => Player.rotation(-1, 0, rotationSpeed),
      right: () => Player.rotation(1, 0, rotationSpeed),
      down: () => Player.rotation(0, -1, rotationSpeed),
      up: () => Player.rotation(0, 1, rotationSpeed),
      q: () => {},
      e: () => {},
      space: () => {
        if (Player.y === 0) {
          Player.jump();
        }
      }
    }
  }

  action() {
    this.update();

    for (const key in this.keyActions) {
      if (this.isKeyPressed(key)) {
        this.keyActions[key]();
      }
    }
  }
}
