import { css } from "@emotion/css";

export const scrollbarCls = css`
  &:hover::-webkit-scrollbar-thumb {
    background: #d4d4d4;
  }
  &:hover::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #fff;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #fff;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;
