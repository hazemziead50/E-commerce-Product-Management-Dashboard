
import { Box, Tag, type LucideIcon } from 'lucide-react';

export interface NavItem {
  readonly label: string;
  readonly to: string;
  readonly icon: LucideIcon;
}

export const ADMIN_NAV_ITEMS: readonly NavItem[] = [
  {
    label: 'Products',
    to: '/products',
    icon: Box,
  },
  {
    label: 'Categories',
    to: '/categories',
    icon: Tag,
  },
] as const;