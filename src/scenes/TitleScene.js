import Phaser from "phaser";
import '../objects/RainbowWiggleText';

class TitleScene extends Phaser.Scene {
  rainbowColor = [0xFF5757, 0xE8A241, 0x97FF7F, 0x52BFFF, 0x995DE8];
  rainbowColorIdx = 0;
  rainbowColorOffset = 0;
  delay = 0;
  rainbowWave = 0;

  constructor(test) {
    super({
      key: 'TitleScene'
    });
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0);
    this.music = this.sound.add('bgm');
    this.music.play({
      loop: true
    });

    this.add.rainbowWiggleText(32, 100, "welcome to...");
    this.add.rainbowWiggleText(32, 180, "SHRIMP FARMS");

    this.add.rainbowWiggleText(32, 400, "press space to begin");

    this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // this.input.on('pointerdown', () => {
    //   this.startGame();
    // });
  }

  rainbowCallback(data) {
    data.color = this.rainbowColor[(this.rainbowColorOffset + this.rainbowColorIdx) % this.rainbowColor.length];
    this.rainbowColorIdx = (this.rainbowColorIdx + 1) % (this.rainbowColor.length);
    data.y = Math.cos(this.rainbowWave + this.rainbowColorIdx) * 10;
    this.rainbowWave += 0.01;

    return data;
  }

  update(time, delta) {
    if (this.startKey.isDown) {
      this.startGame();
    }
  }

  startGame(){
    this.scene.start('GameScene');
  }

}

export default TitleScene;
