var play = document.getElementById('lol');
var c = document.getElementById('can');
c.width = innerWidth-250;
c.height = innerHeight-250;
ctx = c.getContext('2d');

function getRandomColor() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
		    color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
		}

function Rectengle(x,y,width,height,speed)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.speed = speed;
	this.accelerate = 0.0003;
	this.color = getRandomColor();
	this.draw = function()
	{
		ctx.fillRect(this.x,this.y,this.width,this.height);
		ctx.fillStyle = this.color;
		ctx.fill();		
	}

	this.update1 = function()
	{
		this.x -= this.speed;
		this.speed+=this.accelerate;
		this.draw();	
	}
	this.update2 = function(key)
	{			
		if(key == '37' && this.x>0)
			this.x -= this.speed;
		
		if(key == '38' && this.y>0)
			this.y -= this.speed;
		
		if(key == '39' && this.x + this.width<c.width)
			this.x += this.speed;
		
		if(key == '40' && this.y + this.height < c.height)
			this.y += this.speed;
	
		this.speed+=3*this.accelerate;
		this.draw();
		
	}
}
var x=c.width/2;
var width = 20;
var speed = 3;
var upperArray = [];
var lowerArray = [];
var n = 100;
for(var i=0;i<n;i++)
{
	
	var height1 = Math.random()*(c.height/2 )+50;
	var height2 = -Math.random()*(c.height - height1)+75;
	upperArray.push(new Rectengle(x,0,width,height1,speed));
	lowerArray.push(new Rectengle(x,c.height,width,height2,speed));
	x = x+250;
}
var gameover =0;
window.addEventListener('keydown',function(e){
    e.preventDefault();
	e = e || window.event;
	if(!gameover)
	GamePiece.update2(e.keyCode);
	
});

var GamePiece = new Rectengle(10,c.height/2,50,50,speed*3);
var score=0;

function animate()
{	
	var lol = requestAnimationFrame(animate);
	ctx.clearRect(0,0,c.width,c.height);
	
	window.addEventListener('resize',function()
	{
		c.width = innerWidth-200;
		c.height = innerHeight-200;
	});
	
	for(var i=0;i<n;i++)
	{
		 if(((upperArray[i].x - GamePiece.width <= GamePiece.x) && (upperArray[i].x + upperArray[i].width >= GamePiece.x) && (GamePiece.y <= upperArray[i].height)) || ((lowerArray[i].x - GamePiece.width <= GamePiece.x) && (lowerArray[i].x + lowerArray[i].width >= GamePiece.x) && (GamePiece.y >= c.height+lowerArray[i].height-GamePiece.width) ))
		{	
			ctx.fillStyle = 'white';
			ctx.fillRect(0,0,c.width,c.height);
			ctx.fill();
			
			ctx.fillStyle='black';
			ctx.font = '25px Arial';
			ctx.fillText('Game Over',c.width/2-50,c.height/2);
			ctx.fillText('Your Score: '+score,c.width/2-80,c.height/2+30);
			
			play.style.left=c.width/2-40;
			play.style.top=c.height/2+110;
			play.style.display = "block";
			cancelAnimationFrame(lol);
			gameover=1;
			break;
		}
		 if(upperArray[n-1].x <=0)
		{
			ctx.fillStyle='black';
			ctx.font = '25px Arial';
			ctx.fillText('Congratulation! You Crossed this game',c.width/2-180,c.height/2);
			ctx.fillText('High Score: '+score,c.width/2-70,c.height/2+30);
			cancelAnimationFrame(lol);
			gameover=1;
			break;
		}
		else
		{	
			upperArray[i].update1();
			lowerArray[i].update1();
		}

	}
	
	if(!gameover)
	GamePiece.draw();	
	ctx.save();
	ctx.fillStyle = 'blue';
	ctx.font='25px Arial';
	ctx.fillText('Score:'+score,c.width-175,40);
	ctx.fillText('Crossed:'+parseFloat((100-(upperArray[n-1].x)*100/(n*250+500))).toFixed(0)+"%",c.width-175,70);
	ctx.restore();
	score++;
	
    if(gameover)
    {
        score--;
        var lol=0;
        var t = document.getElementById('dataTable');
        var s = t.getElementsByTagName('td');
        for(var i=0;i<s.length/2;i++)
        {
            if(score > s[2*i+1].innerHTML)
            {
               lol=1;
               break;
            }
        }
        if(lol)
        {
            var name = prompt('You made a High Score,Please tell your name');
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function()
            {
                if(this.readyState == 4 && this.status == 200)
                {
                    printscore(this);
                    
                    
                }
            };
            xhttp.open('GET','score.php?q='+name+'&r='+score,'true');
            xhttp.send();
        }
       
    }
     
}

function printscore(xml)
        {
        
           var xmlDoc = xml.responseXML;
            table = "<tr><th>Player</th><th>Score</th></tr>";
        	var  x = xmlDoc.querySelectorAll('LONDE');
        	for(var i=0; i<x.length;i++)
        	{
        		table +="<tr><td>"+x[i].getElementsByTagName('NAME')[0].childNodes[0].nodeValue+"</td><td>"+x[i].getElementsByTagName('SCORE')[0].childNodes[0].nodeValue+"</td></tr>";
        	}
        	document.getElementById('dataTable').innerHTML = table;
        	
        }
        
animate();
var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                printscore(this);
            }
        };
        xhttp.open('GET','score.xml','true');
        xhttp.send();


