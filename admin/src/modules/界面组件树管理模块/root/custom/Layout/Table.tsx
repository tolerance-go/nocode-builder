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

import reactDOMServer from 'react-dom/server';
import ReactDOMServer from 'react-dom/server';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RangeSelectionModule,
  MenuModule,
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

  const getCellStyle = (): ColDef['cellStyle'] => {
    return (params) => {
      const value = params.value;
      const color =
        value > 0.5
          ? `rgba(0, 44, 140, ${value})` // 蓝色 #002c8c
          : `rgba(130, 0, 20, ${1 - value})`; // 红色 #820014
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
      headerName: 'OI',
      width: 100,
    },
    { field: 'Pos', headerName: 'Pos', width: 100 },
    { field: 'OBSz', headerName: 'OBSz', width: 100 },
    {
      field: 'MBSz',
      headerName: 'MBSz',
      width: 100,
    },
    {
      field: 'MBIV',
      headerName: 'MBIV',
      width: 100,
      cellStyle: getCellStyle(),
    },
    {
      field: 'OBIV',
      headerName: 'OBIV',
      width: 100,
      cellStyle: getCellStyle(),
    },
    {
      field: 'OAIV',
      headerName: 'OAIV',
      width: 100,
      cellStyle: getCellStyle(),
    },
    {
      field: 'MAIV',
      headerName: 'MAIV',
      width: 100,
      cellStyle: getCellStyle(),
    },
    {
      field: 'OBidRaw',
      headerName: 'OBidRaw',
      width: 100,
      cellStyle: getCellStyle(),
    },
    {
      field: 'MBid',
      headerName: 'MBid',
      width: 100,
      cellStyle: getCellStyle(),
    },
    {
      field: 'OBid',
      headerName: 'OBid',
      width: 100,
      cellStyle: getCellStyle(),
    },
    {
      field: 'OFair',
      headerName: 'OFair',
      width: 100,
      cellStyle: getCellStyle(),
    },
    {
      field: 'OptMid',
      headerName: 'OptMid',
      width: 100,
      cellStyle: getCellStyle(),
    },
    {
      field: 'OAsk',
      headerName: 'OAsk',
      width: 100,
      cellStyle: getCellStyle(),
    },
    {
      field: 'MAsk',
      headerName: 'MAsk',
      width: 100,
      cellStyle: getCellStyle(),
    },
    {
      field: 'OAskRaw',
      headerName: 'OAskRaw',
      width: 100,
      cellStyle: getCellStyle(),
    },
    {
      field: 'MASz',
      headerName: 'MASz',
      width: 100,
      cellStyle: getCellStyle(),
    },
    {
      field: 'OASz',
      headerName: 'OASz',
      width: 100,
      cellStyle: getCellStyle(),
    },
    { field: 'MAS', headerName: 'MAS', width: 100, cellStyle: getCellStyle() },
    { field: 'OSp', headerName: 'OSp', width: 100, cellStyle: getCellStyle() },
    { field: 'State', headerName: 'State', width: 100 },
    { field: 'BsDelta', headerName: 'BsDelta', width: 100 },
    { field: 'Strike', headerName: 'Strike', width: 100 },
    { field: 'Exch', headerName: 'Exch', width: 100 },
    { field: 'Expiry', headerName: 'Expiry', width: 100 },
    { field: 'UMP', headerName: 'UMP', width: 100 },
    { field: 'OFairVol', headerName: 'OFairVol', width: 100 },
    { field: 'volMv', headerName: 'volMv', width: 100 },
    { field: 'iMv', headerName: 'iMv', width: 100 },
    { field: 'VspSft', headerName: 'VspSft', width: 100 },
    { field: 'PosGamma', headerName: 'PosGamma', width: 100 },
    { field: 'PosVega', headerName: 'PosVega', width: 100 },
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
        const updatedItems = [];
        for (let i = 0; i < 5000; i++) {
          const rowIndex = Math.floor(Math.random() * rowData.length);
          const colIndex = Math.floor(Math.random() * colDefs.length);
          const colDef = colDefs[colIndex];

          // 只更新具有 field 属性的列
          if ('field' in colDef && colDef.field) {
            const newValue = Mock.mock('@float(0.1, 1.0, 1, 1)');
            const updatedItem = {
              ...rowData[rowIndex],
              [colDef.field]: newValue,
            };
            updatedItems.push(updatedItem);
          }
        }
        gridRef.current.api.applyTransaction({ update: updatedItems });
      }
    }, 1000); // 每隔1秒更新一次

    return () => clearInterval(intervalId); // 组件卸载时清除定时器
  }, [rowData, colDefs]);

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
