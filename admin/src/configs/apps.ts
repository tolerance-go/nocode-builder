import { Template, TemplateUseCase } from "@/types";
import { createConfigMapByKey } from "@/utils/blueMap/createConfigMapById";

// 定义一个 TemplateUseCase 类型的数组
export const templateUseCases: TemplateUseCase[] = [
  { id: 1, title: "客户关系管理 (CRM)", type: "crm" },
  { id: 2, title: "企业资源计划 (ERP)", type: "erp" },
  { id: 3, title: "人力资源管理 (HRM)", type: "hrm" },
  { id: 4, title: "财务管理", type: "finance" },
  { id: 5, title: "项目管理", type: "project-management" },
  { id: 6, title: "电子商务", type: "e-commerce" },
  { id: 7, title: "问卷调查", type: "form" },
];

export const templateUseCasesById = createConfigMapByKey(
  templateUseCases,
  "id"
);

export const templates: Template[] = [
  {
    id: 1,
    title: "CRM 模板 1",
    previewImgSrc:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    type: "desktop",
    useCasId: 1,
  },
  {
    id: 2,
    title: "CRM 模板 2",
    previewImgSrc:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    type: "tablet",
    useCasId: 1,
  },
  {
    id: 3,
    title: "ERP 模板 1",
    previewImgSrc: "https://images.unsplash.com/photo-1559039834-2c7c5f6e88e6",
    type: "desktop",
    useCasId: 2,
  },
  {
    id: 4,
    title: "ERP 模板 2",
    previewImgSrc:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
    type: "tablet",
    useCasId: 2,
  },
  {
    id: 5,
    title: "HRM 模板 1",
    previewImgSrc:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    type: "desktop",
    useCasId: 3,
  },
  {
    id: 6,
    title: "HRM 模板 2",
    previewImgSrc:
      "https://images.unsplash.com/photo-1581092334556-7f90c1f5d162",
    type: "mobile",
    useCasId: 3,
  },
  {
    id: 7,
    title: "财务管理 模板 1",
    previewImgSrc:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
    type: "desktop",
    useCasId: 4,
  },
  {
    id: 8,
    title: "项目管理 模板 1",
    previewImgSrc:
      "https://images.unsplash.com/photo-1532619118511-4041a795f0f8",
    type: "desktop",
    useCasId: 5,
  },
  {
    id: 9,
    title: "电子商务 模板 1",
    previewImgSrc:
      "https://images.unsplash.com/photo-1584433144859-1fc8a6e5c9b6",
    type: "desktop",
    useCasId: 6,
  },
  {
    id: 10,
    title: "电子商务 模板 2",
    previewImgSrc:
      "https://images.unsplash.com/photo-1603791452906-f17e0578a1e8",
    type: "tablet",
    useCasId: 6,
  },
];
