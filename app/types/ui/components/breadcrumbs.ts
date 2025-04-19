export type BreadcrumbPath = {
  label: string;
  href?: string;
};

export type BreadcrumbsProps = {
  paths: BreadcrumbPath[];
};
