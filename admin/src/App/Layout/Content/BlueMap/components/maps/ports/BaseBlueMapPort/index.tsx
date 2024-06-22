import { cx } from "@emotion/css";
import { useEffect, useState } from "react";
import { blueMapEventBus } from "../../../../globals/eventBus";
import { BlueMapPortComponentProps } from "../../../../types";
import { getNodeById } from "../../../../utils/getNodeById";
import { validatePortConnection } from "../../../../utils/validatePortConnection";
import { BasePortContext } from "../../../flows/ports/BasePort/hooks";

export const BaseBlueMapPort = ({
  blueMapPort,
  children,
  node,
  port,
  graph,
}: BlueMapPortComponentProps & {
  children?: React.ReactNode;
}) => {
  const [connectable, setConnectable] = useState(true);

  useEffect(() => {
    return blueMapEventBus.on(
      "draggingBlueMapPort",
      ({ sourceNodeId, sourcePortId }) => {
        setConnectable(
          validatePortConnection({
            sourceNode: getNodeById(sourceNodeId, graph),
            sourcePortId,
            targetNode: node,
            targetPortId: port.id,
          })
        );
      }
    );
  }, [graph, node, port.id]);

  useEffect(() => {
    return blueMapEventBus.on("dragBlueMapPortEnd", () => {
      setConnectable(true);
    });
  }, [graph, node, port.id]);

  return (
    <BasePortContext.Provider
      value={{
        datasets: {
          "data-blue-map-port": true,
          "data-blue-map-port-type": blueMapPort.config.type,
        },
        renderIcon(icon) {
          return (
            <span
              className={cx("inline-flex", {
                "opacity-10": !connectable,
              })}
            >
              {icon}
            </span>
          );
        },
      }}
    >
      {children}
    </BasePortContext.Provider>
  );
};
