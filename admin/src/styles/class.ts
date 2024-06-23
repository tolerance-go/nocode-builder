import { css } from "@emotion/css";

export const scrollbarCls = css`
  &:hover::-webkit-scrollbar-thumb {
    background: #999999;
  }
  &:hover::-webkit-scrollbar-track {
    background: #ffffff;
  }
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    background: #ffffff;
  }
  &::-webkit-scrollbar-thumb {
    background: #ffffff;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;
