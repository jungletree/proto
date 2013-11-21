/* Copyright (C) 2013 projectbox
 *
 * All rights reserved.
 *
 */

/** @example JavaScriptWidget.js
This example shows how to create custom widgets in JavaScript code using
MultiWidgets.JavaScriptWidget.

@image html JavaScriptWidget-screenshot.png Screenshot of JavaScriptWidget example

Our custom widget will have overriden rendering, update and input processing
functions. The widget will store its transformation matrix into short history
buffer, and render previous locations of the widget as a faded color, somewhat
similar to a simple motion blur.

Function @c create() works as a constructor for our custom widget and returns
a new instance of MultiWidgets.JavaScriptWidget with our custom callbacks.
This function is called in the initialization loop that creates 10 widgets. We
place the widgets on the center of the screen and choose a nice random color
with Radiant.ColorUtils.hsvTorgb.

@snippet JavaScriptWidget.js InitLoop

In @c create() we first make a new instance of JavaScriptWidget. After that we
add some new properties to the widget.
 - @c history is a list where we add the widget rectangle and transformation
   matrix every in @c update().
 - @c historySize is the maximum size of the @c history list, in frames.
 - @c boundingBox is what we return in our overriden version of
   MultiWidgets.Widget.boundingRect.
 - @c rotationSpeed specifies how fast the widget rotates when it's not touched.
   This is animated in our @c update() -function.

Finally we set the widget origin to be something between -2 and 3, this way we
can animate the center locations of the widgets and still get them to stay in a
certain form.

@snippet JavaScriptWidget.js NewWidget

We can override MultiWidgets.Widget.update -function by registering a new function
as a parameter to MultiWidgets.JavaScriptWidget.onUpdate. Like with all
JavaScriptWidget callbacks, @c this will point to the widget itself when the
function is called. All function prototypes are identical to the C++ versions.

Update will rotate idle widgets and store the transformation matrix to the
@c history list in parent coordinate system. Then it will go through the
history, calculate new bounging box based on the rectangles in the history,
and finally convert the bounding box back to the widget coordinate system,
as required by MultiWidgets.Widget.boundingRect.

@snippet JavaScriptWidget.js Update

In our custom background renderer we go though the @c history and render the
widget using the stored transformations. We set the alpha value in the fill
color so that older rects are more transparent.

@snippet JavaScriptWidget.js RenderBackground

In renderBorder we visualize exactly the same thing we return in boundingRect,
but only in active widgets. Since we have overriden the normal
MultiWidgets.Widget.renderBorder, the default border isn't rendered at all.

@snippet JavaScriptWidget.js RenderBorder

The actual content of the widget is the text that contains the rotation speed
of the widget.

@snippet JavaScriptWidget.js RenderContent

Any custom input handling in JavaScriptWidget must be handled in processInput.
We still have normal \link MultiWidgets.Widget.inputFlags input-flags\endlink
enabled in the widget, so we are not overriding any normal behaviour, we are
just adding new functionality.

In processInput we send all widgets to fly towards any fingers on the screen.

@snippet JavaScriptWidget.js ProcessInput

Whenever a widget renders something outside its borders, it's also required to
implement a custom MultiWidgets.Widget.boundingRect -function, since the
bounding rectangle is used for clipping. All work is already been done in
@c update(), we just return the ready Nimble.Rectf.

@snippet JavaScriptWidget.js BoundingRect

The full source code is shown below:
*/

