import { S2DataConfig } from "@antv/s2";
import { SheetComponent, SheetComponentOptions } from "@antv/s2-react";

export const DataTable = () => {
  const s2Options: SheetComponentOptions = {
    width: 600,
    height: 480,
  };

  const s2DataConfig: S2DataConfig = {
    fields: {
      columns: ["province", "city", "type", "price", "cost"],
    },
    meta: [
      {
        field: "province",
        name: "省份",
      },
      {
        field: "city",
        name: "城市",
      },
      {
        field: "type",
        name: "商品类别",
      },
      {
        field: "price",
        name: "价格",
      },
      {
        field: "cost",
        name: "成本",
      },
    ],
    data: [
      { province: "浙江", city: "杭州", type: "笔", price: 1 },
      { province: "浙江", city: "杭州", type: "纸张", price: 2 },
      { province: "浙江", city: "舟山", type: "笔", price: 17 },
      { province: "浙江", city: "舟山", type: "纸张", price: 6 },
      { province: "吉林", city: "长春", type: "笔", price: 8 },
      { province: "吉林", city: "白山", type: "笔", price: 12 },
      { province: "吉林", city: "长春", type: "纸张", price: 3 },
      { province: "吉林", city: "白山", type: "纸张", price: 25 },
      { province: "浙江", city: "杭州", type: "笔", price: 20 },
      { province: "浙江", city: "杭州", type: "纸张", price: 10 },
      { province: "浙江", city: "舟山", type: "笔", price: 15 },
      { province: "浙江", city: "舟山", type: "纸张", price: 2 },
      { province: "吉林", city: "长春", type: "笔", price: 15 },
      { province: "吉林", city: "白山", type: "笔", price: 30 },
      { province: "吉林", city: "长春", type: "纸张", price: 40 },
      { province: "吉林", city: "白山", type: "纸张", price: 50 },
    ],
  };
  return (
    <SheetComponent
      dataCfg={s2DataConfig}
      options={s2Options}
      sheetType="table"
    />
  );
};
