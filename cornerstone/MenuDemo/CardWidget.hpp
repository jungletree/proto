#ifndef CARDWIDGET_HPP
#define CARDWIDGET_HPP
#include <MultiWidgets/Widget.hpp>
#include <MultiWidgets/ImageWidget.hpp>
#include <Radiant/FileUtils.hpp>

namespace pbxui
{
    class CardWidget : public MultiWidgets::Widget
    {
        MultiWidgets::WidgetPtr borderWidget;
        MultiWidgets::WidgetPtr cancelWidget;
        MultiWidgets::ImageWidgetPtr menuCenter;
        MultiWidgets::ImageWidgetPtr menuItem01;
        MultiWidgets::ImageWidgetPtr menuItem02;
        MultiWidgets::ImageWidgetPtr menuItem03;
        MultiWidgets::ImageWidgetPtr menuItem04;

    public:
        CardWidget();
        void applyStyle();
    };
}

#endif // CARDWIDGET_HPP
