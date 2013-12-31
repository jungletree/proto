#include "CardWidget.hpp"

namespace pbxui
{
    CardWidget::CardWidget() : MultiWidgets::Widget()
    {
        this->addCSSClass("card-body");

        borderWidget = MultiWidgets::create<MultiWidgets::Widget>();
        // make borderWidget fixed to parent
        borderWidget->setInputFlags(MultiWidgets::Widget::INPUT_NONE);
        this->addChild(borderWidget);
        borderWidget->setDepth(-1.0);
        borderWidget->hide();
        this->eventAddListener("single-tap", [&] {
            if (borderWidget->isDisplayed()) { borderWidget->hide(); }
            else { borderWidget->show(); }
        });

        cancelWidget = MultiWidgets::create<MultiWidgets::Widget>();
        // make cancelWidget fixed to parent
        cancelWidget->setInputFlags(MultiWidgets::Widget::INPUT_SINGLE_TAPS);
        this->addChild(cancelWidget);
        // cancelWidget keep in background
        cancelWidget->setDepth(-2.0);
        cancelWidget->attribute("depth")->addListener([&] {
            cancelWidget->setDepth(-2.0);
        });
        cancelWidget->eventAddListener("single-tap", [&] {
            if (borderWidget->isDisplayed()) { borderWidget->hide(); }
        });

        menuCenter = MultiWidgets::create<MultiWidgets::ImageWidget>();
        //TODO: remove these redundant code
        menuCenter->load(Radiant::FileUtils::findFile("menu-center-off.png", ".:images"));
        auto attr = new Valuable::AttributeBool(nullptr, "enabled", false);
        menuCenter->addAttribute(attr);
        menuCenter->eventAddListener("single-tap", [&] {
            if(menuCenter->attribute("enabled")->asInt()) {
                for (auto it=menuCenter->childBegin(); it!=menuCenter->childEnd(); ++it) {
                    it->hide();
                }
                menuCenter->load(Radiant::FileUtils::findFile("menu-center-off.png", ".:images"));
                menuCenter->setValue("enabled", false);
            } else {
                for (auto it=menuCenter->childBegin(); it!=menuCenter->childEnd(); ++it) {
                    it->show();
                }
                menuCenter->load(Radiant::FileUtils::findFile("menu-center-on.png", ".:images"));
                menuCenter->setValue("enabled", true);
            }
        });
        this->addChild(menuCenter);

        menuItem01 = MultiWidgets::create<MultiWidgets::ImageWidget>();
        menuItem01->setInputFlags(MultiWidgets::Widget::INPUT_SINGLE_TAPS);
        if (menuItem01->load(Radiant::FileUtils::findFile("menu-item-01.png", ".:images"))) {
            menuCenter->addChild((menuItem01));
        }
        menuItem01->eventAddListener("finger-down", [&] {menuItem01->setOpacity(0.5);});
        menuItem01->eventAddListener("finger-up", [&] {menuItem01->setOpacity(1.0);});

        menuItem02 = MultiWidgets::create<MultiWidgets::ImageWidget>();
        menuItem02->setInputFlags(MultiWidgets::Widget::INPUT_SINGLE_TAPS);
        if(menuItem02->load(Radiant::FileUtils::findFile("menu-item-02.png", ".:images"))) {
            menuCenter->addChild(menuItem02);
        }
        menuItem02->eventAddListener("finger-down", [&] {menuItem02->setOpacity(0.5);});
        menuItem02->eventAddListener("finger-up", [&] {menuItem02->setOpacity(1.0);});

        menuItem03 = MultiWidgets::create<MultiWidgets::ImageWidget>();
        menuItem03->setInputFlags(MultiWidgets::Widget::INPUT_SINGLE_TAPS);
        if(menuItem03->load(Radiant::FileUtils::findFile("menu-item-03.png", ".:images"))) {
            menuCenter->addChild(menuItem03);
        }
        menuItem03->eventAddListener("finger-down", [&] {menuItem03->setOpacity(0.5);});
        menuItem03->eventAddListener("finger-up", [&] {menuItem03->setOpacity(1.0);});

        menuItem04 = MultiWidgets::create<MultiWidgets::ImageWidget>();
        menuItem04->setInputFlags(MultiWidgets::Widget::INPUT_SINGLE_TAPS);
        if(menuItem04->load(Radiant::FileUtils::findFile("menu-item-04.png", ".:images"))) {
            menuCenter->addChild(menuItem04);
        }
        menuItem04->eventAddListener("finger-down", [&] {menuItem04->setOpacity(0.5);});
        menuItem04->eventAddListener("finger-up", [&] {menuItem04->setOpacity(1.0);});

        // Keep menu size(scale) fixed even widget is scaled.
        this->attribute("scale")->addListener([&] {
            //qDebug() << scaleAttr->asFloat();
            menuCenter->setScale(1.0/this->attribute("scale")->asFloat());
        });


        //TODO: make this work, to remove above redundant code..
        /*for (auto it=menuCenter->childBegin(); it!=menuCenter->childEnd(); ++it) {
            qDebug() << it->name();
            it->setInputFlags(MultiWidgets::Widget::INPUT_SINGLE_TAPS);
            it->eventAddListener("finger-down", [&] { it->setOpacity(0.5); });
            it->eventAddListener("finger-up", [&] { it->setOpacity(1.0); });
        } */

        // TODO: menu show/hide animation

        // hide menu items when initiated..
        for (auto it = menuCenter->childBegin(); it != menuCenter->childEnd(); ++it) {
            it->hide();
        }
    }

    void CardWidget::applyStyle()
    {
        borderWidget->addCSSClass("card-border");
        cancelWidget->addCSSClass("card-cancel");
        menuCenter->addCSSClass("menu-center");
        menuCenter->resizeToFit(menuCenter->size());
        menuItem01->addCSSClass("menu-item01");
        menuItem01->resizeToFit(menuItem01->size());
        menuItem02->addCSSClass("menu-item02");
        menuItem02->resizeToFit(menuItem02->size());
        menuItem03->addCSSClass("menu-item03");
        menuItem03->resizeToFit(menuItem03->size());
        menuItem04->addCSSClass("menu-item04");
        menuItem04->resizeToFit(menuItem04->size());
    }
}
