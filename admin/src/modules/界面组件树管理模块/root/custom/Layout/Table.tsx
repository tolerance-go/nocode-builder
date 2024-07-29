import { cx } from '@emotion/css';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { useEffect, useRef, useState } from 'react';
import './ag-grid-theme-builder.css';

export const Table = () => {
  // 行数据：展示的数据
  const [rowData, setRowData] = useState([
    {
      OI: 100,
      Pos: 50,
      OBSz: 200,
      MBSz: 300,
      MBIV: 0.5,
      OBIV: 0.7,
      OAIV: 0.6,
      MAIV: 0.4,
      OBidRaw: 1.5,
      MBid: 1.4,
      OBid: 1.6,
      OFair: 1.7,
      OptMid: 1.3,
      OAsk: 1.2,
      MAsk: 1.1,
      OAskRaw: 1.0,
      MASz: 1.9,
      OASz: 1.8,
      MAS: 1.7,
      OSp: 1.6,
      State: 'Active',
      BsDelta: 0.8,
      Strike: 2,
      Exch: 'Exchange1',
      Expiry: '2023-06-30',
      UMP: 0.5,
      OFairVol: 0.6,
      volMv: 0.7,
      iMv: 0.8,
      VspSft: 0.9,
      PosGamma: 1.0,
      PosVega: 1.1,
    },
    // 添加更多行数据
  ]);

  // 列定义：定义要展示的列
  const [colDefs, setColDefs] = useState<AgGridReact['props']['columnDefs']>([
    { field: 'OI', headerName: 'OI', width: 100 },
    { field: 'Pos', headerName: 'Pos', width: 100 },
    { field: 'OBSz', headerName: 'OBSz', width: 100 },
    { field: 'MBSz', headerName: 'MBSz', width: 100 },
    { field: 'MBIV', headerName: 'MBIV', width: 100 },
    { field: 'OBIV', headerName: 'OBIV', width: 100 },
    { field: 'OAIV', headerName: 'OAIV', width: 100 },
    { field: 'MAIV', headerName: 'MAIV', width: 100 },
    { field: 'OBidRaw', headerName: 'OBidRaw', width: 100 },
    { field: 'MBid', headerName: 'MBid', width: 100 },
    { field: 'OBid', headerName: 'OBid', width: 100 },
    { field: 'OFair', headerName: 'OFair', width: 100 },
    { field: 'OptMid', headerName: 'OptMid', width: 100 },
    { field: 'OAsk', headerName: 'OAsk', width: 100 },
    { field: 'MAsk', headerName: 'MAsk', width: 100 },
    { field: 'OAskRaw', headerName: 'OAskRaw', width: 100 },
    { field: 'MASz', headerName: 'MASz', width: 100 },
    { field: 'OASz', headerName: 'OASz', width: 100 },
    { field: 'MAS', headerName: 'MAS', width: 100 },
    { field: 'OSp', headerName: 'OSp', width: 100 },
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
          <AgGridReact rowData={rowData} columnDefs={colDefs} />
        </div>
      )}
    </div>
  );
};
