/* Copyright (C) 2013 projectbox
 *
 * All rights reserved.
 *
 */

///[NewWidget]
function createCanvas() {
  var appsize = $.app.mainLayer().size();
  var w = new MultiWidgets.JavaScriptWidget();
  w.setSize(appsize);
  w.setFixed();

  // properties
  w.paths = [];
  w.path = [];
  w.debug = 0;
  w.trackedId = 0;

  w.onProcessInput(function(gm, dt){
      if(gm.clippedObjectCount() > 0) {
          // only taking care of one, first touch
          var to = gm.getClippedObject(0);
          if (to.id() != w.trackedId) {
              w.paths.push(w.path);
              w.path = [];
              w.trackedId = to.id();
          }
          w.path.push(to.location());
          //w.debug = to.id();
      }
  });

  w.onUpdate(function(frameInfo){
  });

  var s = new Luminous.Style();
  s.setStrokeColor(0.1, 0.1, 0.1, 0.9);
  s.setStrokeWidth(24);
  w.onRenderContent(function(r){
    var style = new Luminous.Style();
    style.setStrokeColor(0,0,0,1);
    style.setFillColor(0,0,0,1);
    style.setStrokeWidth(1.0);
    w.debug = style;
    // draw drawn strokes
    for (i = 0; i< this.paths.length; i++) {
        for (j = 1; j < this.paths[i].length; j++) {
            r.drawLine(this.paths[i][j-1], this.paths[i][j], s);
            r.drawCircle(this.paths[i][j-1], 4.0, style);
        }
    }
    // draw drawing stroke
    for (i = 1; i< this.path.length; i++) {
        r.drawLine(this.path[i-1], this.path[i], s);
        r.drawCircle(this.path[i-1], 4.0, style);
    }
    
    var origin = new Nimble.Vector2f(400.0, 400.0);
    var a0 = new Nimble.Vector2f(200.0, 0.0);
    var a1 = new Nimble.Vector2f(0.0, 100.0);
    var rect = new Nimble.Rectangle(origin, a0, 1.0, a1, 1.0);
    //var rectf = new Nimble.Rectf(new Nimble.Vector2f(200.0, 200.0), new Nimble.Vector2f(400.0, 400.0));
    //var matrix = Nimble.makeRotation(1.0);
    //w.debug = matrix;
    /*
    matrix.make(1,0, 0.0, 0.0, 
                                     0.0, 1.0, 0.0,
                                     0.0, 0.0, 1.0);
    r.drawRect(rect.transform(matrix).boundingBox(), style);
    */

    // for debugging
    var tStyle = new Luminous.TextStyle();
    tStyle.setFillColor(1,1,1,1);
    tStyle.setGlowColor(0,0,0,1);
    tStyle.setGlow(0.5);
    tStyle.setPointSize(30);
    //r.drawText(this.strokeAge.toFixed(2), this.contentBox(), tStyle);

  });

  return w;
}

//TODO: create control widget
//TODO: create line width + and - buttons
//TODO: add animation to buttons

var w = createCanvas();
//var tw = new MultiWidgets.TextWidget("MESSAGE", w);

  // Set bright background colors to widgets by choosing hue randomly
w.setBackgroundColor(Radiant.ColorUtils.hsvTorgb(new Radiant.Color(Math.random(), 0.8, 0.9, 1.0)));
$.app.mainLayer().addChild(w);

