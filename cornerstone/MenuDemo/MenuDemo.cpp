#include <CardWidget.hpp>
#include <MultiWidgets/Application.hpp>
int main(int argc, char ** argv)
{
    MultiWidgets::Application app;
    if (!app.init(argc, argv))
    {
        return 1;
    }
    app.addStyleFilename("Style.css");

    auto card = MultiWidgets::create<pbxui::CardWidget>();
    app.mainLayer()->addChild(card);

    card->applyStyle();

    return app.run();

}
