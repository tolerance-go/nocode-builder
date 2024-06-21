import { Node } from "@antv/x6";
import { getBlueMapPortMetaByPortId } from "./getBlueMapPortMetaByPortId";

interface ValidatePortConnectionArgs {
  sourceNode: Node;
  sourcePortId: string;
  targetPortId: string;
  targetNode: Node;
}

export function validatePortConnection({
  sourceNode,
  sourcePortId,
  targetPortId,
  targetNode,
}: ValidatePortConnectionArgs): boolean {
  const sourceMeta = getBlueMapPortMetaByPortId(sourcePortId, sourceNode);

  if (sourceMeta.blueMapPortConfig.constraints) {
    if (sourceMeta.blueMapPortConfig.constraints.connecting?.to) {
      const selfIoType = sourceMeta.portBlueMapAttrs.ioType;

      if (targetPortId && targetNode?.isNode()) {
        const targetMeta = getBlueMapPortMetaByPortId(targetPortId, targetNode);

        // 检查 ioType 匹配条件
        const ioTypeMatch =
          (sourceMeta.portBlueMapAttrs.ioType === "output" &&
            targetMeta.portBlueMapAttrs.ioType === "input") ||
          (sourceMeta.portBlueMapAttrs.ioType === "input" &&
            targetMeta.portBlueMapAttrs.ioType === "output");

        if (!ioTypeMatch) {
          return false;
        }

        // 检查 prohibit 条件
        if (
          sourceMeta.blueMapPortConfig.constraints.connecting.to.prohibit
            ?.length
        ) {
          const isProhibited =
            sourceMeta.blueMapPortConfig.constraints.connecting.to.prohibit
              .filter((item) => item.selfIoType === selfIoType)
              .some((item) => {
                const args = {
                  source: { node: sourceNode },
                  target: { node: targetNode },
                };
                return (
                  item.portType === targetMeta.blueMapPortConfig.type &&
                  item.ioType === targetMeta.portBlueMapAttrs.ioType &&
                  (!item.validate || item.validate(args))
                );
              });

          if (isProhibited) {
            return false;
          }
        }

        if (
          sourceMeta.blueMapPortConfig.constraints.connecting.to.allow?.length
        ) {
          return sourceMeta.blueMapPortConfig.constraints.connecting.to.allow
            .filter((item) => item.selfIoType === selfIoType)
            .every((item) => {
              const args = {
                source: { node: sourceNode },
                target: { node: targetNode },
              };
              return (
                item.portType === targetMeta.blueMapPortConfig.type &&
                item.ioType === targetMeta.portBlueMapAttrs.ioType &&
                (!item.validate || item.validate(args))
              );
            });
        }

        return true;
      }
    }
  }
  return false;
}
