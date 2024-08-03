import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  ColGroupDef,
  GetContextMenuItemsParams,
  MenuItemDef,
  ModuleRegistry,
} from '@ag-grid-community/core';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { cx } from '@emotion/css';
import { AgGridReact } from '@ag-grid-community/react'; // React Data Grid Component
import Mock from 'mockjs';
import { cloneElement, useEffect, useRef, useState } from 'react';
import { MenuModule } from '@ag-grid-enterprise/menu';
import './ag-grid-theme-builder.css';
import {
  PauseCircleFilled,
  PlusCircleFilled,
  SettingFilled,
  ToolFilled,
} from '@ant-design/icons';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import ReactDOMServer from 'react-dom/server';
import { theme } from 'antd';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RangeSelectionModule,
  MenuModule,
  RowGroupingModule,
]);

// 生成模拟数据
const generateMockData = () => {
  return Mock.mock({
    'data|500': [
      {
        id: '@guid', // 为每行数据生成唯一标识符
        'OI|1-1000': 1,
        'Pos|1-100': 1,
        'OBSz|100-500': 1,
        'MBSz|100-500': 1,
        MBIV: '@float(0.1, 1.0, 1, 1)',
        OBIV: '@float(0.1, 1.0, 1, 1)',
        OAIV: '@float(0.1, 1.0, 1, 1)',
        MAIV: '@float(0.1, 1.0, 1, 1)',
        'OBidRaw|1-2': 1,
        'MBid|1-2': 1,
        'OBid|1-2': 1,
        'OFair|1-2': 1,
        'OptMid|1-2': 1,
        'OAsk|1-2': 1,
        'MAsk|1-2': 1,
        'OAskRaw|1-2': 1,
        'MASz|1-2': 1,
        'OASz|1-2': 1,
        'MAS|1-2': 1,
        'OSp|1-2': 1,
        State: '@pick(["Active", "Inactive"])',
        'BsDelta|0.1-1.0': 1,
        'Strike|1-5': 1,
        Exch: '@word',
        Expiry: '@date("yyyy-MM-dd")',
        UMP: '@float(0.1, 1.0, 1, 1)',
        OFairVol: '@float(0.1, 1.0, 1, 1)',
        volMv: '@float(0.1, 1.0, 1, 1)',
        iMv: '@float(0.1, 1.0, 1, 1)',
        VspSft: '@float(0.1, 1.0, 1, 1)',
        PosGamma: '@float(0.1, 1.0, 1, 1)',
        PosVega: '@float(0.1, 1.0, 1, 1)',
      },
    ],
  }).data;
};

