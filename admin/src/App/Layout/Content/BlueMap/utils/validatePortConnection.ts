import { Node } from "@antv/x6";
import { getBlueMapPortMetaByPortId } from "./getBlueMapPortMetaByPortId";
import { ConnectionConstraintValidateParams } from "../types/blueMap";
import { validateCommonConstraints } from "./validateCommonConstraints";

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

        const validateArgs: ConnectionConstraintValidateParams = {
          scene: "connect",
          source: { node: sourceNode },
          target: { node: targetNode },
        };

        return validateCommonConstraints(
          sourceMeta,
          selfIoType,
          targetMeta.portBlueMapAttrs.ioType,
          targetMeta.blueMapPortConfig.type,
          validateArgs
        );
      }
    }
  }
  return false;
}
