class KeyControl {
  constructor() {
    //キーの状態
    this.keyStatus = {
      HOLD: 2,
      DOWN: 1,
      UNDOWN: 0,
      RELEASE: -1,
    }
    //nowのキー状態
    this.input = {
      keys: {
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
      },
      //前のフレームのキー状態
      keysPrev: {
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
      }
    }
    //キーが押されたらtrueを返す
    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowUp':
          this.input.keys.up = true;
          break;
        case 'ArrowDown':
          this.input.keys.down = true;
          break;
        case 'ArrowRight':
          this.input.keys.right = true;
          break;
        case 'ArrowLeft':
          this.input.keys.left = true;
          break;
        case 'w':
          this.input.keys.w = true;
          break;
        case 'a':
          this.input.keys.a = true;
          break;
        case 's':
          this.input.keys.s = true;
          break;
        case 'd':
          this.input.keys.d = true;
          break;
        case 'q':
          this.input.keys.q = true;
          break;
        case 'e':
          this.input.keys.e = true;
          break;
        case ' ':
          this.input.keys.space = true;
        }
    });
    //キーが離されたらfalseを返す
    document.addEventListener('keyup', (e) => {
      switch(e.key) {
        case 'ArrowUp':
          this.input.keys.up = false;
          break;
        case 'ArrowDown':
          this.input.keys.down = false;
          break;
        case 'ArrowRight':
          this.input.keys.right = false;
          break;
        case 'ArrowLeft':
          this.input.keys.left = false;
          break;
        case 'w':
          this.input.keys.w = false;
          break;
        case 'a':
          this.input.keys.a = false;
          break;
        case 's':
          this.input.keys.s = false;
          break;
        case 'd':
          this.input.keys.d = false;
          break;
        case 'q':
          this.input.keys.q = false;
          break;
        case 'e':
          this.input.keys.e = false;
          break;
        case ' ':
          this.input.keys.space = false;
        }
    });
  }
  //キーの状態を確認する
  checkButton(key) {
    if(this.input.keys[key]){
      if(this.input.keysPrev[key] == false) {
        this.input.keysPrev[key] = true;
        return this.keyStatus.DOWN;
      }
      return this.keyStatus.HOLD;
    }else{
      if(this.input.keysPrev[key] == true) {
        this.input.keysPrev[key] = false;
        return this.keyStatus.RELEASE;
      }
      return this.keyStatus.UNDOWN;
    }
  }
  
}


class Control extends KeyControl {
  constructor(moveSpeed, rotationSpeed) {
    super();

    this.keyActions = {
      a: () => player.move(-player.cosRx, player.sinRx, moveSpeed),
      d: () => player.move(player.cosRx, -player.sinRx, moveSpeed),
      w: () => player.move(player.sinRx, player.cosRx, moveSpeed),
      s: () => player.move(-player.sinRx, -player.cosRx, moveSpeed),
      left: () => player.rotation(-1, 0, rotationSpeed),
      right: () => player.rotation(1, 0, rotationSpeed),
      down: () => player.rotation(0, -1, rotationSpeed),
      up: () => player.rotation(0, 1, rotationSpeed),
      q: () => {physics.vy = 10},
      e: () => {},
      space: () => {
        if (player.pos.y === 0) {
          physics.vy = 5;
        }
      }
    }
  }

  action() {
    for (const key in this.keyActions) {
      if (this.checkButton(key) === this.keyStatus.HOLD) {
        this.keyActions[key]();
      }
    }
  }
}
