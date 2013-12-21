#include <MultiWidgets/Application.hpp>
#include <MultiWidgets/ImageWidget.hpp>
#include <Radiant/FileUtils.hpp>
int main(int argc, char ** argv)
{
    MultiWidgets::Application app;
    if (!app.init(argc, argv))
    {
        return 1;
    }
    app.addStyleFilename("Style.css");

    auto frame = MultiWidgets::create<MultiWidgets::Widget>();
    frame->addCSSClass("card-frame");

    auto bodyWidget = MultiWidgets::create<MultiWidgets::Widget>();
    bodyWidget->addCSSClass("card-body");
    app.mainLayer()->addChild(bodyWidget);

    auto menuCenter = MultiWidgets::create<MultiWidgets::ImageWidget>();
    menuCenter->addCSSClass("menu-center");
    if(menuCenter->load(Radiant::FileUtils::findFile("menu-center-on.png", ".:images"))) {
        bodyWidget->addChild(menuCenter);
        menuCenter->resizeToFit(menuCenter->size());
    }

    auto menuItem01 = MultiWidgets::create<MultiWidgets::ImageWidget>();
    menuItem01->addCSSClass("menu-item01");
    if(menuItem01->load(Radiant::FileUtils::findFile("menu-item-01.png", ".:images"))) {
        menuCenter->addChild(menuItem01);
        menuItem01->resizeToFit(menuItem01->size());
    }

    auto menuItem02 = MultiWidgets::create<MultiWidgets::ImageWidget>();
    menuItem02->addCSSClass("menu-item02");
    if(menuItem02->load(Radiant::FileUtils::findFile("menu-item-02.png", ".:images"))) {
        menuCenter->addChild(menuItem02);
        menuItem02->resizeToFit(menuItem02->size());
    }

    auto menuItem03 = MultiWidgets::create<MultiWidgets::ImageWidget>();
    menuItem03->addCSSClass("menu-item03");
    if(menuItem03->load(Radiant::FileUtils::findFile("menu-item-03.png", ".:images"))) {
        menuCenter->addChild(menuItem03);
        menuItem03->resizeToFit(menuItem03->size());
    }

    auto menuItem04 = MultiWidgets::create<MultiWidgets::ImageWidget>();
    menuItem04->addCSSClass("menu-item04");
    if(menuItem04->load(Radiant::FileUtils::findFile("menu-item-04.png", ".:images"))) {
        menuCenter->addChild(menuItem04);
        menuItem04->resizeToFit(menuItem04->size());
    }

    return app.run();
}
