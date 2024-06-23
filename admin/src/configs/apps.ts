import { Template, TemplateUseCase } from "@/types";
import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

// 定义一个 TemplateUseCase 类型的数组
export const templateUseCases: TemplateUseCase[] = [
  { id: 1, title: "客户关系管理 (CRM)", type: "crm" },
  { id: 2, title: "企业资源计划 (ERP)", type: "erp" },
  { id: 3, title: "人力资源管理 (HRM)", type: "hrm" },
  { id: 4, title: "财务管理", type: "finance" },
  { id: 5, title: "项目管理", type: "project-management" },
  { id: 6, title: "电子商务", type: "e-commerce" },
  { id: 7, title: "问卷调查", type: 'form' },
];

// 从 TemplateUseCase 数组中生成 MenuItem 数组
export const appTemplateGroups: MenuItem[] = templateUseCases.map(
  (useCase) => ({
    key: useCase.type,
    label: useCase.title,
  })
);

export const templates: Template[] = [
  {
    id: 1,
    title: "CRM 模板 1",
    previewImgSrc: "path/to/crm1.jpg",
    type: "desktop",
    useCasId: 1,
  },
  {
    id: 2,
    title: "CRM 模板 2",
    previewImgSrc: "path/to/crm2.jpg",
    type: "tablet",
    useCasId: 1,
  },
  {
    id: 3,
    title: "ERP 模板 1",
    previewImgSrc: "path/to/erp1.jpg",
    type: "desktop",
    useCasId: 2,
  },
  {
    id: 4,
    title: "ERP 模板 2",
    previewImgSrc: "path/to/erp2.jpg",
    type: "tablet",
    useCasId: 2,
  },
  {
    id: 5,
    title: "HRM 模板 1",
    previewImgSrc: "path/to/hrm1.jpg",
    type: "desktop",
    useCasId: 3,
  },
  {
    id: 6,
    title: "HRM 模板 2",
    previewImgSrc: "path/to/hrm2.jpg",
    type: "mobile",
    useCasId: 3,
  },
  {
    id: 7,
    title: "财务管理 模板 1",
    previewImgSrc: "path/to/finance1.jpg",
    type: "desktop",
    useCasId: 4,
  },
  {
    id: 8,
    title: "项目管理 模板 1",
    previewImgSrc: "path/to/project1.jpg",
    type: "desktop",
    useCasId: 5,
  },
  {
    id: 9,
    title: "电子商务 模板 1",
    previewImgSrc: "path/to/ecommerce1.jpg",
    type: "desktop",
    useCasId: 6,
  },
  {
    id: 10,
    title: "电子商务 模板 2",
    previewImgSrc: "path/to/ecommerce2.jpg",
    type: "tablet",
    useCasId: 6,
  },
];
