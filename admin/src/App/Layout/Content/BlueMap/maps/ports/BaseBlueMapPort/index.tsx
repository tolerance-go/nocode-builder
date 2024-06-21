import { useEffect, useState } from "react";
import { BasePortContext } from "../../../components/ports/BasePort";
import { BlueMapPortComponentProps } from "../../../types";
import { globalEventBus } from "@/globals/eventBus";
import { cx } from "@emotion/css";
import { validatePortConnection } from "../../../utils/validatePortConnection";
import { getNodeById } from "../../../utils/getNodeById";

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
    return globalEventBus.on(
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
    return globalEventBus.on("dragBlueMapPortEnd", () => {
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
                "opacity-15": !connectable,
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
