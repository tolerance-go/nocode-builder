export const Slot = ({
  name,
}: {
  // 插槽名字
  name: string;
}) => {
  return <div data-slot-name={name}></div>;
};
