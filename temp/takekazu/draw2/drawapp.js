var cElem, cCont, late, x_max, y_max;
var drawing = false;  // flag = false

//when pege loaded..
window.addEventListener('load', function(){
    cElem = document.getElementById('c');
    cCont = cElem.getContext('2d');
    late = 0;	// but  default iPad latency is 30ms
	x_max = 10;
	y_max = -8;
	
    // canvas setting
    cCont.lineJoin    = 'round';  // shape_angle
    cCont.lineCap     = 'round';  // shape_line end
    cCont.lineWidth   = 3;        // line width
    cCont.strokeStyle = '#0000FF';   // line color

    // event
    cElem.addEventListener('touchstart', start, false);  // call start() when touchstart event on canvas
    cElem.addEventListener('touchmove', move, false);   // call move() when touchstart event on canvas
    window.addEventListener('touchend', stop, false);   // call stop() when touchstart event on window

	// stop to page scroll
	document.body.addEventListener('touchmove', function(event){
		event.preventDefault();
	}, false);
}, false);

function start(event){
    //console.log("start");
    cCont.beginPath();  // reset current Path
    cCont.moveTo(event.touches[0].pageX - c.offsetLeft - x_max, event.touches[0].pageY - c.offsetTop - y_max);  // setting initial coordinate
    drawing = true;  // flag = true
}

/*
function sleep(T){
   var d1 = new Date().getTime(); 
   var d2 = new Date().getTime(); 
   while( d2 < d1 + T ){			//wait for T[msec]
       d2 = new Date().getTime();
   }
   return;
}
*/

function move(event){
    if (!drawing) return;
    //console.log("move");
	//sleep(50);	// T[msec] lag
    var dx = event.touches[0].pageX - c.offsetLeft - x_max;
    var dy = event.touches[0].pageY - c.offsetTop - y_max;
	setTimeout(function(){
    	cCont.lineTo(dx, dy);  // connect last coordinate and current coordinate with a line
		cCont.stroke();  // draw line on canvas
    }, late);
    //sampling();
}

function stop(event){
    if (!drawing) return;
    //console.log("stop");
    //cCont.lineTo(event.touches[0].pageX - c.offsetLeft - x_max, event.touches[0].pageY - c.offsetTop - y_max);	//short line
    	//cCont.stroke();
    //cCont.closePath();  // close sub path
    drawing = false;   // flag = false
}

function clearCanvas(){
    cCont.clearRect(0, 0, c.width, c.height);  // initialize canvas
}

function sampling(){  // sampling
	d = new Date();
	m = d.getMinutes();
	s = d.getSeconds();
	ms = d.getMilliseconds();
	document.getElementById("t").value = (m + ":" + s + ":" + ms + ", ");
	console.log(m + ":" + s + ":" + ms + ", ");  // log_minute, sec, msec
}

function changePensize(){  // change line width
	pElem = document.getElementsByName('pen');
	if(pElem[0].checked){
		cCont.lineWidth = 1;
	}
	else if(pElem[1].checked){
		cCont.lineWidth = 3;
	}
	else if(pElem[2].checked){
		cCont.lineWidth = 5;
	}
}

function changeLatency(){  // change stroke latency
	lElem = document.getElementsByName('latency');
	if(lElem[0].checked){
		late = 0;
	}
	else if(lElem[1].checked){
		late = 30;
	}
	else if(lElem[2].checked){
		late = 40;
	}
	else if(lElem[3].checked){
		late = 50;
	}
	else if(lElem[4].checked){
		late = 1000;
	}
}

function setCalibration(){		//  calibration
	x_max = -document.getElementById("calib_x").value;
	y_max = document.getElementById("calib_y").value;
}

