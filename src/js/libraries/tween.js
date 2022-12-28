export default class Tweener extends Phaser.GameObjects.Container
{
    constructor(scene, x, y, fullWidth)
    {
        super(scene, x, y);
        this.scene.add.existing(this);

        this.ancho = fullWidth
        this.percent = 1;
        this.duration = 1000;

        // Barra de fondo
        this.leftShadowBorder = this.scene.add.image(x, y, 'left-cap-shadow').setOrigin(0, 0.5);

        this.shadowBar = this.scene.add.image(this.leftShadowBorder.x + this.leftShadowBorder.width, y, 'middle-shadow').setOrigin(0, 0.5);

        this.rightShadowBorder = this.scene.add.image(this.shadowBar.x + this.shadowBar.displayWidth, y, 'right-cap-shadow').setOrigin(0, 0.5);

        this.shadowBar.displayWidth = fullWidth; // La barra empieza a tope

        this.add(this.rightShadowBorder);
        this.add(this.leftShadowBorder);
        this.add(this.shadowBar);

        // Barra de energia
	    this.leftBorder = this.scene.add.image(x, y, 'left-cap').setOrigin(0, 0.5);
        this.bar = this.scene.add.image(this.leftBorder.x + this.leftBorder.width, y, 'middle').setOrigin(0, 0.5);
        this.rightBorder = this.scene.add.image(this.bar.x + this.bar.displayWidth, y, 'right-cap').setOrigin(0, 0.5);

        this.setMeterPercentage(1);

    }

    setMeterPercentage()
    {
	    this.scene.tweens.add({
		targets: this.bar,
		displayWidth: this.ancho * this.percent,
		duration: this.duration,
		ease: Phaser.Math.Easing.Sine.Out,
		onUpdate: () => 
        {
			this.rightBorder.x = this.bar.x + this.bar.displayWidth; // Hacemos que el borde derecho coincida con el fin de la barra

            // Si hay al menos un 1% la barra, se muestra el borde izquierdo, derecho y la barra
			this.bar.visible = this.bar.displayWidth > 0;
			this.leftBorder.visible = this.bar.displayWidth > 0; 
			this.rightBorder.visible = this.bar.displayWidth > 0;
		}
	})
    }

};