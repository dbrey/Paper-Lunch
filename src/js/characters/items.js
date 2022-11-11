//Clase Periodico
export class Newspaper{
    constructor(scene, _title, _posX, _posY, _imgId){
        //super(scene);
        scene.add.existing(this);

        this.title = _title;
        this.selected = false;
        this.x = _posX;
        this.y = _posY;
        this.button = scene.add.image(_posX, _posY, _imgId).setInteractive();
        this.button.setScale(0.25, 0.2);

        //Eventos del boton
        this.button.on('pointerdown', () => {
            if (this.selected) this.selected = false;
            else this.selected = true;
            scene.checkContinueButton();
            console.log(_imgId);
        })
        this.button.on('pointerover', () => {if(!this.selected) this.button.setScale(0.3,0.25);});
        this.button.on('pointerout', () => { if(!this.selected) this.button.setScale(0.25, 0.2);});
    }

    getX() {return this.x}
    getY() {return this.y}
    getSelected() {return this.selected}
}

//clase Anuncio
export class Ad{
    constructor(scene, _posX, _posY, _imgId){
        //super(scene);
        scene.add.existing(this);

        this.x = _posX;
        this.y = _posY;
        this.selected = false;
        this.available = false;
        this.button = scene.add.image(_posX, _posY, _imgId).setInteractive();
        this.button.setScale(0.15);

        //Eventos del boton
        this.button.on('pointerdown', () => {
            console.log('soy un anuncio bloqueado');
            if (this.available && !this.selected) this.selected = true;
            else if (this.available && this.selected) this.selected = false;
        });

        this.button.on('pointerover', () => {
            if (this.available) this.button.setScale(0.2);
        })
        this.button.on('pointerout', () => {
            if (this.available) this.button.setScale(0.15);
        })
    }

    getX() {return this.x}
    getY() {return this.y}
    getSelected() {return this.selected}

}