#pragma strict

function Start () {

}

function Update () {
	var mesh : Mesh;
	var material : Material;
	var meshf : MeshFilter = gameObject.AddComponent("MeshFilter");

	mesh.vertices = [Vector3(0, 0, 0), Vector3(0, 1, 0), Vector3(1, 1, 0)];
	mesh.uv = [Vector2(0, 0), Vector2(0, 1), Vector2(1, 1)];
	mesh.triangles = [0, 1, 2];
	material = new Material(Shader.Find("Diffuse"));
	Graphics.DrawMesh(mesh, Vector3.zero, Quaternion.identity, material, 0);
	var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	var hit : RaycastHit;
	if(Input.GetKey("mouse 0")) {
		if (Physics.Raycast(ray, hit)) {
		}
	}

}