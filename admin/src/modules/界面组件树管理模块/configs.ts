import { hexToRgb } from '@/common/utils';
import { GlobalToken, theme } from 'antd';

const { getDesignToken } = theme;

export const defaultThemeToken = getDesignToken();

export const themeConfig = {
  algorithm: [theme.darkAlgorithm],
  components: {
    Tree: {
      borderRadius: 0,
      directoryNodeSelectedBg: `rgba(${hexToRgb(defaultThemeToken.blue6).join(', ')}, 0.4)`,
    },
  },
};

export const globalThemeToken = getDesignToken(themeConfig);

export const layoutPadding = (token: GlobalToken) => `${token.paddingXXS}px`;
