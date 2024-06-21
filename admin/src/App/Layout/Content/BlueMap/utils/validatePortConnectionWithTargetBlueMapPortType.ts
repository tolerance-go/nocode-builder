import { Node } from "@antv/x6";
import { getBlueMapPortMetaByPortId } from "./getBlueMapPortMetaByPortId";
import { ConnectionConstraintValidateParams } from "../types";

interface ValidatePortConnectionArgs {
  sourceNode: Node;
  sourcePortId: string;
  targetBlueMapPortIoType: string;
  targetBlueMapPortType: string;
}

export function validatePortConnectionWithTargetBlueMapPortType({
  sourceNode,
  sourcePortId,
  targetBlueMapPortIoType,
  targetBlueMapPortType,
}: ValidatePortConnectionArgs): boolean {
  const sourceMeta = getBlueMapPortMetaByPortId(sourcePortId, sourceNode);

  if (sourceMeta.blueMapPortConfig.constraints) {
    if (sourceMeta.blueMapPortConfig.constraints.connecting?.to) {
      const selfIoType = sourceMeta.portBlueMapAttrs.ioType;

      // 检查 ioType 匹配条件
      const ioTypeMatch =
        (sourceMeta.portBlueMapAttrs.ioType === "output" &&
          targetBlueMapPortIoType === "input") ||
        (sourceMeta.portBlueMapAttrs.ioType === "input" &&
          targetBlueMapPortIoType === "output");

      if (!ioTypeMatch) {
        return false;
      }

      // 检查 prohibit 条件
      if (
        sourceMeta.blueMapPortConfig.constraints.connecting.to.prohibit?.length
      ) {
        const isProhibited =
          sourceMeta.blueMapPortConfig.constraints.connecting.to.prohibit
            .filter((item) => item.selfIoType === selfIoType)
            .some((item) => {
              const args: ConnectionConstraintValidateParams = {
                scene: "search",
                source: { node: sourceNode },
              };
              return (
                item.portType === targetBlueMapPortType &&
                item.ioType === targetBlueMapPortIoType &&
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
          .some((item) => {
            const args: ConnectionConstraintValidateParams = {
              scene: "search",
              source: { node: sourceNode },
            };
            return (
              item.portType === targetBlueMapPortType &&
              item.ioType === targetBlueMapPortIoType &&
              (!item.validate || item.validate(args))
            );
          });
      }
    }
  }
  return false;
}
