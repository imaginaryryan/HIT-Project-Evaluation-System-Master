
import React from 'react';
import { Project, Evaluation, ActivityLog, User } from '../types';
import Card from './Card';
import { UserCircleIcon, FolderIcon, StarIcon, TemplateIcon, ClockIcon } from './icons/Icons';

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

interface EvaluatorDashboardProps {
  assignedProjects: Project[];
  evaluations: Evaluation[];
  activityLog: ActivityLog[];
  currentUser: User;
}

const EvaluatorDashboard: React.FC<EvaluatorDashboardProps> = ({ assignedProjects, evaluations, activityLog, currentUser }) => {
    const relevantEvals = evaluations.filter(e => assignedProjects.some(p => p.id === e.projectId));
    const uniqueStudents = new Set(assignedProjects.flatMap(p => p.studentIds));
    
    const assignedProjectIds = new Set(assignedProjects.map(p => p.id));
    const relevantActivity = activityLog.filter(log => log.projectId && assignedProjectIds.has(log.projectId));


    const calculateAverage = (course: 'HIT 200' | 'HIT 400') => {
        const relevantProjects = assignedProjects.filter(p => p.course === course);
        const courseEvals = evaluations.filter(e => relevantProjects.some(p => p.id === e.projectId));
        
        if (courseEvals.length === 0) return 'N/A';
        
        let totalScore = 0;
        let scoreCount = 0;
        courseEvals.forEach(ev => {
            const scores = Object.values(ev.scores);
            totalScore += scores.reduce((a, b) => a + b, 0);
            scoreCount += scores.length;
        });

        return scoreCount > 0 ? (totalScore / scoreCount).toFixed(1) : 'N/A';
    }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Evaluator Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome, {currentUser.name}! Here is an overview of your assigned projects.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard icon={<UserCircleIcon className="h-7 w-7 text-gray-700"/>} label="Assigned Students" value={uniqueStudents.size} />
        <StatsCard icon={<FolderIcon className="h-7 w-7 text-gray-700"/>} label="Assigned Projects" value={assignedProjects.length} />
        <StatsCard icon={<StarIcon className="h-7 w-7 text-green-700"/>} label="Evaluations Made" value={relevantEvals.length} />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Projects & Scores Overview</h3>
              <div className="space-y-3">
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                      <div>
                        <span className="font-semibold text-gray-700">HIT 200 (Group Projects)</span>
                        <p className="text-xs text-gray-500">{assignedProjects.filter(p=>p.course === 'HIT 200').length} projects</p>
                      </div>
                      <div>
                        <span className="font-bold text-lg text-blue-800">{calculateAverage('HIT 200')}</span>
                        <p className="text-xs text-gray-500 text-right">Avg Score</p>
                      </div>
                  </div>
                   <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                      <div>
                        <span className="font-semibold text-gray-700">HIT 400 (Individual Projects)</span>
                        <p className="text-xs text-gray-500">{assignedProjects.filter(p=>p.course === 'HIT 400').length} projects</p>
                      </div>
                      <div>
                        <span className="font-bold text-lg text-green-800">{calculateAverage('HIT 400')}</span>
                        <p className="text-xs text-gray-500 text-right">Avg Score</p>
                      </div>
                  </div>
              </div>
          </Card>
          <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {relevantActivity.length > 0 ? relevantActivity.slice(0, 5).map(log => (
                    <div key={log.id} className="flex items-start text-sm">
                        <ClockIcon className="h-4 w-4 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                            <p className="text-gray-700">{log.message}</p>
                            <p className="text-xs text-gray-400">{new Date(log.timestamp).toLocaleString()}</p>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No recent activity on your projects.</p>
                    </div>
                )}
              </div>
          </Card>
      </div>
    </div>
  );
};

export default EvaluatorDashboard;
