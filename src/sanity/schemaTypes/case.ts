import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const caseType = defineType({
  name: "case",
  title: "제작 케이스",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "제목",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "슬러그",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "카테고리",
      type: "string",
      options: {
        list: [
          { title: "Modelless", value: "Modelless" },
          { title: "Esthetis", value: "Esthetis" },
          { title: "Ortho", value: "Ortho" },
          { title: "Denture", value: "Denture" },
          { title: "Implant", value: "Implant" },
          { title: "Crown", value: "Crown" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "이미지 (최대 6장)",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "description",
      title: "설명",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "details",
      title: "상세 정보",
      type: "text",
      rows: 6,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "images.0" },
  },
});
