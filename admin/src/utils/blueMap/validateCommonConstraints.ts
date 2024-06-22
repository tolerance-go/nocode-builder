import { BlueMapPortMeta, ConnectionConstraintValidateParams } from "@/types/blueMap";

export function validateCommonConstraints(
  sourceMeta: BlueMapPortMeta,
  selfIoType: string,
  targetIoType: string,
  targetPortType: string,
  validateArgs: ConnectionConstraintValidateParams
): boolean {
  const connectingConstraints =
    sourceMeta.blueMapPortConfig.constraints?.connecting;

  if (!connectingConstraints) {
    return false;
  }

  // 检查 ioType 匹配条件
  const ioTypeMatch =
    (sourceMeta.portBlueMapAttrs.ioType === "output" &&
      targetIoType === "input") ||
    (sourceMeta.portBlueMapAttrs.ioType === "input" &&
      targetIoType === "output");

  if (!ioTypeMatch) {
    return false;
  }

  // 检查 prohibit 条件
  if (connectingConstraints.to?.prohibit?.length) {
    const isProhibited = connectingConstraints.to.prohibit
      .filter((item) => item.selfIoType === selfIoType)
      .some((item) => {
        return (
          item.portType === targetPortType &&
          item.ioType === targetIoType &&
          (!item.validate || item.validate(validateArgs))
        );
      });

    if (isProhibited) {
      return false;
    }
  }

  // 检查 allow 条件
  if (connectingConstraints.to?.allow?.length) {
    return connectingConstraints.to.allow
      .filter((item) => item.selfIoType === selfIoType)
      .some((item) => {
        return (
          item.portType === targetPortType &&
          item.ioType === targetIoType &&
          (!item.validate || item.validate(validateArgs))
        );
      });
  }

  return true;
}
