import Phaser from 'phaser';

export default class RainbowWiggleText extends Phaser.GameObjects.DynamicBitmapText {
  rainbowColor = [0xFF5757, 0xE8A241, 0x97FF7F, 0x52BFFF, 0x995DE8];

  rainbowCallback(data) {
    data.color = this.rainbowColor[(this.rainbowColorOffset + this.rainbowColorIdx) % this.rainbowColor.length];
    this.rainbowColorIdx = (this.rainbowColorIdx + 1) % (this.rainbowColor.length);
    data.y = Math.cos(this.rainbowWave + this.rainbowColorIdx) * 10;
    this.rainbowWave += 0.01;

    return data;
  }

  constructor(scene, x, y, text) {
    super(scene, x, y, 'desyrel', '', 64);
    this.setDisplayCallback(this.rainbowCallback.bind(this));
    this.textContent = text;
    this.textIndex = 0;
    this.textUpdateDelay = 0;
    this.rainbowColorIdx = 0;
    this.rainbowColorOffset = 0;
    this.delay = 0;
    this.rainbowWave = 0;
  }

  preUpdate(time, delta){
    this.rainbowColorIdx = 0;
    if (this.delay++ === 12) {
      this.rainbowColorOffset = (this.rainbowColorOffset + 1) % (this.rainbowColor.length);
      this.delay = 0;
    }

    if(this.textUpdateDelay++ === 20) {
      if(this.textIndex <= this.textContent.length - 1) {
        this.text += this.textContent[this.textIndex];
        this.textIndex += 1;
      }
      this.textUpdateDelay = 0;
    }
  }
}

Phaser.GameObjects.GameObjectFactory.register('rainbowWiggleText', function(x,y, text) {
  const rainbowWiggleText = new RainbowWiggleText(this.scene, x, y, text);

  this.displayList.add(rainbowWiggleText);
  this.updateList.add(rainbowWiggleText);

  return rainbowWiggleText;
});
