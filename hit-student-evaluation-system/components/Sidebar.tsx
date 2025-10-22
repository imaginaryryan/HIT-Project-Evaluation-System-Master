
import React, { useState } from 'react';
import { User, Student, UserRole } from '../types';
import { LogoIcon, UserIcon, LogoutIcon, DashboardIcon, FolderIcon, ChevronDownIcon, TemplateIcon, ClipboardListIcon } from './icons/Icons';

interface SidebarProps {
  user: User;
  onLogout: () => void;
  onSetView: (view: any) => void;
  onSetFilter: (filter: 'all' | 'HIT 200' | 'HIT 400') => void;
  currentView: string;
}

const NavLink: React.FC<{view: any, icon: React.ReactNode, label: string, currentView: string, onClick: (view: any) => void}> = ({ view, icon, label, currentView, onClick}) => (
    <li>
        <a onClick={() => onClick(view)} className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${currentView === view ? 'bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
            {icon}
            <span className="font-medium">{label}</span>
        </a>
    </li>
);

const AdminSidebar: React.FC<Pick<SidebarProps, 'currentView' | 'onSetView'>> = ({ currentView, onSetView }) => {
    return (
         <nav className="mt-6 flex-1">
            <ul className="space-y-2">
                <NavLink view="dashboard" icon={<DashboardIcon className="h-5 w-5" />} label="Dashboard" currentView={currentView} onClick={onSetView} />
                <NavLink view="users" icon={<UserIcon className="h-5 w-5" />} label="Users" currentView={currentView} onClick={onSetView} />
                <NavLink view="projects" icon={<FolderIcon className="h-5 w-5" />} label="Projects" currentView={currentView} onClick={onSetView} />
                <NavLink view="templates" icon={<TemplateIcon className="h-5 w-5" />} label="Templates" currentView={currentView} onClick={onSetView} />
            </ul>
        </nav>
    )
}


const EvaluatorSidebar: React.FC<Pick<SidebarProps, 'currentView' | 'onSetView' | 'onSetFilter'>> = ({ onSetView, onSetFilter, currentView }) => {
    const [isProjectsOpen, setProjectsOpen] = useState(true);

    const handleFilterClick = (filter: 'all' | 'HIT 200' | 'HIT 400') => {
        onSetView('projects');
        onSetFilter(filter);
    };

    return (
        <nav className="mt-6 flex-1">
            <ul className="space-y-2">
                <NavLink view="dashboard" icon={<DashboardIcon className="h-5 w-5" />} label="Dashboard" currentView={currentView} onClick={onSetView} />
                
                <li>
                    <button onClick={() => setProjectsOpen(!isProjectsOpen)} className="w-full flex items-center justify-between px-3 py-2.5 text-left text-gray-700 hover:bg-gray-100 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <FolderIcon className="h-5 w-5" />
                            <span className="font-medium">Projects</span>
                        </div>
                        <ChevronDownIcon className={`h-5 w-5 transition-transform ${isProjectsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isProjectsOpen && (
                        <ul className="pl-6 mt-1 space-y-1 border-l-2 border-gray-200 ml-3">
                           <li><a onClick={() => handleFilterClick('all')} className="block py-2 px-4 rounded-md text-sm text-gray-600 hover:bg-gray-100 cursor-pointer">All Projects</a></li>
                           <li><a onClick={() => handleFilterClick('HIT 200')} className="block py-2 px-4 rounded-md text-sm text-gray-600 hover:bg-gray-100 cursor-pointer">HIT 200 Projects</a></li>
                           <li><a onClick={() => handleFilterClick('HIT 400')} className="block py-2 px-4 rounded-md text-sm text-gray-600 hover:bg-gray-100 cursor-pointer">HIT 400 Projects</a></li>
                        </ul>
                    )}
                </li>
                <NavLink view="students" icon={<UserIcon className="h-5 w-5" />} label="Students" currentView={currentView} onClick={onSetView} />
                <NavLink view="templates" icon={<TemplateIcon className="h-5 w-5" />} label="Templates" currentView={currentView} onClick={onSetView} />
            </ul>
        </nav>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout, onSetView, onSetFilter, currentView }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="flex items-center justify-center h-20 border-b border-gray-200">
        <LogoIcon className="h-10 w-10 text-gray-800" />
        <span className="ml-3 text-xl font-bold text-gray-800">HIT System</span>
      </div>
      <div className="flex-1 flex flex-col p-4 overflow-y-auto">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <UserIcon className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{user.name}</h3>
            <span className={`text-sm font-bold capitalize ${user.role === UserRole.Admin ? 'text-red-600' : 'text-gray-500'}`}>{user.role}</span>
          </div>
        </div>
        {user.role === UserRole.Student && 'studentId' in user && (
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-sm font-medium text-gray-600">Student ID</p>
                <p className="font-mono text-gray-800">{(user as Student).studentId}</p>
            </div>
        )}
        {user.role === UserRole.Evaluator && <EvaluatorSidebar {...{onSetView, onSetFilter, currentView}}/> }
        {user.role === UserRole.Admin && <AdminSidebar {...{onSetView, currentView}}/> }
      </div>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150"
        >
          <LogoutIcon className="h-5 w-5"/>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
