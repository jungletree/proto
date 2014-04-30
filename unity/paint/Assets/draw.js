#pragma strict

var texture : Texture2D;
//var penColor : Color.white;

function Start () {

}

function Update () {
	var pointer : Vector2 = Input.mousePosition;
	
	var renderer : Renderer;
	var tex : Texture2D;
    //DONE: mouse ray hit point in world cordinate
    var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
    var hit : RaycastHit;
    if(Input.GetKey("mouse 0")){
	    if (Physics.Raycast(ray, hit)) {
	    	//print("HIT! " + hit.collider + ", " + hit.point);
		    //DONE: mouse ray hit point in local texture cordinate
		    var textureWidth = 1024;
    		var textureHeight = 1024;
    		var scaleX = 1024;
   			var scaleY = 1024;
   			var texX : int;
   			var texY : int;
    		texX = (hit.point.x + scaleX/2) * textureWidth / scaleX;
    		texY = (hit.point.y + scaleY/2) * textureHeight / scaleY;
   			//print("HIT! " + texX + ", " + texY);

			//TODO: update texture 
			renderer = hit.collider.renderer;
			tex = renderer.material.mainTexture;
			//var pixelUV = hit.textureCoord;
			//print(hit.point);
			//pixelUV.x *= tex.width;
			//pixelUV.y *= tex.height;
			print(tex.width + ", " + tex.height);
			//tex.SetPixel(pixelUV.x, pixelUV.y, Color.red);
			for (var i = 0; i<10 ; i++){
				for (var j=0; j<10; j++){
					tex.SetPixel(texX+i, texY+j, Color.red);
				}
			}
			//tex.SetPixel(texX, texY, Color.red);
			//tex.Apply();
			//texture.SetPixel(texX, texY, Color.red);
			//texture.Apply();
   		}
	}
	if(Input.GetKeyUp("mouse 0")){
		tex.Apply();
	}

}
