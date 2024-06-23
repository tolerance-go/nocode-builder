import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

/** 模板分组 */
export const appTemplateGroups: MenuItem[] = [
  { key: "crm", label: "客户关系管理 (CRM)" },
  { key: "erp", label: "企业资源计划 (ERP)" },
  { key: "hrm", label: "人力资源管理 (HRM)" },
  { key: "finance", label: "财务管理" },
  { key: "project-management", label: "项目管理" },
  { key: "e-commerce", label: "电子商务" },
];
