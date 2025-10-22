
import React from 'react';
import { Student, Project, Evaluation } from '../types';
import Card from './Card';
import { ProjectIcon, UserCircleIcon, StarIcon } from './icons/Icons';

interface StudentDashboardProps {
  student: Student;
  projects: Project[];
  evaluations: Evaluation[];
  onSelectProject: (project: Project) => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ student, projects, evaluations, onSelectProject }) => {
  const studentProjects = projects.filter(p => p.studentIds.includes(student.id));
  
  const calculateOverallAverage = () => {
      const studentEvals = evaluations.filter(ev => studentProjects.some(p => p.id === ev.projectId));
      if (studentEvals.length === 0) return 0;
      
      let totalScore = 0;
      let scoreCount = 0;
      studentEvals.forEach(ev => {
          const scores = Object.values(ev.scores);
          totalScore += scores.reduce((a, b) => a + b, 0);
          scoreCount += scores.length;
      });
      
      return scoreCount > 0 ? totalScore / scoreCount : 0;
  }

  const overallAverage = calculateOverallAverage();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {student.name}!</h1>
      <p className="text-gray-600 mb-6">Here is a summary of your project evaluations. Select a project to view details.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-lg mr-4"><UserCircleIcon className="h-6 w-6 text-gray-700"/></div>
            <h3 className="text-lg font-bold text-gray-900">Student Details</h3>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <p><span className="font-semibold text-gray-700">Name:</span> {student.name}</p>
            <p><span className="font-semibold text-gray-700">ID:</span> {student.studentId}</p>
            <p><span className="font-semibold text-gray-700">Email:</span> {student.email}</p>
          </div>
        </Card>
        <Card extraClasses="col-span-1 lg:col-span-2">
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-lg mr-4"><StarIcon className="h-6 w-6 text-gray-700"/></div>
            <h3 className="text-lg font-bold text-gray-900">Performance Summary</h3>
          </div>
          <div className="mt-4 flex flex-col items-center justify-center text-center h-full">
            <p className="text-5xl font-extrabold text-black">{overallAverage.toFixed(1)} <span className="text-3xl text-gray-500">/ 25</span></p>
            <p className="text-sm font-semibold text-gray-600 mt-1">Overall Criteria Average</p>
          </div>
        </Card>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Your Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studentProjects.length > 0 ? studentProjects.map(proj => {
            const projectEvals = evaluations.filter(e => e.projectId === proj.id);
            const getProjectAverage = () => {
                if(projectEvals.length === 0) return "N/A";
                let total = 0;
                let count = 0;
                projectEvals.forEach(ev => {
                    const scores = Object.values(ev.scores);
                    total += scores.reduce((a, b) => a + b, 0);
                    count += scores.length;
                });
                return count > 0 ? `${(total/count).toFixed(1)}/25` : "N/A";
            }
          return (
            <Card key={proj.id} extraClasses="hover:shadow-md hover:border-gray-400 transition-all duration-200 cursor-pointer">
                <div onClick={() => onSelectProject(proj)}>
                    <div className="flex items-center mb-3">
                        <div className="bg-gray-100 p-2 rounded-lg mr-3"><ProjectIcon className="h-5 w-5 text-gray-600"/></div>
                        <h3 className="text-md font-bold text-gray-900 truncate">{proj.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{proj.course}</p>
                    <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold text-gray-600">Avg. Score:</span>
                        <span className="font-bold text-gray-800">{getProjectAverage()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-1">
                        <span className="font-semibold text-gray-600">Milestones:</span>
                        <span className="font-bold text-gray-800">{proj.milestones.length}</span>
                    </div>
                </div>
            </Card>
          );
        }) : (
            <p className="text-gray-500 md:col-span-3">You are not assigned to any projects yet.</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
