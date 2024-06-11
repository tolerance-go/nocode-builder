import { DocumentInsertionPosition, VisualPosition } from "@/types";

type InsertionPositions = {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
};

export class InsertionAnalyzer {
  // 判断一个元素是否为块级元素
  private static isBlockLevelElement(element: HTMLElement): boolean {
    const blockElements = [
      "div",
      "section",
      "article",
      "aside",
      "footer",
      "header",
      "nav",
      "main",
      "figure",
      "figcaption",
      "form",
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "td",
      "th",
    ];
    return blockElements.includes(element.tagName.toLowerCase());
  }

  // 分析传入的元素，返回视觉上的插入位置
  public static analyzeVisualPositions(
    element: HTMLElement
  ): InsertionPositions {
    const computedStyle = window.getComputedStyle(element);
    const display = computedStyle.display;
    const isBlock = this.isBlockLevelElement(element);

    // 根据元素的布局属性和类型确定视觉上的插入位置
    return {
      top:
        isBlock ||
        display === "block" ||
        display === "flex" ||
        display === "grid",
      bottom:
        isBlock ||
        display === "block" ||
        display === "flex" ||
        display === "grid",
      left: !isBlock || display === "inline" || display === "inline-block",
      right: !isBlock || display === "inline" || display === "inline-block",
    };
  }

  // 根据视觉插入位置确定文档结构中的插入位置
  public static analyzeDocumentPosition(
    element: HTMLElement,
    visualPosition: VisualPosition
  ): DocumentInsertionPosition {
    const visualPositions = this.analyzeVisualPositions(element);

    switch (visualPosition) {
      case "top":
        return visualPositions.top ? "before" : "not-allowed";
      case "bottom":
        return visualPositions.bottom ? "after" : "not-allowed";
      case "left":
        return visualPositions.left ? "before" : "not-allowed";
      case "right":
        return visualPositions.right ? "after" : "not-allowed";
      default:
        return "not-allowed";
    }
  }
}
