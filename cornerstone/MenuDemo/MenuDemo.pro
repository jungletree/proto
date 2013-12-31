# If this file exists, we are building inside the SDK source tree
exists($$PWD/../../common.pri):include($$PWD/../../common.pri)
else {
  exists($$(CORNERSTONE_SDK_ROOT)/cornerstone.pri):include($$(CORNERSTONE_SDK_ROOT)/cornerstone.pri)
  else:include(/opt/cornerstone-2.0.0/cornerstone.pri)
}

SOURCES += MenuDemo.cpp \
    CardWidget.cpp

LIBS += $$LIB_PATTERNS
LIBS += $$LIB_NIMBLE
LIBS += $$LIB_RADIANT
LIBS += $$LIB_VALUABLE
LIBS += $$LIB_LUMINOUS
LIBS += $$LIB_RESONANT
LIBS += $$LIB_VIDEODISPLAY
LIBS += $$LIB_MULTITOUCH
LIBS += $$LIB_STYLISH
LIBS += $$LIB_MULTIWIDGETS
LIBS += $$LIB_WEB_BROWSER
LIBS += $$LIB_OPENGL
LIBS += $$LIB_MULTISTATEDISPLAY
LIBS += $$LIB_SCRIPT
LIBS += $$LIB_MUSHY

win32 {
  LIBS += -llibsndfile-1
  CONFIG += console
}

unix: PKGCONFIG += sndfile

# Create install target for the source files
other.path = /examples/$$TARGET
other.files = MenuDemo.pro MenuDemo.cpp Style.css

INSTALLS += other

HEADERS += \
    CardWidget.hpp

OTHER_FILES += \
    images/menu-center-off.png \
    images/menu-center-on.png \
    images/menu-item-01.png \
    images/menu-item-02.png \
    images/menu-item-03.png \
    images/menu-item-04.png

