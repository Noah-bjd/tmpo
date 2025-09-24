import { User, LogOut, X } from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function Sidebar({ isOpen, onClose, onLogout }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-sidebar border-r border-sidebar-border z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
          <h2 className="text-sidebar-foreground">Menu</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            <X className="w-5 h-5 text-sidebar-foreground" />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-sidebar-accent rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-sidebar-accent-foreground" />
            </div>
            <div>
              <p className="text-sidebar-foreground">John Doe</p>
              <p className="text-sidebar-foreground/70">Employee</p>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Logout Button */}
        <div className="p-6 border-t border-sidebar-border">
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full bg-sidebar border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}