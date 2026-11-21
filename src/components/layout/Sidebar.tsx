import { SidebarNav } from './SidebarNav';

 function Sidebar() {
  return (
        <aside 
           aria-label='sidebar'   
           className="hidden w-56 shrink-0 border-r border-slate-200 bg-white md:block"     
        >
            <div className="sticky top-16 px-3 py-5">
                <SidebarNav />
            </div>
        </aside>
  )
} 
export default Sidebar
