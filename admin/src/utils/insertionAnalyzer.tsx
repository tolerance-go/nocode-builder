type InsertionPositions = {
  visual: {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };
  document: {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };
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

  // 分析传入的元素，返回插入位置的对象
  public static analyze(element: HTMLElement): InsertionPositions {
    const computedStyle = window.getComputedStyle(element);
    const display = computedStyle.display;
    const isBlock = this.isBlockLevelElement(element);

    // 根据元素的布局属性和类型确定视觉上的插入位置
    const visualPositions = {
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

    // 根据视觉插入位置确定文档结构中的插入位置
    const documentPositions = {
      top: visualPositions.top,
      bottom: visualPositions.bottom,
      left: visualPositions.left,
      right: visualPositions.right,
    };

    return {
      visual: visualPositions,
      document: documentPositions,
    };
  }
}

//   // 使用示例
//   const element = document.getElementById("example-element");
//   if (element) {
//     const positions = InsertionAnalyzer.analyze(element);
//     console.log("视觉插入位置:", positions.visual);
//     console.log("文档结构插入位置:", positions.document);
//   }
