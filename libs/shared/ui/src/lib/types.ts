type SubItem = {
  name: string;
  id: number;
  url: string;
  isActive?: boolean;
};

export type SectorSidebarItem = {
  name: string;
  icon: string;
  id: number;
  url: string;
  subItems: SubItem[];
  isActive?: boolean;
};
