/* Copyright (C) projectbox
 * All rights reserved. 
 *
 */

#include <MultiWidgets/Application.hpp>
#include <MultiWidgets/TextWidget.hpp>
#include <MultiWidgets/ImageWidget.hpp>
#include <MultiWidgets/Animators.hpp>

namespace Examples
{

  /// [PenVisualizer]
  class PenVisualizer : public MultiWidgets::Widget
  {
  public:
    PenVisualizer()
      : Widget()
    {
        style.setStrokeColor(lineColorR, lineColorG, lineColorB, lineColorA);
        style.setStrokeWidth(lineWidth);
        style.setFillColor(fillColorR, fillColorG, fillColorB, fillColorA);
    }
    /// [PenVisualizer]

    virtual void processPens(MultiWidgets::GrabManager &gm, const MultiWidgets::PenArray &pens, float /*dt*/) OVERRIDE
    {
      // only taking care of first touch
      if(pens[0].id() != m_trackedId) {
          m_paths.push_back(m_path);
          m_path.clear();
          m_trackedId = pens[0].id();
          printf("m_trackedId: %d\n", m_trackedId);
      }
      m_path.push_back(pens[0].location());

    }

    /// [PenVisualizer render]
    virtual void renderContent(Luminous::RenderContext & r) const OVERRIDE
    {
      renderPaths(r);
      if(m_showStroke){
        renderPathRects(r);
      }
      if(m_showCircle){
          renderPathCircles(r);
      }
    }

    private:
    void renderPathCircles(Luminous::RenderContext & r) const
    {
        Luminous::Style circleStyle;
        circleStyle.setStrokeColor(1.0, 0.0, 0.0, 1.0);
        circleStyle.setStrokeWidth(1.0);

        // draw drawn strokes
        for (auto path: m_paths) {
            for (auto point: path) {
                r.drawCircle(point, penWidth/2.0, circleStyle);
            }
        }
        // draw drawing stroke
        for (auto point: m_path) {
            r.drawCircle(point, penWidth/2.0, circleStyle);
        }
    }

    private:
    void renderPaths(Luminous::RenderContext & r) const
    {
        // draw drawn strokes
        for(auto path: m_paths) {
            r.drawPolyLine(path.data(), path.size(), style);
        }
        // draw drawing stroke
        r.drawPolyLine(m_path.data(), m_path.size(), style);
    }

    private:
    void renderPathRects(Luminous::RenderContext & r) const
    {
        // draw drawn strokes
        for (auto path: m_paths) {
            for (int i = 1; i < path.size(); i++) {
                renderRect(r, path[i-1], path[i]);
            }
        }
        // draw drawing stroke
        for (int i = 1; i< m_path.size(); i++){
            renderRect(r, m_path[i-1], m_path[i]);
        }
    }

    private:
    void renderRect(Luminous::RenderContext & r, Nimble::Vector2  v1, Nimble::Vector2  v2) const
    {
        Nimble::Vector2 v = v2 - v1;
        // rotating render context
        Luminous::TransformGuard::RightMul transformGuard(r, Nimble::Matrix3::makeTranslation(v1) * Nimble::Matrix3::makeRotation(atan(v.y/v.x)));
        Nimble::Rect rect(Nimble::Vector2(0.0, - penWidth/2.0), Nimble::Vector2(v.length(), penWidth/2.0));
        r.drawRect(rect, style);
        r.drawCircle(Nimble::Vector2(0.0, 0.0), penWidth/2.0, style);
        r.drawCircle(Nimble::Vector2(v.length(), 0.0), penWidth/2.0, style);
    }

  public:
    float lineColorR = 0.0f;
    float lineColorG = 0.0f;
    float lineColorB = 0.0f;
    float lineColorA = 1.0f;
    float lineWidth = 1.0f;
    float fillColorR = 0.0f;
    float fillColorG = 0.0f;
    float fillColorB = 0.0f;
    float fillColorA = 1.0f;
    float penWidth = 12.0f;

  public:
    // store drawn strokes
    std::vector<std::vector<Nimble::Vector2>> m_paths;
    // store drawing stroke path
    std::vector<Nimble::Vector2> m_path;
    int m_trackedId = 0;
    Luminous::Style style;
    bool m_showCircle = true;
    bool m_showStroke = false;

  };

}

