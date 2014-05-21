#pragma strict

public var strokeMaterial : Material;
public var pointerMaterial : Material;
public var strokeWidth : int = 6;
public var pointerSize : int = 10;
private var pointer : Mesh;
private var strokes : Mesh;
//private var fingerDown : boolean;
private var prev : Vector3;
private var pprev : Vector3;
private var segments : int = -2;
private var vertices : Array = new Array();
private var uvs : Array = new Array();
private var triangles : Array = new Array();

function Start () {
	//var radius = 20;
    pointer = new Mesh();
	pointer.vertices = [
	/*
		Vector3(0, 0, -1),  // 0
		Vector3(radius*Mathf.Cos(0/4*Mathf.PI), radius*Mathf.Sin(0/4*Mathf.PI), -1),  // 1
		Vector3(radius*Mathf.Cos(1/4*Mathf.PI), radius*Mathf.Sin(1/4*Mathf.PI), -1),  // 2
		Vector3(radius*Mathf.Cos(2/4*Mathf.PI), radius*Mathf.Sin(2/4*Mathf.PI), -1),  // 3
		Vector3(radius*Mathf.Cos(3/4*Mathf.PI), radius*Mathf.Sin(3/4*Mathf.PI), -1),  // 4
		Vector3(radius*Mathf.Cos(4/4*Mathf.PI), radius*Mathf.Sin(4/4*Mathf.PI), -1),  // 5
		Vector3(radius*Mathf.Cos(5/4*Mathf.PI), radius*Mathf.Sin(5/4*Mathf.PI), -1),  // 6
		Vector3(radius*Mathf.Cos(6/4*Mathf.PI), radius*Mathf.Sin(6/4*Mathf.PI), -1),  // 7
		Vector3(radius*Mathf.Cos(7/4*Mathf.PI), radius*Mathf.Sin(7/4*Mathf.PI), -1)   // 8
		*/
		Vector3(-pointerSize, pointerSize, -1), Vector3(pointerSize, pointerSize, -1),
		Vector3(pointerSize, -pointerSize, -1), Vector3(-pointerSize, -pointerSize, -1)
	];
	pointer.uv = [
	/*
		Vector2(0.5, 0.5),
	    Vector2(1, 0), Vector2(1, 1), Vector2(0, 1), Vector2(-1, 1),
	    Vector2(-1, 0), Vector2(-1, -1), Vector2(0, -1), Vector2(1, -1)
	    */
	    Vector2(0, 0), Vector2(1, 0), Vector2(1, 1), Vector2(0, 1)
    ];
	pointer.triangles = [
	/*
        0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5, 0, 5, 6, 0, 6, 7, 0, 7, 8, 0, 8, 1
        //0, 2, 1, 0, 3, 2, 0, 4, 3, 0, 5, 4, 0, 6, 5, 0, 7, 6, 0, 8, 7, 0, 1, 8,
        */
        0, 1, 2, 2, 3, 0
    ];

    strokes = new Mesh();
    print("Start executed!!");
}

function Update () {
	var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	var hit : RaycastHit;
	if (Input.GetKey("mouse 0")) {
		if (Physics.Raycast(ray, hit)) {
			var curr : Vector3 = hit.point + Vector3(0, 0, -1) - transform.position;
			if (segments < -1) {
                prev = curr;
                segments ++;
            } else if ( (prev - curr).magnitude > 2 * strokeWidth ) {
            	if ( segments == -1 ) {
            		pprev = prev;
            		prev = curr;
            		segments ++;
            	} else {
            		var ortho1 : Vector3 = Vector3( -(prev - pprev).y, (prev - pprev).x, 0).normalized * strokeWidth;
            		var ortho2 : Vector3 = Vector3( -(curr - prev).y, (curr - prev).x, 0).normalized * strokeWidth;

            		vertices.Push( (pprev + prev) / 2 + ortho1 );
            		vertices.Push( (prev  + curr) / 2 + ortho2 );
            		vertices.Push( (prev  + curr) / 2 - ortho2 );
            		vertices.Push( (pprev + prev) / 2 - ortho1 );

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

					strokes.Clear();
					strokes.vertices = vertices.ToBuiltin(Vector3) as Vector3[];
					strokes.uv = uvs.ToBuiltin(Vector2) as Vector2[];
					strokes.triangles = triangles.ToBuiltin(int) as int[];

					strokes.RecalculateNormals();
					strokes.RecalculateBounds();

					pprev = prev;
			        prev = curr;
			        segments ++;
			    }
			} else {
				// do nothing ...
			}
			//print("segments: " + segments + ", point: " + hit.point + ", vertices.length: " + mesh.vertices.length + ", uv.length: " + mesh.uv.length + ", triangles.length: " + mesh.triangles.length);

			Graphics.DrawMesh(pointer, curr + transform.position, Quaternion.identity, pointerMaterial, 0);
		}
	}
	Graphics.DrawMesh(strokes, transform.position , Quaternion.identity, strokeMaterial, 0);
	//Graphics.DrawMesh(mesh, Vector3.zero , Quaternion.identity, null, 0);
}

