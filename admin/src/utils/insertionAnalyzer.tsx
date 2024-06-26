import {
  DocumentInsertionPosition,
  InsertionPositions,
  RectVisualPosition,
} from "@/types/common";

export class InsertionAnalyzer {
  // 分析传入的元素，返回视觉上的插入位置
  public static analyzeVisualPositions(
    element: HTMLElement
  ): InsertionPositions {
    const computedStyle = window.getComputedStyle(element);
    const display = computedStyle.display;
    const isBlock = this.isBlockLevelElement(element);

    const parentElement = element.parentElement;
    const parentDisplay = parentElement
      ? window.getComputedStyle(parentElement).display
      : "";
    const parentFlexDirection = parentElement
      ? window.getComputedStyle(parentElement).flexDirection
      : "";

    const isParentFlex = parentDisplay === "flex";
    const isHorizontalFlex =
      isParentFlex &&
      (parentFlexDirection === "row" || parentFlexDirection === "row-reverse");

    if (isParentFlex) {
      return {
        top: !isHorizontalFlex,
        bottom: !isHorizontalFlex,
        left: isHorizontalFlex,
        right: isHorizontalFlex,
      };
    }

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

  private static isBlockLevelElement(element: HTMLElement): boolean {
    const display = window.getComputedStyle(element).display;
    return display === "block" || display === "flex" || display === "grid";
  }

  // 根据视觉插入位置确定文档结构中的插入位置
  public static analyzeDocumentPosition(
    element: HTMLElement,
    visualPosition: RectVisualPosition
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
