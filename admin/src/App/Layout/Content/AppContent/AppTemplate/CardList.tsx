import { PreviewCard } from "@/components/PreviewCard";
import { Template } from "@/types/common";
import React from "react";

interface CardListProps {
  templates: Template[];
}

export const CardList: React.FC<CardListProps> = ({ templates }) => (
  <div className="grid gap-5">
    {templates.map((template, index) => (
      <PreviewCard key={index} template={template} />
    ))}
  </div>
);
