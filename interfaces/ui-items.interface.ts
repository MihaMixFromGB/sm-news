interface UIItemBase {
  type: string;
}

export interface Text extends UIItemBase {
  type: "text";
  weight: "Regular" | "Medium";
  content: string;
}

export interface Image extends UIItemBase {
  type: "image";
  src: string;
}

export interface Link extends UIItemBase {
  type: "link";
  href: string;
  label: string;
}

export type UIItem = Text | Image | Link;
