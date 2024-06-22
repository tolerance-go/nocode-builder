import { Graph, Point, EdgeView } from "@antv/x6";

// 路由参数接口
export interface CustomRouterArgs {
  offset?: number;
  verticalOffset?: number;
  sourceSide?: "left" | "right";
  targetSide?: "left" | "right";
}

function customRouter(
  vertices: Point.PointLike[],
  args: CustomRouterArgs,
  view: EdgeView
) {
  const sourceBBox = view.sourceBBox;
  const targetBBox = view.targetBBox;

  const offset = args.offset || 30;
  const verticalOffset = args.verticalOffset || 0;

  const sourceSide = args.sourceSide || "right";
  const targetSide = args.targetSide || "left";

  const sourceX =
    sourceSide === "right"
      ? sourceBBox.x + sourceBBox.width + offset
      : sourceBBox.x - offset;
  const targetX =
    targetSide === "left"
      ? targetBBox.x - offset
      : targetBBox.x + targetBBox.width + offset;

  const sourcePoint = new Point(
    sourceX,
    sourceBBox.y + sourceBBox.height / 2 + verticalOffset
  );
  const targetPoint = new Point(
    targetX,
    targetBBox.y + targetBBox.height / 2 + verticalOffset
  );

  return [sourcePoint, ...vertices, targetPoint];
}

// 注册自定义路由
Graph.registerRouter("custom", customRouter);
