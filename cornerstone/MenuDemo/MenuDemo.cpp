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
    auto centerWidget = MultiWidgets::create<MultiWidgets::ImageWidget>();
    auto centerIconPath = Radiant::FileUtils::findFile("center.png", ".:images:/Users/ogino/Documents/github_oginuno/proto/cornerstone/ObjectMenu/images");
    if(centerWidget->load(centerIconPath)){
        centerWidget->resizeToFit(Nimble::SizeF(200.0f, 200.0f));
        app.mainLayer()->addChild(centerWidget);
    }
    return app.run();
}
