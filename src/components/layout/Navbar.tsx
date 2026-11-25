// src/components/layout/Navbar.tsx
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  ChevronDown,
  Menu,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ADMIN_NAV_ITEMS } from './nav-items';
import { SidebarNav } from './SidebarNav';


function MeridianLogo() {
  return (
    <Link
      to="/products"
      className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      aria-label="Meridian Admin Home"
    >
      <svg
        width="28"
        height="22"
        viewBox="0 0 28 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 text-blue-600"
        aria-hidden="true"
      >
        <path
          d="M2.5 18.5V6.5C2.5 4.29086 4.29086 2.5 6.5 2.5C8.05 2.5 9.46 3.39 10.12 4.79L14 13L17.88 4.79C18.54 3.39 19.95 2.5 21.5 2.5C23.7091 2.5 25.5 4.29086 25.5 6.5V18.5"
          stroke="currentColor"
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-lg font-bold tracking-tight text-slate-900">
        Meridian Admin
      </span>
    </Link>
  );
}

export default function Navbar() {
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-slate-200 bg-white">
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
      {/* left section: mobile menu button + logo + navigation links*/}
        <div className="flex items-center gap-3 md:gap-8">
          {/* Mobile menu button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-slate-700 hover:bg-slate-100"
                aria-label="Open navigation menu"
              />
            } >

                <Menu className="h-5 w-5" />
          
            </SheetTrigger>

            <SheetContent side="left" className="w-64 bg-white p-0">
              <SheetHeader className="border-b border-slate-200 px-5 py-4 text-left">

                <SheetTitle >     
                    <MeridianLogo />
                </SheetTitle>
                
                <SheetDescription className="sr-only">
                  Primary dashboard navigation links
                </SheetDescription>
              </SheetHeader>

              <div className="px-3 py-4">
                <SidebarNav onNavigate={() => setIsMobileMenuOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>

          {/* logo */}
          <MeridianLogo />

          {/* Navigation Links*/}
          <nav
            aria-label="Top Navigation"
            className="hidden md:flex items-center gap-1.5"
          >
            {ADMIN_NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3.5 py-1.5 text-sm transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1',
                    isActive
                      ? 'bg-blue-50 font-semibold text-blue-600'
                      : 'font-medium text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/*  User Profile Dropdown */}
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger 
              render={
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2.5 rounded-full px-2 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-600"
                    aria-label="User profile menu"
                  />
                } >
              
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-slate-600">
                  <User className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="hidden sm:inline-block font-medium text-slate-800">
                  Admin
                </span>
                <ChevronDown
                  className="h-4 w-4 text-slate-500"
                  aria-hidden="true"
                />
              
            </DropdownMenuTrigger>

          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}