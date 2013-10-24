#pragma strict

var texure : Texture2D;
var penColor : Color.white;

function Start () {

}

function Update () {
	var pointer : Vector2 = Input.mousePosition;
	
	/*if(Input.GetKeyDown("mouse 0")) {
		print("mouse down");
	}
	if(Input.GetKeyDown("t")) {
		print("key t down");
	}*/
	if(Input.GetKey("mouse 0")) {
		print("mouse: " + pointer.x + ", " + pointer.y);
	}
	if(Input.GetKeyUp("mouse 0")) {
		print("mouse up");
	}
	
	//TODO: convert pointing cordinate (screen) to canvas
	//TODO: 
	//TODO: update texture 
}