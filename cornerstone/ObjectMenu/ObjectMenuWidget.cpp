# include "ObjectMenuWidget.hpp"

namespace PbxUi
{
    ObjectMenuWidget::ObjectMenuWidget()
        :Widget(),
        m_radius(this, "radius", 16)
        //m_open(this, "open", false)
        {
            auto centerWidget = MultiWidgets::create<MultiWidgets::ImageWidget>();
            centerWidget->load("images/center.png");
        }
    /*void renderBackground(Luminous::Rendercontext & r) const
    {
    }
    bool isInside(Nimble::Vector2 v) const
    {
    }
    */
    Valuable::AttributeFloat m_radius;
    //Valuable::AttributeBool m_open;
}
