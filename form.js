class Form {
    constructor(){

        this.input = createInput("Name");
        this.button = createButton('Draw');
        this.greeting = createElement('h2');
        this.title = createElement('h2');
        this.button2 = createButton('eraser')
    }

    hide(){
        this.input.hide();
        this.button.hide();
        this.greeting.hide();
        this.title.hide();
    }

    display(){
       if(gameState === 0){
         background(backgroundImg);
       }
        this.title.html("Art canvas");
        this.title.position(displayWidth/2-50,0);

        this.input.position(displayWidth/2-40,displayHeight/2-80);
        this.button.position(displayWidth/2+30,displayHeight/2);

        this.button2.position(displayWidth-90,500)

       // this.button2.mousePressed(()=>{
        //    gameState = 2;
        //})
 
        this.button.mousePressed(()=>{
            gameState = 1;
            this.input.hide();
            this.button.hide();
            user.name =this.input.value();
            this.greeting.html("Welcome " + user.name + " and display your talent!!" )
            this.greeting.position(displayWidth/2 + 120,40);

        })
    }


}