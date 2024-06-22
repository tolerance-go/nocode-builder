import { Node } from "@antv/x6";
import { getBlueMapPortMetaByPortId } from "./getBlueMapPortMetaByPortId";
import { ConnectionConstraintValidateParams } from "../../../../../types/blueMap";
import { validateCommonConstraints } from "./validateCommonConstraints";

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

      const validateArgs: ConnectionConstraintValidateParams = {
        scene: "search",
        source: { node: sourceNode },
      };

      return validateCommonConstraints(
        sourceMeta,
        selfIoType,
        targetBlueMapPortIoType,
        targetBlueMapPortType,
        validateArgs
      );
    }
  }
  return false;
}
