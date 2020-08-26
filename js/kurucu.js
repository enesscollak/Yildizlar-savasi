function nesne(x,y,w,h,tip,src) {
    this.tip=tip;
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.src=src;
    this.image=new Image();
    this.image.src=this.src;
    this.draw=function () {
        firca.drawImage(this.image,this.x,this.y,this.w,this.h);
    }

    switch (this.tip) {
        case "player":
            this.yatayhizx=0;
            this.duseyhizy=0;
            this.update=function () {
                this.x+=this.yatayhizx;
                this.y+=this.duseyhizy;
                if(this.x <= 0){
                    this.x = 0;
                }
                if(this.y <= 0){
                    this.y = 0;
                }
                if(this.x + this.w >= oyunalani.width){
                    this.x = oyunalani.width - this.w;
                }
                if(this.y + this.h >= oyunalani.height){
                    this.y = oyunalani.height - this.h;
                }
                this.draw();
            }
        break;

        case "enemy":
            dusmanIndex++;
            dusmanArray[dusmanIndex]=this;
            this.id=dusmanIndex;
            this.duseyhizy=15; 
            this.update=function () {
                this.y+=this.duseyhizy;
                    if (this.y>=oyunalani.height+this.h) {
                        this.delete();
                    }
                    this.draw();
                }
                this.delete=function () {
                    delete dusmanArray[this.id];
                }
        break;

        case "mermi":
            mermiIndex++;
            mermiArray[mermiIndex]=this;
            this.id=mermiIndex;
            this.duseyhizy=40;
            this.update=function () {
                this.y+=-this.duseyhizy;
                if (this.y<-this.h) {
                    this.delete();
                }
                this.draw();
            }
            this.delete=function () {
                delete mermiArray[this.id];
            }
        break;

        case "arkaplan":
            this.duseyhizy=1;
            this.update=function(){
                this.y+=this.duseyhizy;
                    if (this.y >=0) {
                        this.y = -300;
                    }
                this.draw();
            }
        break;

        case "meteor":
            this.yatayhizx=Math.random();
            if (this.yatayhizx < 0.2) {
                this.yatayhizx = 0.1;
                }
                else if (this.yatayhizx > 0.2 && this.yatayhizx < 0.4){
                        this.yatayhizx = 0.2;
                    } 
                    else if (this.yatayhizx > 0.4 && this.yatayhizx < 0.6){
                        this.yatayhizx = -0.1;
                    }
                    else if (this.yatayhizx > 0.6 && this.yatayhizx < 0.8){
                        this.yatayhizx = -0.2;
                    }
                    else {
                        this.yatayhizx = 0;
                    }
                    this.duseyhizy = 2;
                    meteorIndex++;
                    meteorArray[meteorIndex] = this;
                    this.id=meteorIndex;
                    this.update = function(){
                        this.x += this.yatayhizx;
                        this.y += this.duseyhizy;
                        if (this.y > oyunalani.height + this.h) {
                            this.delete();
                        }
                        this.draw();
                    }
                    this.delete = function(){
                        delete meteorArray[this.id];
                    }
        break;

        case "megaDusman":
            this.yatayhizx=3;
            this.duseyhizy=8;
            this.update=function () {
                this.x += this.yatayhizx;
                this.y += this.duseyhizy; 
                if (this.y > 0) {
                    this.y =0;
                } 
                if (this.x + this.w >= oyunalani.width || this.x <= 0) {
                    this.yatayhizx = -this.yatayhizx;
                }
            this.draw();
            }
        break;

        case "megaMermi":
            this.duseyhizy=30;
            mIndex++;
            mArray[mIndex]= this;
            this.id=mIndex;
            this.update = function () {
                this.y += this.duseyhizy;
                if (this.y<-this.h) {
                    this.delete();
                }
            this.draw();        
            }
            this.delete = function(){
                delete mermiArray[this.id];
            }
        break;
    }
}

function sure(time){
    if ((ucak.sayac/time)%1==0) {
        return true;
    }
    return false;
}

function random(min,max) {
    return Math.floor(Math.random()*(max-min+1))+min;
}

function carpisma(nesne1, nesne2){
    if(nesne1.x < nesne2.x + nesne2.w && nesne1.x + nesne1.w > nesne2.x && nesne1.y < nesne2.y + nesne2.h && nesne1.y + nesne1.h > nesne2.y ){
        return true;
    }
    return false;
}

function carpismaResmi(x,y,w,h){
     let img = new Image();
     img.src = "resimler/p" + random(1, 2).toString(8) + ".png";
     firca.drawImage(img,x,y,w,h);
 }

 function yazi(text, x, y, color, font, textAlign, textBaseline) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.color = color;
    this.font = font;
    this.textAlign = textAlign;
    this.textBaseline = textBaseline;
    this.text = text;
    this.draw = function () {
        firca.fillStyle = this.color;
        firca.font = this.font;
        firca.textAlign = this.textAlign;
        firca.textBaseline = this.textBaseline;
        firca.fillText(this.text, this.x, this.y);
    }
    this.update = function () {
        this.draw();
    }
}

 
