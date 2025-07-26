import { Breadcrumbs, Link, Typography } from "@mui/material";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbNavProps = {
  items: BreadcrumbItem[];
};

const BreadcrumbNav = ({ items }: BreadcrumbNavProps) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {items.map((item, index) =>
        item.href ? (
          <Link key={index} underline="hover" color="inherit" href={item.href}>
            {item.label}
          </Link>
        ) : (
          <Typography key={index} color="text.primary">
            {item.label}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
};

export default BreadcrumbNav;
