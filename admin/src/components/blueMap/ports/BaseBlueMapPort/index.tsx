import { cx } from "@emotion/css";
import { useEffect, useState } from "react";
import { BasePortContext } from "../BasePort/hooks";
import { getNodeById } from "@/utils/blueMap/getNodeById";
import { removePortConnections } from "@/utils/blueMap/removePortConnections";
import { validatePortConnection } from "@/utils/blueMap/validatePortConnection";
import { blueMapEventBus } from "@/globals/blueMapEventBus";
import { BlueMapPortComponentProps } from "@/types/blueMap";

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
        menuItems: [
          {
            key: "1",
            label: "断开该连线",
            onClick: () => {
              removePortConnections(node.id, port.id, graph);
            },
          },
        ],
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
