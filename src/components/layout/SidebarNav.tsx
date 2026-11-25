// src/components/layout/SidebarNav.tsx
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils'; 
import { ADMIN_NAV_ITEMS } from './nav-items';

interface SidebarNavProps {
  onNavigate?: () => void; 
}

export function SidebarNav({ onNavigate }: SidebarNavProps) {
  return (
    <nav aria-label="Main Navigation" className="flex flex-col gap-1.5">
      {ADMIN_NAV_ITEMS.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                // (Focus & Keyboard Navigation)
                'flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1',
               
                isActive
                  ? 'bg-blue-50/90 font-semibold text-blue-600'
                  : 'font-medium text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={cn(
                    'h-[18px] w-[18px] shrink-0 transition-colors',
                    isActive ? 'text-blue-600' : 'text-slate-500'
                  )}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}