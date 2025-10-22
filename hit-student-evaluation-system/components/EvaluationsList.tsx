
import React from 'react';
import { Evaluation, Project, Student } from '../types';

interface EvaluationsListProps {
  evaluations: Evaluation[];
  projects: Project[];
  students: Student[];
}

const EvaluationsList: React.FC<EvaluationsListProps> = ({ evaluations, projects, students }) => {

  const getEvaluationDetails = (evaluation: Evaluation) => {
    const project = projects.find(p => p.id === evaluation.projectId);
    if (!project) return { name: 'Unknown Project', course: 'N/A', studentNames: 'N/A' };

    const studentNames = project.studentIds
      .map(id => students.find(s => s.id === id)?.name || 'Unknown')
      .join(', ');

    return { name: project.name, course: project.course, studentNames };
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Completed Evaluations</h1>
      <p className="text-gray-600 mb-6">A record of all project evaluations.</p>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Project Name</th>
                <th scope="col" className="px-6 py-3">Course</th>
                <th scope="col" className="px-6 py-3">Student(s)</th>
                <th scope="col" className="px-6 py-3">Date Evaluated</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map((evaluation) => {
                const { name, course, studentNames } = getEvaluationDetails(evaluation);
                return (
                  <tr key={evaluation.id} className="bg-white border-b hover:bg-gray-50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{name}</th>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${course === 'HIT 200' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                        {course}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-sm truncate">{studentNames}</td>
                    <td className="px-6 py-4">{new Date(evaluation.lastUpdated).toLocaleDateString()}</td>
                  </tr>
                );
              })}
              {evaluations.length === 0 && (
                <tr className="bg-white border-b">
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No evaluations have been recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EvaluationsList;
