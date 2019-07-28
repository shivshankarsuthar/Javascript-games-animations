var c = document.getElementById('can');
c.width = window.innerWidth-350;
c.height = window.innerHeight-100;

ctx = c.getContext('2d');

function getRandomColor() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
		    color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
		}

function getRandomNumber(x,y)
{
	var lol = (y-x)*Math.random()+x;
	return lol;
}

function Circle(x,y,radius,bigRadius,degree)
{
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.bigRadius = bigRadius;
	this.degree = degree;
	var dd=this.degree;
	this.pre = {a:x,b:y};
	this.color = getRandomColor();
	this.direction = getRandomNumber(-1,1);
	this.draw = function()
	{
		ctx.beginPath();
		ctx.moveTo(this.pre.a,this.pre.b);
		ctx.lineTo(this.x,this.y);
		ctx.lineWidth = radius;
		ctx.strokeStyle = this.color;
		ctx.stroke();
		
	}
	this.move = function()
	{	this.pre.a = this.x;
		this.pre.b = this.y;
		
			this.x = mouse.x+this.bigRadius * Math.cos(dd*Math.PI/180);
			this.y = mouse.y+this.bigRadius * Math.sin(dd*Math.PI/180);
		
		dd+=this.direction;
		this.draw();
	
	}
}

var mouse ={x:undefined,y:undefined};
window.addEventListener('mousemove',
function(event){
	mouse.x = event.clientX;
	mouse.y = event.clientY;
	
});

var circleArray = [];
for(var i=0; i<150 ; i++)
{	var degree =360*Math.random();
	var bigRadius = 150*Math.random();
	var radius = 5;
	var x = 850;
	var y =Math.pow( Math.pow(bigRadius,2)-Math.pow(x-mouse.x,2),2) + mouse.y;
	circleArray.push(new Circle(x,y,radius,bigRadius,degree));
}


function animate()
{
	requestAnimationFrame(animate);
	//ctx.clearRect(0,0,innerWidth-10,innerHeight-10);
	ctx.fillStyle = 'rgba(255,255,255,0.05)';
	ctx.fillRect(0,0,innerWidth-10,innerHeight-10);
	ctx.fill();
	
	window.addEventListener('resize',
	function(event)
	{
		c.width = window.innerWidth-10;
		c.height = window.innerHeight-10;
	});

	
	for(var i=0;i<150;i++)
	{
		circleArray[i].move();
	}
	
	
}
animate();


