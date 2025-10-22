
import React from 'react';
import { User, Project, Evaluation, UserRole, ActivityLog } from '../types';
import Card from './Card';
import { UserCircleIcon, FolderIcon, StarIcon, UserIcon, ClockIcon, AlertTriangleIcon } from './icons/Icons';

interface StatsCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, label, value }) => (
    <Card>
        <div className="flex items-center">
            <div className="bg-gray-100 p-3 rounded-lg mr-4">
                {icon}
            </div>
            <div>
                <p className="text-3xl font-bold text-gray-800">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
            </div>
        </div>
    </Card>
);

interface AdminDashboardProps {
  users: User[];
  projects: Project[];
  evaluations: Evaluation[];
  activityLog: ActivityLog[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ users, projects, evaluations, activityLog }) => {
    const totalStudents = users.filter(u => u.role === UserRole.Student).length;
    const totalEvaluators = users.filter(u => u.role === UserRole.Evaluator).length;

    const upcomingDeadlines = projects.flatMap(p => 
        p.milestones
            .filter(m => {
                const deadline = new Date(m.deadline);
                const now = new Date();
                const thirtyDaysFromNow = new Date();
                thirtyDaysFromNow.setDate(now.getDate() + 30);
                return deadline > now && deadline <= thirtyDaysFromNow && !m.submittedDocument;
            })
            .map(m => ({...m, projectName: p.name}))
    ).sort((a,b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome! Here is an overview of the entire evaluation system.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard icon={<UserCircleIcon className="h-7 w-7 text-gray-700"/>} label="Total Students" value={totalStudents} />
        <StatsCard icon={<UserIcon className="h-7 w-7 text-blue-700"/>} label="Total Evaluators" value={totalEvaluators} />
        <StatsCard icon={<FolderIcon className="h-7 w-7 text-gray-700"/>} label="Total Projects" value={projects.length} />
        <StatsCard icon={<StarIcon className="h-7 w-7 text-green-700"/>} label="Evaluations Made" value={evaluations.length} />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <AlertTriangleIcon className="h-5 w-5 mr-2 text-yellow-600"/>
                System Status
              </h3>
               <div className="space-y-2 max-h-48 overflow-y-auto">
                {upcomingDeadlines.length > 0 ? upcomingDeadlines.map(m => (
                    <div key={m.id} className="text-sm p-2 bg-yellow-50 rounded-md">
                        <p className="font-semibold text-yellow-800">{m.projectName} - {m.name}</p>
                        <p className="text-xs text-yellow-700">Deadline approaching: {new Date(m.deadline).toLocaleDateString()}</p>
                    </div>
                )) : (
                     <p className="text-gray-500 text-sm py-4 text-center">No upcoming deadlines in the next 30 days.</p>
                )}
               </div>
          </Card>
          <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {activityLog.length > 0 ? activityLog.slice(0, 5).map(log => (
                    <div key={log.id} className="flex items-start text-sm">
                        <ClockIcon className="h-4 w-4 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                            <p className="text-gray-700">{log.message}</p>
                            <p className="text-xs text-gray-400">{new Date(log.timestamp).toLocaleString()}</p>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No system activity yet.</p>
                    </div>
                )}
              </div>
          </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
