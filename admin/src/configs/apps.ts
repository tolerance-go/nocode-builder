import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

/** 模板分组 */
export const appTemplateGroups: MenuItem[] = [
  {
    key: "unocode-zero-code",
    label: "unocode 零代码平台",
    type: "group",
    children: [
      { key: "app", label: "APP 模板" },
      { key: "h5", label: "H5 模板" },
      { key: "mini-program", label: "小程序模板" },
      { key: "client", label: "客户端模板" },
      { key: "web", label: "Web 网站模板" },
      { key: "backend", label: "后台管理系统模板" },
    ],
  },
  {
    key: "enterprise-apps",
    label: "企业级应用模板",
    type: "group",
    children: [
      { key: "crm", label: "客户关系管理 (CRM)" },
      { key: "erp", label: "企业资源计划 (ERP)" },
      { key: "hrm", label: "人力资源管理 (HRM)" },
      { key: "finance", label: "财务管理" },
      { key: "project-management", label: "项目管理" },
      { key: "e-commerce", label: "电子商务" },
    ],
  },
];
