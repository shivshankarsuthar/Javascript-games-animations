var c = document.getElementById('can');
c.width = innerWidth-200; // declaring canvas size
c.height = innerHeight-200;
ctx = c.getContext('2d');

window.addEventListener('resize',function() // if window resize then canvas will auto manage its size
{
	c.width = innerWidth-200;
	c.height = innerHeight-200;
});
var angle=0; 
var lol=0;
var flag=0;
function rotate(x,y,width,height,src) //function uses for rotating google chrome logo
{
	this.x = x;
	//console.log(this.x);
	this.y = y;
	this.width = width;
	this.height = height;
	
	ctx.save();
	ctx.translate(this.x+this.width/2,this.y+this.height/2);
	ctx.rotate(angle*Math.PI/180);
	this.image = new Image();
	this.image.src = src;
	ctx.drawImage(this.image,-this.width/2+2,-this.height/2,this.width,this.height);
	ctx.restore();
	angle+=lol;
	if(flag)
	lol-=0.3;
	else
	lol+=0.01;
	if(lol<=0)
	clearInterval(interval);
}

function background(x,y,width,height,src)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.src = src;
	this.draw = function()
	{
		this.image=new Image();
		this.image.src = src;
		ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
		ctx.drawImage(this.image,this.x+this.width,this.y,this.width,this.height);
	}	
	this.update = function()
	{
		this.x -= lol;
		if(this.x <= -this.width)
		{
			this.x = 0;
		}
		this.draw();
	}
}
var shiv1 = new background(0,0,c.width,c.height,'bg2.jpg');
var sound = new sound('krishna.webm')
var angle1=10;
var angle2=0;
var use=0;
var a=0.09;
var front_x=c.width/2;
var front_y=c.height/2
var back_x = c.width/4;
var back_y = c.height/2;
function animate()
{
	ctx.clearRect(0,0,c.width,c.height);
	shiv1.update();
	var image=new Image();
	image.src = 'google.png';
	ctx.save();
	ctx.translate(back_x+27,c.height/4-8);
	ctx.rotate(angle1*Math.PI/180);
	ctx.drawImage(image,0,0,front_x-back_x+5,c.height/3);
	ctx.restore();
	rotate(back_x,back_y,c.width/10,c.width/10,'logo.png');
	rotate(front_x,front_y,c.width/10,c.width/10,'logo.png');
	
	if(angle1<=7)
	use=1;
	if(angle1>=10)
	use=0;
	if(!use)
	angle1-=a;
	if(use)
	angle1+=a;
	a+=0.0005;
}
function roko()
{
	flag=1;
	sound.pause();
}

function sound(src)
{
    this.sound = document.createElement('audio');
    this.sound.src = src;
    this.sound.setAttribute('preload','auto');
    this.sound.setAttribute('controls','none');
    this.sound.style.display = 'none';
    document.body.appendChild(this.sound);
    
    this.play = function()
    {
        this.sound.play();
    }
    this.pause = function()
    {
        this.sound.pause();
    }
    
    
}

interval = setInterval(animate,20);
sound.play();



