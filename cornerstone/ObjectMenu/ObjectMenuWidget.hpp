# include <MultiWidgets/Widget.hpp>
# include <MultiWidgets/ImageWidget.hpp>
# include <Luminous/RenderContext.hpp>

namespace PbxUi
{
    class ObjectMenuWidget : public MultiWidgets::Widget
    {
    public:
        ObjectMenuWidget();
        /*
        virtual void renderBackground(Luminous::RenderContext & r) const OVERRIDE;
        virtual bool isInside(Nimble::Vector2 v) const OVERRIDE;
        */
    private:
        Valuable::AttributeFloat m_radius;
        //Valuable::AttributeBool m_open;
    };
}
