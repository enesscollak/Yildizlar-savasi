
var oyunalani,firca,ucak,oyuncu,dusmanArray,dusmanIndex,
skor,oyuncuYazi,mermiArray,mermiIndex,arkaplan, meteorArray, meteorIndex,hazir,megaDusman,
dusmanYazi, oyunbittiYazi, dusmanCan,mIndex, mArray, kazandin;

class oyun{
    constructor(){
        oyunalani=document.getElementById("canvas");
        oyunalani.width=400;
        oyunalani.height=600;
        firca=oyunalani.getContext("2d");
        document.addEventListener("keydown",this.kontrolDown.bind(this));
        document.addEventListener("keyup",this.kontrolUp.bind(this));
        document.addEventListener("mousedown",this.mouseDown.bind(this));
        this.timer = setInterval(this.animate.bind(this),60);
    }
    init(){
        this.sayac = 0 ;
        skor=1;
        oyuncu=new nesne(50,50,100,100,"player","resimler/player.png");
        let x,y,w,h;
        w=75;
        h=75;
        x=oyunalani.width/2-w/2;
        y=oyunalani.height-h;
        oyuncu = new nesne(x,y,w,h,"player","resimler/player.png");
        dusmanArray=[];
        dusmanIndex = 0;
        mArray =[];
        mIndex=0;
        mermiArray =[];
        mermiIndex = 0;
        meteorArray =[];
        meteorIndex = 0;
        oyuncuYazi = new yazi("Skor: " + skor,5,10,"blue","25px Arial","left","hanging");
        arkaplan = new nesne(0,-300,400,900,"arkaplan","resimler/arkaplan.png");
        hazir=false;
        let mx, my, mw, mh;
        mw=200;
        mh=170;
        mx=random(0, oyunalani.width - mw);
        my=-mh;
        dusmanCan = 100; 
        megaDusman = new nesne(mx,my,mw,mh, "megaDusman","resimler/bigEnemy.png" );
        dusmanYazi = new yazi("Düşman: "+dusmanCan,oyunalani.width - 160,10 ,"red","25px Arial","left","hanging");
        oyunbittiYazi = new yazi("Oyun Bitti!",200 ,300 ,"red","45px Arial","center","hanging");
        kazandin = new yazi("TEBRİKLER! KAZANDIN!",200 ,300 ,"green","30px Arial","center","hanging");
    }
    clear(){
        firca.clearRect(0,0,oyunalani.width,oyunalani.height);
    }
    kontrolDown(event){
        if(event.keyCode == 65){
            oyuncu.yatayhizx = -30;
            oyuncu.duseyhizy = 0;
        }
        if(event.keyCode == 87){
            oyuncu.duseyhizy = -30;
            oyuncu.yatayhizx = 0;
        }
        if(event.keyCode == 68){
            oyuncu.yatayhizx = 30;
            oyuncu.duseyhizy = 0;
        }
        if(event.keyCode == 83){
            oyuncu.duseyhizy = 30;
            oyuncu.yatayhizx = 0;
        }
        if(event.keyCode == 32){
            this.kanatMermi();   
        }
    }
    kontrolUp(){
        oyuncu.yatayhizx =0;
        oyuncu.duseyhizy=0;
    }
    stop(){
        clearInterval(this.timer);
    }
    mouseDown() {
       let x, y, w, h;
        w = 10;
        h = 20;
        x = oyuncu.x + oyuncu.w / 2 - w / 2;
        y = oyuncu.y;
        new nesne(x, y, w, h, "mermi", "resimler/mermi.png");
     }
     kanatMermi() {
        let x, y, w, h;
        w = 10;
        h = 20;
        x = oyuncu.x + 2;
        y = oyuncu.y + 50;
        new nesne(x, y, w, h, "mermi", "resimler/mermi.png");
        let x2, y2, w2, h2;
        w2 = 10;
        h2 = 20;
        x2 = oyuncu.x + 63;
        y2 = oyuncu.y + 50;
        new nesne(x2, y2, w2, h2, "mermi", "resimler/mermi.png");
    }
    animate(){
        this.sayac++;
        this.clear();
        arkaplan.update();
        oyuncuYazi.update();
        if (sure(240)) {               
        let x,y,boyut;
        boyut = random(50,100);
        x = random(0,oyunalani.width - boyut);
        y = -boyut;
        new nesne(x,y,boyut,boyut,"meteor","resimler/meteor" + random(1,7)+".png");
        }
        meteorArray.forEach(meteor => {
            meteor.update();
        });
        mermiArray.forEach(mermi => {
            mermi.update();
        });
        if (hazir && megaDusman != null) {
           megaDusman.update();
           mermiArray.forEach(mermi => {
               if (carpisma(mermi, megaDusman)) {
                   mermi.delete();
                   dusmanCan-=1;
                   dusmanYazi.text="Dusman: "+ dusmanCan;
                   carpismaResmi(mermi.x, mermi.y,-35,30,30);
               }
           });
           if (sure(100)) {
            let w = 10;
            let h = 40;
            let x = megaDusman.x + 9;
            let y = megaDusman.y + 120;
            new nesne(x, y, w, h, "megaMermi", "resimler/mermi2.png");
            let w2 = 10;
            let h2 = 40;
            let x2 = megaDusman.x + 190;
            let y2 = megaDusman.y + 120;
            new nesne(x2, y2, w2, h2, "megaMermi", "resimler/mermi2.png");
        }
        else if (sure(200)) {
            let w = 10;
            let h = 40;
            let x = megaDusman.x + 50;
            let y = megaDusman.y + 125;
            new nesne(x, y, w, h, "megaMermi", "resimler/mermi2.png");
            let w2 = 5;
            let h2 = 20;
            let x2 = megaDusman.x + 145;
            let y2 = megaDusman.y + 125;
            new nesne(x2, y2, w2, h2, "megaMermi", "resimler/mermi2.png");
        }
        else if (sure(30)) {
            let w = 10;
            let h = 40;
            let x = megaDusman.x + 98;
            let y = megaDusman.y + 135;
            new nesne(x, y, w, h, "megaMermi", "resimler/mermi2.png");
        }
        mArray.forEach(megamermi => {
            megamermi.update();
            if (carpisma(megamermi,oyuncu)) {
                megamermi.delete();
                skor-=1;
                carpismaResmi(oyuncu.x,oyuncu.y,oyuncu.w,oyuncu.h);
            }
        });
            dusmanYazi.update();          
            if (dusmanCan<=0) {
                carpismaResmi(megaDusman.x, megaDusman.y,megaDusman.w,megaDusman.h);
                megaDusman =null;
            }
        }   else if (megaDusman==null) {
            oyuncuYazi.text="";
        }
        else{
            dusmanArray.forEach(enemy => {
                mermiArray.forEach(mermi => {
                    if (carpisma(enemy, mermi)) {
                        enemy.delete();
                        mermi.delete();
                        skor += 1;
                        oyuncuYazi.text = "Skor: " + skor;
                        carpismaResmi(enemy.x, enemy.y, enemy.w, enemy.h);
                    }
                });
            });
            if (sure(20)) {
                let x,y,w,h;
                w=50;
                h=75;
                x=random(0,oyunalani.width-w);
                y=-h;
                new nesne(x,y,w,h,"enemy","resimler/enemy"+random(1,6)+".png");   
            }
            dusmanArray.forEach(enemy => {
                enemy.update();
                if (carpisma(enemy,oyuncu)) {
                    enemy.delete();
                    skor-=1;
                    oyuncuYazi.text="Skor: "+skor;
                    carpismaResmi(oyuncu.x, oyuncu.y,oyuncu.w,oyuncu.h);
                }
            });
        }
        if (skor >= 20) {
            hazir=true;
        }
        if (skor == 0 ) {
            oyunbittiYazi.update();
            oyuncuYazi.text="";
            this.stop();
        }
        oyuncu.update();
        if (megaDusman == null) {
            kazandin.update();
        }
    }
}
ucak=new oyun();
ucak.init();