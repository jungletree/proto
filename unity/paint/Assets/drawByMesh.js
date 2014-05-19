#pragma strict

public var material : Material;
public var width : int = 2;
private var square : Mesh;
private var mesh : Mesh;
//private var fingerDown : boolean;
private var prev : Vector3;
private var segments : int = -1;
private var vertices : Array = new Array();
private var uvs : Array = new Array();
private var triangles : Array = new Array();

function Start () {
    square = new Mesh();
	square.vertices = [
		//Vector3(50, 50, 0), Vector3(100, 50, 0), Vector3(100, -50, 0), Vector3(50, -50, 0),
		//Vector3(100, 50, 0), Vector3(200, 50, 0), Vector3(200, -50, 0), Vector3(100, -50, 0),
		//Vector3(-50, 50, 0), Vector3(50, 50, 0), Vector3(50, -50, 0), Vector3(-50, -50, 0)
		Vector3(-50, 50, -1), Vector3(50, 50, -1), Vector3(50, -50, -1), Vector3(-50, -50, -1)
	];
	square.uv = [
        //Vector2(0, 0), Vector2(1, 0), Vector2(1, 1), Vector2(0, 1),
	    //Vector2(0, 0), Vector2(1, 0), Vector2(1, 1), Vector2(0, 1),
	    Vector2(0, 0), Vector2(1, 0), Vector2(1, 1), Vector2(0, 1)
    ];
	square.triangles = [
        //4, 5, 6, 6, 7, 4,
        //8, 9, 10, 10, 11, 8,
        0, 1, 2, 2, 3, 0
    ];
    //TODO: find out why this won't show mesh
	//square.triangles = [0, 2, 1, 2, 0, 3];

    mesh = new Mesh();
    print("Start executed!!");
}

function Update () {
	//var position = Vector3(30, 0, -40);
	//Graphics.DrawMesh(mesh, position, Quaternion.identity, material, 0);
	var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	var hit : RaycastHit;
	if (Input.GetKey("mouse 0")) {
		if (Physics.Raycast(ray, hit)) {
			var curr : Vector3 = hit.point + Vector3(0, 0, -1) - transform.position;
			if (segments < 0) {
                prev = curr;
                segments = 0;
            } else {
				var ortho : Vector3 = Vector3(-(prev - curr).y, (prev - curr).x, 0).normalized * width;

                print("prev: " + prev + ", curr: " + curr + ", ortho: " + ortho);

                if (ortho.magnitude > 0) {
				    vertices.Push(prev + ortho);
				    vertices.Push(curr + ortho);
				    vertices.Push(curr - ortho);
				    vertices.Push(prev - ortho);

				    uvs.Push(Vector2(0,0));
				    uvs.Push(Vector2(0,1));
				    uvs.Push(Vector2(1,1));
				    uvs.Push(Vector2(1,0));

				    triangles.Push(4 * segments);
				    triangles.Push(4 * segments + 1);
				    triangles.Push(4 * segments + 2);
				    triangles.Push(4 * segments + 2);
				    triangles.Push(4 * segments + 3);
				    triangles.Push(4 * segments);

			//print("segments: " + segments + ", vertices: " + vertices + ", uv: " + uvs + ", triangles: " + triangles);
                    mesh.Clear();
				    mesh.vertices = vertices.ToBuiltin(Vector3) as Vector3[];
				    mesh.uv = uvs.ToBuiltin(Vector2) as Vector2[];
				    mesh.triangles = triangles.ToBuiltin(int) as int[];
                    //print(mesh.triangles[mesh.triangles.length - 1]);

                    mesh.RecalculateNormals();
                    mesh.RecalculateBounds();

			        Graphics.DrawMesh(square, curr + transform.position, Quaternion.identity, material, 0);
			        //Graphics.DrawMesh(square, curr, Quaternion.identity, null, 0);

			        prev = curr;
			        segments ++;
                }
			}
			//print("segments: " + segments + ", point: " + hit.point + ", vertices.length: " + mesh.vertices.length + ", uv.length: " + mesh.uv.length + ", triangles.length: " + mesh.triangles.length);
		}
	}
	Graphics.DrawMesh(mesh, transform.position , Quaternion.identity, material, 0);
	//Graphics.DrawMesh(mesh, Vector3.zero , Quaternion.identity, null, 0);
}
