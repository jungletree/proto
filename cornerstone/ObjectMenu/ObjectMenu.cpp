#include <MultiWidgets/Application.hpp>
#include "ObjectMenuWidget.hpp"
int main(int argc, char ** argv)
{
    MultiWidgets::Application app;
    if (!app.init(argc, argv))
    {
        return 1;
    }
    auto w = MultiWidgets::create<PbxUi::ObjectMenuWidget>();
    app.mainLayer()->addChild(w);
    return app.run();
}
