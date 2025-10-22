
import React, { useState } from 'react';
import { Project, Student, Evaluation, ProjectMilestone, UserRole, User, EvaluationTemplate } from '../types';
import Card from './Card';
import { BackIcon, UserCircleIcon, StarIcon, CheckCircleIcon, ClockIcon, UserIcon, AlertTriangleIcon, DocumentCheckIcon, UploadIcon, TrashIcon } from './icons/Icons';

const MilestoneEvaluation: React.FC<{ evaluation: Evaluation, template?: EvaluationTemplate, evaluator?: User }> = ({ evaluation, template, evaluator }) => {
    if (!template) return null;
    return (
        <div className="border-t pt-3 mt-3 ml-3 pl-3 border-l-2">
            <div className="flex justify-between items-center mb-2">
                <h5 className="font-semibold text-gray-700 text-sm">Feedback from {evaluator?.name || 'Unknown Evaluator'}</h5>
                <span className="text-xs font-bold text-green-600 flex items-center"><CheckCircleIcon className="h-4 w-4 mr-1" /> Evaluated</span>
            </div>
            <div className="space-y-2 mb-3">
                {template.criteria.map(criterion => {
                    const score = evaluation.scores[criterion.id] || 0;
                    return (
                        <div key={criterion.id} className="flex items-center text-sm">
                            <span className="w-1/3 text-gray-600">{criterion.name}</span>
                            <div className="w-2/3 bg-gray-200 rounded-full h-4">
                                <div className="bg-gray-700 h-4 rounded-full text-white text-xs font-bold flex items-center justify-center" style={{ width: `${(score / 25) * 100}%` }}>
                                    {score}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <p className="text-sm text-gray-700 mt-2 p-2 bg-gray-100 rounded-md"><strong>Comment:</strong> {evaluation.comment}</p>
        </div>
    );
};

interface MilestoneItemProps {
  milestone: ProjectMilestone;
  projectId: string;
  role: UserRole;
  onSubmission: (projectId: string, milestoneId: string, documentName: string) => void;
  onDeleteSubmission: (projectId: string, milestoneId: string) => void;
}

const MilestoneItem: React.FC<MilestoneItemProps> = ({ milestone, projectId, role, onSubmission, onDeleteSubmission }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const now = new Date();
  const deadline = new Date(milestone.deadline);
  const isPastDue = now > deadline;
  
  const getStatus = () => {
    if (milestone.submissionDate) {
      const submissionDate = new Date(milestone.submissionDate);
      if (submissionDate > deadline) {
        return { text: 'Late Submission', icon: <AlertTriangleIcon className="h-4 w-4 mr-1 text-yellow-600" />, color: 'text-yellow-700' };
      }
      return { text: 'Done', icon: <DocumentCheckIcon className="h-4 w-4 mr-1 text-green-600"/>, color: 'text-green-700' };
    }
    if (isPastDue) {
      return { text: 'Not Done', icon: <ClockIcon className="h-4 w-4 mr-1 text-red-600"/>, color: 'text-red-700' };
    }
    return { text: 'Pending', icon: <ClockIcon className="h-4 w-4 mr-1 text-gray-500"/>, color: 'text-gray-600' };
  };

  const status = getStatus();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        alert('Only PDF files can be uploaded.');
        e.target.value = ''; // Reset file input
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      onSubmission(projectId, milestone.id, selectedFile.name);
      setSelectedFile(null);
    }
  };

  return (
    <div className="p-3 bg-gray-50 rounded-lg border">
      <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold text-gray-800">{milestone.name}</h4>
            <p className="text-xs text-gray-500 mb-1">Deadline: {deadline.toLocaleDateString()}</p>
            <span className={`text-xs font-bold flex items-center ${status.color}`}>{status.icon} {status.text}</span>
          </div>
          {milestone.submissionDate && (
             <div className="text-right flex items-center space-x-2">
                <div>
                    <p className="text-sm font-medium text-gray-800">{milestone.submittedDocument}</p>
                    <p className="text-xs text-gray-500">Submitted on {new Date(milestone.submissionDate).toLocaleDateString()}</p>
                </div>
                {role === UserRole.Student && (
                    <button 
                        onClick={() => onDeleteSubmission(projectId, milestone.id)} 
                        className="p-1 text-red-600 hover:text-red-800 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                        aria-label="Delete submission"
                    >
                        <TrashIcon className="h-4 w-4" />
                    </button>
                )}
            </div>
          )}
      </div>
       {role === UserRole.Student && !milestone.submissionDate && (
          <form onSubmit={handleSubmit} className="mt-3 border-t pt-3">
             {isPastDue && <p className="text-xs text-yellow-700 font-semibold mb-2">The deadline has passed. This will be marked as a late submission.</p>}
            <div className="flex items-center space-x-2">
                <label className="block flex-grow">
                  <span className="sr-only">Choose file</span>
                  <input type="file" accept=".pdf" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"/>
                </label>
                <button type="submit" disabled={!selectedFile} className="flex-shrink-0 text-xs font-medium text-white bg-gray-700 hover:bg-gray-800 rounded-md px-3 py-1.5 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                  <UploadIcon className="h-4 w-4" />
                </button>
            </div>
          </form>
       )}
    </div>
  );
}


interface ProjectDetailProps {
  project: Project;
  students: Student[];
  evaluations: Evaluation[];
  templates: EvaluationTemplate[];
  onEvaluateMilestone: (milestone: ProjectMilestone) => void;
  onAddMilestone: (projectId: string, name: string, deadline: string) => void;
  onSubmission: (projectId: string, milestoneId: string, documentName: string) => void;
  onDeleteSubmission: (projectId: string, milestoneId: string) => void;
  onBack: () => void;
  role: UserRole;
  currentUser: User;
  evaluators: User[];
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, students, evaluations, templates, onEvaluateMilestone, onAddMilestone, onSubmission, onDeleteSubmission, onBack, role, currentUser, evaluators = [] }) => {
  const projectStudents = students.filter(s => project.studentIds.includes(s.id));
  const [newMilestoneName, setNewMilestoneName] = useState('');
  const [newMilestoneDate, setNewMilestoneDate] = useState('');

  const handleAddMilestoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMilestoneName && newMilestoneDate) {
      onAddMilestone(project.id, newMilestoneName, new Date(newMilestoneDate).toISOString());
      setNewMilestoneName('');
      setNewMilestoneDate('');
    }
  };
  
  const calculateOverallAverage = () => {
    if (evaluations.length === 0) return 0;
    let totalScore = 0;
    let scoreCount = 0;
    evaluations.forEach(ev => {
        const scores = Object.values(ev.scores);
        totalScore += scores.reduce((a, b) => a + b, 0);
        scoreCount += scores.length;
    });
    return scoreCount > 0 ? totalScore / scoreCount : 0;
  }
  const overallAverage = calculateOverallAverage();

  return (
    <div>
      <button onClick={onBack} className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 mb-4">
        <BackIcon className="h-4 w-4" />
        <span>Back to {role === UserRole.Student ? "Dashboard" : "Projects"}</span>
      </button>
      
      <div className="mb-6 md:flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
          <span className={`text-sm font-semibold rounded-full px-2 py-0.5 mt-1 inline-block ${project.course === 'HIT 200' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
            {project.course}
          </span>
          <p className="text-gray-600 mt-2 max-w-2xl">{project.description}</p>
        </div>
        {role === UserRole.Student && (
          <Card extraClasses="w-full md:w-auto mt-4 md:mt-0">
             <div className="text-center">
               <p className="text-sm font-semibold text-gray-600 mb-1">Overall Project Score</p>
               <p className="text-3xl font-extrabold text-black">{overallAverage.toFixed(1)} <span className="text-xl text-gray-500">/ 25</span></p>
            </div>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center mb-4">
              <div className="bg-gray-100 p-2 rounded-lg mr-4"><StarIcon className="h-6 w-6 text-gray-700"/></div>
              <h3 className="text-lg font-bold text-gray-900">Project Milestones & Feedback</h3>
            </div>
            <div className="space-y-4">
              {project.milestones.map(milestone => {
                const milestoneEvals = evaluations.filter(e => e.milestoneId === milestone.id);
                return (
                    <div key={milestone.id}>
                      {role === UserRole.Student 
                        ? <MilestoneItem 
                            milestone={milestone} 
                            projectId={project.id} 
                            onSubmission={onSubmission}
                            onDeleteSubmission={onDeleteSubmission}
                            role={role}
                          />
                        : (
                             <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border">
                                <div>
                                    <p className="font-semibold text-gray-800">{milestone.name}</p>
                                    <p className="text-xs text-gray-500">Due: {new Date(milestone.deadline).toLocaleDateString()}</p>
                                     {milestone.submittedDocument && (
                                        <p className="text-xs text-blue-600 font-semibold mt-1 flex items-center">
                                            <DocumentCheckIcon className="h-4 w-4 mr-1"/>
                                            {milestone.submittedDocument}
                                        </p>
                                    )}
                                </div>
                                {role === UserRole.Evaluator && (
                                    <button 
                                    onClick={() => onEvaluateMilestone(milestone)}
                                    className="text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 rounded-md px-3 py-1 transition-colors"
                                    >
                                    {milestoneEvals.some(e => e.evaluatorId === currentUser.id) ? 'Update' : 'Evaluate'}
                                    </button>
                                )}
                            </div>
                        )
                      }
                      {milestoneEvals.map(ev => (
                        <MilestoneEvaluation 
                            key={ev.id} 
                            evaluation={ev}
                            template={templates.find(t => t.id === ev.templateId)}
                            evaluator={evaluators.find(e => e.id === ev.evaluatorId)}
                        />
                      ))}
                    </div>
                )
              })}
              {project.milestones.length === 0 && <p className="text-gray-500 text-sm">No milestones defined for this project yet.</p>}
            </div>
            {role === UserRole.Evaluator && (
                <form onSubmit={handleAddMilestoneSubmit} className="mt-6 border-t pt-4">
                <h4 className="font-semibold mb-2">Add New Milestone</h4>
                <div className="flex space-x-2">
                    <input type="text" value={newMilestoneName} onChange={e => setNewMilestoneName(e.target.value)} placeholder="Milestone Name (e.g., Final Report)" className="flex-grow px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"/>
                    <input type="date" value={newMilestoneDate} onChange={e => setNewMilestoneDate(e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"/>
                    <button type="submit" className="font-medium text-white bg-gray-800 hover:bg-gray-900 rounded-md px-4 py-2 text-sm transition-colors">Add</button>
                </div>
                </form>
            )}
          </Card>
        </div>
        <div className="space-y-6">
            <Card>
                <div className="flex items-center mb-4">
                    <div className="bg-gray-100 p-2 rounded-lg mr-4"><UserCircleIcon className="h-6 w-6 text-gray-700"/></div>
                    <h3 className="text-lg font-bold text-gray-900">{project.course === 'HIT 200' ? 'Group Members' : 'Project Owner'}</h3>
                </div>
                <ul className="space-y-3">
                    {projectStudents.map(student => (
                    <li key={student.id} className="flex flex-col p-2 bg-gray-50 rounded-md">
                        <span className="font-semibold text-gray-800 text-sm">{student.name}</span>
                        <span className="text-gray-500 text-xs font-mono">{student.studentId}</span>
                    </li>
                    ))}
                     {projectStudents.length === 0 && (
                        <p className="text-sm text-gray-500">No students assigned to this project.</p>
                    )}
                </ul>
            </Card>
             <Card>
                <div className="flex items-center mb-4">
                    <div className="bg-gray-100 p-2 rounded-lg mr-4"><UserIcon className="h-6 w-6 text-gray-700"/></div>
                    <h3 className="text-lg font-bold text-gray-900">Assigned Evaluators</h3>
                </div>
                <ul className="space-y-3">
                    {project.evaluatorIds.map(id => {
                        const evaluator = evaluators?.find(e => e.id === id);
                        return evaluator ? (
                        <li key={evaluator.id} className="flex flex-col p-2 bg-gray-50 rounded-md">
                            <span className="font-semibold text-gray-800 text-sm">{evaluator.name}</span>
                            <span className="text-gray-500 text-xs">{evaluator.email}</span>
                        </li>
                        ) : null;
                    })}
                    {project.evaluatorIds.length === 0 && (
                        <p className="text-sm text-gray-500">No evaluators assigned yet.</p>
                    )}
                </ul>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