export const Table = () => {
  // 行数据：展示的数据
  const [rowData] = useState(generateMockData());
  const { token } = theme.useToken();

  const colors = [token.blue3, token.red3, token.green3];

  const getCellStyle = (): ColDef['cellStyle'] => {
    return (params) => {
      const value = params.value;
      let colorIndex = Math.floor(value / 333);
      if (colorIndex >= colors.length) {
        colorIndex = colors.length - 1; // 确保索引不超过颜色数组长度
      }
      const color = colors[colorIndex];
      return { backgroundColor: color };
    };
  };

  const createIconHtml = (icon: React.ReactNode): string => {
    const container = document.createElement('div');
    const iconWithStyle = cloneElement(icon as React.ReactElement, {
      style: { opacity: 0.4 }, // 设置颜色和透明度
    });
    const iconHtml = ReactDOMServer.renderToString(iconWithStyle);
    container.innerHTML = iconHtml;
    return container.innerHTML;
  };

  const getContextMenuItems = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _params: GetContextMenuItemsParams,
  ): (string | MenuItemDef)[] => {
    const result: (string | MenuItemDef)[] = [
      {
        // built in separator
        name: '启动报价',
        shortcut: 'Alt + W',
        action: () => {
          console.log('启动报价 Selected');
        },
        icon: createIconHtml(<SettingFilled />),
      },
      {
        // custom item
        name: '暂停报价',
        shortcut: 'Alt + P',
        action: () => {
          console.log('暂停报价 Selected');
        },
        icon: createIconHtml(<PauseCircleFilled />),
      },
      {
        // custom item
        name: '设置参数',
        // shortcut: 'Alt + S',
        action: () => {
          console.log('设置参数 Selected');
        },
        icon: createIconHtml(<ToolFilled />),
      },
      {
        // custom item
        name: '增加 spread',
        // shortcut: 'Alt + A',
        action: () => {
          console.log('增加 spread Selected');
        },
        icon: createIconHtml(<PlusCircleFilled />),
      },
    ];

    return result;
  };

  // 列定义：定义要展示的列
  const [colDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      field: 'OI',
      sort: 'desc',
      enableRowGroup: true,
      headerName: 'OI',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'Pos',
      enableRowGroup: true,
      headerName: 'Pos',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'OBSz',
      enableRowGroup: true,
      headerName: 'OBSz',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'MBSz',
      enableRowGroup: true,
      headerName: 'MBSz',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'MBIV',
      enableRowGroup: true,
      headerName: 'MBIV',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'OBIV',
      enableRowGroup: true,
      headerName: 'OBIV',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'OAIV',
      enableRowGroup: true,
      headerName: 'OAIV',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
      cellStyle: getCellStyle(),
    },
    {
      field: 'MAIV',
      enableRowGroup: true,
      headerName: 'MAIV',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
      cellStyle: getCellStyle(),
    },
    {
      field: 'OBidRaw',
      enableRowGroup: true,
      headerName: 'OBidRaw',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
      cellStyle: getCellStyle(),
    },
    {
      field: 'MBid',
      enableRowGroup: true,
      headerName: 'MBid',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
      cellStyle: getCellStyle(),
    },
    {
      field: 'OBid',
      enableRowGroup: true,
      headerName: 'OBid',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
      cellStyle: getCellStyle(),
    },
    {
      field: 'OFair',
      enableRowGroup: true,
      headerName: 'OFair',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
      cellStyle: getCellStyle(),
    },
    {
      field: 'OptMid',
      enableRowGroup: true,
      headerName: 'OptMid',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
      cellStyle: getCellStyle(),
    },
    {
      field: 'OAsk',
      enableRowGroup: true,
      headerName: 'OAsk',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
      cellStyle: getCellStyle(),
    },
    {
      field: 'MAsk',
      enableRowGroup: true,
      headerName: 'MAsk',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'OAskRaw',
      enableRowGroup: true,
      headerName: 'OAskRaw',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'MASz',
      enableRowGroup: true,
      headerName: 'MASz',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'OASz',
      enableRowGroup: true,
      headerName: 'OASz',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'MAS',
      enableRowGroup: true,
      headerName: 'MAS',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'OSp',
      enableRowGroup: true,
      headerName: 'OSp',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'State',
      enableRowGroup: true,
      headerName: 'State',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'BsDelta',
      enableRowGroup: true,
      headerName: 'BsDelta',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'Strike',
      enableRowGroup: true,
      headerName: 'Strike',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'Exch',
      enableRowGroup: true,
      headerName: 'Exch',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'Expiry',
      enableRowGroup: true,
      headerName: 'Expiry',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agDateColumnFilter',
    },
    {
      field: 'UMP',
      enableRowGroup: true,
      headerName: 'UMP',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'OFairVol',
      enableRowGroup: true,
      headerName: 'OFairVol',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'volMv',
      enableRowGroup: true,
      headerName: 'volMv',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'iMv',
      enableRowGroup: true,
      headerName: 'iMv',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'VspSft',
      enableRowGroup: true,
      headerName: 'VspSft',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'PosGamma',
      enableRowGroup: true,
      headerName: 'PosGamma',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'PosVega',
      enableRowGroup: true,
      headerName: 'PosVega',
      width: 120,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
  ]);

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<AgGridReact>(null);
  const [gridHeight, setGridHeight] = useState(0);

  useEffect(() => {
    const updateGridHeight = () => {
      if (containerRef.current) {
        setGridHeight(containerRef.current.clientHeight);
      }
    };

    // 设置初始高度
    updateGridHeight();

    // 窗口大小调整时更新高度
    window.addEventListener('resize', updateGridHeight);
    return () => window.removeEventListener('resize', updateGridHeight);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (gridRef.current && colDefs) {
        const totalCells = colDefs.length * 500;
        const updateCount = 1000;
        const updatedItems = [];

        for (let i = 0; i < updateCount; i++) {
          const randomCellIndex = Math.floor(Math.random() * totalCells);
          const rowIndex = randomCellIndex % 500; // 假设 rowData 长度为 500
          const colIndex = Math.floor(randomCellIndex / 500) % colDefs.length;
          const colDef = colDefs[colIndex];

          // 只更新具有 field 属性的列
          if ('field' in colDef && colDef.field) {
            const newValue = Mock.mock('@float(0, 1000, 0, 0)');
            const rowNode =
              gridRef.current.api.getDisplayedRowAtIndex(rowIndex);
            if (rowNode) {
              rowNode.setDataValue(colDef.field, newValue);
              updatedItems.push(rowNode.data);
            }
          }
        }

        gridRef.current.api.applyTransaction({ update: updatedItems });
      }
    }, 1000); // 每隔1秒更新一次

    return () => clearInterval(intervalId); // 组件卸载时清除定时器
  }, [colDefs]);

  return (
    // 包裹容器，带有主题和尺寸
    <div
      ref={containerRef}
      style={{ height: '100%' }} // 数据网格将填充父容器的大小
    >
      {!!gridHeight && (
        <div
          className={cx('ag-theme-custom')} // 应用数据网格主题
          style={{
            height: gridHeight,
          }}
        >
          <AgGridReact
            autoGroupColumnDef={{
              minWidth: 200,
            }}
            rowGroupPanelShow="always"
            enableRangeSelection
            enableRangeHandle
            allowContextMenuWithControlKey
            ref={gridRef}
            rowData={rowData}
            columnDefs={colDefs}
            getRowId={(params) => params.data.id} // 设置唯一标识符
            getContextMenuItems={getContextMenuItems} // 自定义右键菜单
          />
        </div>
      )}
    </div>
  );
};
