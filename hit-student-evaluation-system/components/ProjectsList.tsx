
import React, { useState } from 'react';
import { Project, Student, User, UserRole } from '../types';

const AssignEvaluatorModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (evaluatorIds: string[]) => void;
    evaluators: User[];
    initialSelectedIds: string[];
}> = ({ isOpen, onClose, onSave, evaluators, initialSelectedIds }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds);

    if (!isOpen) return null;

    const handleCheckboxChange = (evaluatorId: string) => {
        setSelectedIds(prev =>
            prev.includes(evaluatorId)
                ? prev.filter(id => id !== evaluatorId)
                : [...prev, evaluatorId]
        );
    };

    const handleSave = () => {
        onSave(selectedIds);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Assign Evaluators</h2>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {evaluators.map(evaluator => (
                        <label key={evaluator.id} className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-gray-800 focus:ring-gray-700"
                                checked={selectedIds.includes(evaluator.id)}
                                onChange={() => handleCheckboxChange(evaluator.id)}
                            />
                            <span className="ml-3 text-sm font-medium text-gray-700">{evaluator.name}</span>
                        </label>
                    ))}
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm hover:bg-gray-900">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};


interface ProjectsListProps {
  projects: Project[];
  students: Student[];
  role: UserRole;
  onSelectProject: (project: Project) => void;
  onAddNew?: () => void;
  onEdit?: (project: Project) => void;
  onDelete?: (projectId: string) => void;
  evaluators?: User[];
  onAssignEvaluator?: (projectId: string, evaluatorIds: string[]) => void;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects, students, role, onSelectProject, onAddNew, onEdit, onDelete, evaluators = [], onAssignEvaluator }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const getStudentNames = (studentIds: string[]) => {
        if(studentIds.length === 0) return <span className="text-gray-400 italic">No students assigned</span>;
        return studentIds.map(id => students.find(s => s.id === id)?.name || 'Unknown').join(', ');
    }
    
    const isAdmin = role === UserRole.Admin;

    const openAssignModal = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleSaveAssignment = (evaluatorIds: string[]) => {
        if (selectedProject && onAssignEvaluator) {
            onAssignEvaluator(selectedProject.id, evaluatorIds);
        }
    };
    
  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects</h1>
                <p className="text-gray-600">{isAdmin ? "Manage all projects and assign evaluators." : "A list of your assigned projects."}</p>
            </div>
            {isAdmin && (
              <button
                  onClick={onAddNew}
                  className="font-medium text-white bg-gray-800 hover:bg-gray-900 rounded-md px-4 py-2 transition-colors duration-150"
              >
                  + Add New Project
              </button>
            )}
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Project Name</th>
                <th scope="col" className="px-6 py-3">Course</th>
                <th scope="col" className="px-6 py-3">Students</th>
                {isAdmin && <th scope="col" className="px-6 py-3">Assigned Evaluator(s)</th>}
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <a onClick={() => onSelectProject(project)} className="hover:underline cursor-pointer">
                        {project.name}
                    </a>
                  </th>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${project.course === 'HIT 200' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                        {project.course}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-sm truncate">{getStudentNames(project.studentIds)}</td>
                  {isAdmin && (
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex -space-x-2 mr-2">
                          {project.evaluatorIds.length > 0 ? project.evaluatorIds.map(id => {
                              const evaluator = evaluators.find(e => e.id === id);
                              return evaluator ? <div key={id} title={evaluator.name} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white text-xs flex items-center justify-center font-bold text-gray-600">{evaluator.name.charAt(0)}</div> : null
                          }) : <span className="text-xs text-gray-400">None</span>}
                        </div>
                         <button onClick={() => openAssignModal(project)} className="text-xs font-medium text-gray-600 hover:text-gray-900">Assign</button>
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 text-right space-x-2">
                    {isAdmin ? (
                      <>
                        <button onClick={() => onEdit?.(project)} className="font-medium text-gray-600 hover:text-gray-900">Edit</button>
                        <button onClick={() => onDelete?.(project.id)} className="font-medium text-red-600 hover:text-red-900">Delete</button>
                      </>
                    ) : (
                      <button onClick={() => onSelectProject(project)} className="font-medium text-gray-600 hover:text-gray-900">View</button>
                    )}
                  </td>
                </tr>
              ))}
               {projects.length === 0 && (
                <tr className="bg-white border-b">
                    <td colSpan={isAdmin ? 5 : 4} className="px-6 py-8 text-center text-gray-500">
                       No projects found.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
       {isAdmin && <AssignEvaluatorModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveAssignment}
            evaluators={evaluators}
            initialSelectedIds={selectedProject?.evaluatorIds || []}
        />}
    </div>
  );
};

export default ProjectsList;