//TODO: clear button
//TODO: pen width control
//TODO: circle on/off
//TODO: rect on/off

int main(int argc, char ** argv)
{
  MultiWidgets::Application app;

  if(!app.init(argc, argv))
    return 1;

  app.setStyleFilename("PenExample.css");
  auto penVisualizer = MultiWidgets::create<Examples::PenVisualizer>();
  app.mainLayer()->addChild(penVisualizer);
  penVisualizer->setSize(app.mainLayer()->size());
  penVisualizer->setCSSId("penVisualizer");
  //TODO: find out why below doesn't work
  //penVisualizer->addAttribute("textBlinkTime", 0.6f);
  penVisualizer->setFixed();

  // clear button
  auto clearButton = MultiWidgets::create<MultiWidgets::TextWidget>();
  clearButton->setCSSId("clearButton");
  clearButton->setInputFlags(MultiWidgets::Widget::INPUT_SINGLE_TAPS | MultiWidgets::Widget::INPUT_KEEP_GRABS);
  clearButton->eventAddListener("single-tap", [&] {
      penVisualizer->m_paths.clear();
      penVisualizer->m_path.clear();
  auto blink = std::make_shared<MultiWidgets::AnimatorFloat>("glow");
  blink->addKey(0.0f, 0.f);
  blink->addKey(0.3f, 1.f);
  blink->addKey(0.6f, 0.f);
  //TODO: reuse above code
  //TODO: find out why below doesn't work
  //blink->addKey(penVisualizer->textBlinkTime/2.0f, 1.f);
  //blink->addKey(penVisualizer->textBlinkTime/1.0f, 0.f);
      clearButton->addOperator(blink);
  });
  auto clearButtonBg = MultiWidgets::create<MultiWidgets::ImageWidget>();
  clearButtonBg->setCSSId("clearButtonBg");
  clearButtonBg->addChild(clearButton);

  // circle on/off button
  auto circleButton = MultiWidgets::create<MultiWidgets::TextWidget>();
  circleButton->setCSSId("circleButton");
  circleButton->setInputFlags(MultiWidgets::Widget::INPUT_SINGLE_TAPS | MultiWidgets::Widget::INPUT_KEEP_GRABS);
  circleButton->eventAddListener("single-tap", [&] {
      if(penVisualizer->m_showCircle) {
          penVisualizer->m_showCircle = false;
      } else {
          penVisualizer->m_showCircle = true;
      }
  auto blink = std::make_shared<MultiWidgets::AnimatorFloat>("glow");
  blink->addKey(0.0f, 0.f);
  blink->addKey(0.3f, 1.f);
  blink->addKey(0.6f, 0.f);
      circleButton->addOperator(blink);
  });
  auto circleButtonBg = MultiWidgets::create<MultiWidgets::ImageWidget>();
  circleButtonBg->setCSSId("circleButtonBg");
  circleButtonBg->addChild(circleButton);

  // stroke on/off button
  auto strokeButton = MultiWidgets::create<MultiWidgets::TextWidget>();
  strokeButton->setCSSId("strokeButton");
  strokeButton->setInputFlags(MultiWidgets::Widget::INPUT_SINGLE_TAPS | MultiWidgets::Widget::INPUT_KEEP_GRABS);
  strokeButton->eventAddListener("single-tap", [&] {
      if(penVisualizer->m_showStroke) {
          penVisualizer->m_showStroke = false;
      } else {
          penVisualizer->m_showStroke = true;
      }
  auto blink = std::make_shared<MultiWidgets::AnimatorFloat>("glow");
  blink->addKey(0.0f, 0.f);
  blink->addKey(0.3f, 1.f);
  blink->addKey(0.6f, 0.f);
      strokeButton->addOperator(blink);
  });
  auto strokeButtonBg = MultiWidgets::create<MultiWidgets::ImageWidget>();
  strokeButtonBg->setCSSId("strokeButtonBg");
  strokeButtonBg->addChild(strokeButton);

  penVisualizer->addChild(clearButtonBg);
  penVisualizer->addChild(circleButtonBg);
  penVisualizer->addChild(strokeButtonBg);

  // Run the application:
  return app.run();
}