///[NewWidget]
function create() {
  var appsize = $.app.mainLayer().size();
  var w = new MultiWidgets.JavaScriptWidget();
  w.setWidth(appsize.width());
  w.setHeight(appsize.height());

  w.onProcessInput(function(gm, dt) {
    for (var i = 0; i < gm.clippedObjectCount(); i++) {
      var finger = gm.getClippedObject(i).asFinger();
      if (finger.isNull())
        continue;
      var floc = this.mapToParent(gm.project(finger.tipLocation()));
      var wloc = this.location();
      var dir = new Nimble.Vector2f(floc.x - wloc.x, floc.y - wloc.y);
      this.setVelocity(dir.x*0.1 + this.velocity().x, dir.y*0.1 + this.velocity().y);
    }
  });

/*
  // We add some custom properties to the widget
  w.history = [];
  w.historySize = 15;
  w.boundingBox = w.borderBox();
  w.rotationSpeed = 0;

  // Set random origin to widgets to make then have an offset when animating them
  w.setOrigin(new Nimble.Vector2f(Math.random()*5-2, Math.random()*5-2));
  ///[NewWidget]

  ///[RenderBackground]
  // Override the normal Widget::renderBackground
  // This version will render widget history as a "shadow"
  w.onRenderBackground(function(r) {
    var style = new Luminous.Style();
    var bg = this.backgroundColor();
    for (var i = 0; i < this.history.length; i++) {
      // Older samples have smaller alpha
      var opacity = (i+1)/this.history.length;
      bg.setAlpha(opacity * opacity);
      style.setFillColor(bg);
      // In the history we have stored the transformation matrix of the widget relative to the parent
      // Replace the transform with the transform stored in the history and render the widget as a rectangle
      r.popTransform();
      r.pushTransformRightMul(this.history[i][1]);
      r.drawRect(this.contentBox(), style);
    }
  });
  ///[RenderBackground]

  ///[RenderBorder]
  // Override the normal Widget::renderBorder
  // Visualize the bounding box on widgets that have interaction
  w.onRenderBorder(function(r) {
    if (!this.hasInteraction())
      return;
    var style = new Luminous.Style();
    style.setStrokeColor(1,1,1,0.2);
    style.setStrokeWidth(3);
    // boundingBox is updated on update
    r.drawRect(this.boundingBox, style);
  });
  ///[RenderBorder]

  ///[RenderContent]
  // Widget content is a text that contains the current rotation speed of the widget
  w.onRenderContent(function(r) {
    var style = new Luminous.TextStyle();
    // Render the text white with black glow
    style.setFillColor(1,1,1,1);
    style.setGlowColor(0,0,0,1);
    style.setGlow(0.5);
    style.setPointSize(30);
    r.drawText(this.rotationSpeed.toFixed(1), this.contentBox(), style);
  });
  ///[RenderContent]

  ///[Update]
  w.onUpdate(function(frameInfo) {
    // rotate widgets with randomly changing rotation speed unless the widget has any interaction
    if (!this.hasInteraction()) {
      w.rotationSpeed += (Math.random() - 0.5);
      this.setRotationAboutCenter(this.rotation() + frameInfo.dt() * w.rotationSpeed);
    }

    // On every frame we save the transformation matrix in history.
    // We also need to store the current bounding box in parent coordinates
    // in the history since we want to calculate exact bounding box for the
    // widget, including the motion blur / shadow animation.
    var matrix = this.transform();
    var rect = new Nimble.Rectangle(this.borderBox());
    rect.transform(matrix);

    this.history.push([rect, this.transform3D()]);
    // limit the history size to this.historySize
    if (this.history.length > this.historySize) {
      this.history.shift();
    }

    // Calculate the bounding box that will containt the whole rendered widget
    for (var i = 0; i < this.history.length-1; i++) {
      rect = Nimble.Rectangle.merge(rect, this.history[i][0]);
    }
    // convert the rectangle back to widget coordinate system
    rect.transform(matrix.inverse());
    this.boundingBox = rect.boundingBox();
  });
  ///[Update]

  ///[ProcessInput]
  // On input we animate all widgets towards all fingers on screen
  w.onProcessInput(function(gm, dt) {
    for (var i = 0; i < gm.clippedObjectCount(); i++) {
      var finger = gm.getClippedObject(i).asFinger();
      if (finger.isNull())
        continue;
      var floc = this.mapToParent(gm.project(finger.tipLocation()));
      var wloc = this.location();
      var dir = new Nimble.Vector2f(floc.x - wloc.x, floc.y - wloc.y);
      this.setVelocity(dir.x*0.1 + this.velocity().x, dir.y*0.1 + this.velocity().y);
    }
  });
  ///[ProcessInput]

  ///[BoundingRect]
  // Override Widget::onBoundingRect. This is used for render clipping,
  // so the returned value must include everything that is rendered in
  // any of the render functions
  w.onBoundingRect(function() {
    return this.boundingBox;
  });
  ///[BoundingRect]

  // Stop the rotation on interaction
  w.onInteractionBegin(function() {
    w.rotationSpeed = 0;
  });
  */

  return w;
}

var w = create();
  /*
  w.setSize(150, 150);
  w.setLocation(appsize.width() * 0.5, appsize.height() * 0.5);
  */

  // Set bright background colors to widgets by choosing hue randomly
w.setBackgroundColor(Radiant.ColorUtils.hsvTorgb(new Radiant.Color(Math.random(), 0.8, 0.9, 1.0)));
$.app.mainLayer().addChild(w);

