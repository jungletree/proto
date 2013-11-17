#pragma strict

function Start () {

}

function Update () {

}

var gameob : GameObject;
var position : Vector3;
function create() {
    var sticky = Instantiate(gameob, position, Quaternion.identity);
    var canvas = GameObject.Find("CanvasSprite");
    sticky.transform.parent = canvas.transform;
    sticky.transform.localPosition = position;
    sticky.transform.localScale = Vector3(1, 1, 1);
}
