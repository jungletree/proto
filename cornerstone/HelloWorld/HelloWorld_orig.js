/* Copyright (C) 2007-2013 Multi Touch Oy, Finland, http://www.multitaction.com
 *
 * This file is part of MultiTouch Cornerstone.
 *
 * All rights reserved. You may use this file only for purposes for which you
 * have a specific, written permission from Multi Touch Oy.
 *
 */

/** @example HelloWorld.js

This example is an equivalent of @ref HelloWorldExample.cpp
"HelloWorldExample.cpp" written entirely in JavaScript. It can be run as a
separate program with @c ScriptRunner or executed as a script through
Scripting::JSContext.

@image html HelloWorld-screenshot.png Screenshot of the HelloWorld example

The difference between C++- and JavaScript-version is that in JavaScript one
doesn't have to initialize MultiWidgets::Application, since it is automatically
constructed, initialized and started. So the only thing that is left for for
the programmer is to create and position the widgets. 

Inside the loop we first create new @ref MultiWidgets::Widget "Widget". Note 
that C++-namespaces are transformed to the global JavaScript-objects.

@snippet HelloWorld.js Create widget

After this the created widget is added to the child of the main layer of
application. The application is accessed through @ref js-global-object
"$-object" as its member variable @ref js-app "app".

@snippet HelloWorld.js Set to child

The rest of the loop body just sets the size, position and color of
the widget. The full source code is shown below:
*/

for (var i = 0; i < 5; ++i) {
  /// [Create widget]
  var w = new MultiWidgets.Widget();
  /// [Create widget]
  /// [Set to child]
  $.app.mainLayer().addChild(w);
  /// [Set to child]

  w.setSize(100, 100);
  w.setLocation(i * 50, i * 50);
  w.setBackgroundColor(1.0, 1.0 - i * 0.2, 0.3, 0.9);
}
