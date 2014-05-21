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
    pointer = new Mesh();
	pointer.vertices = [
		Vector3(-pointerSize, pointerSize, -1), Vector3(pointerSize, pointerSize, -1),
		Vector3(pointerSize, -pointerSize, -1), Vector3(-pointerSize, -pointerSize, -1)
	];
	pointer.uv = [
	    Vector2(0, 0), Vector2(1, 0), Vector2(1, 1), Vector2(0, 1)
    ];
	pointer.triangles = [
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
			Graphics.DrawMesh(pointer, curr + transform.position, Quaternion.identity, pointerMaterial, 0);
		}
	}
	Graphics.DrawMesh(strokes, transform.position , Quaternion.identity, strokeMaterial, 0);
}

