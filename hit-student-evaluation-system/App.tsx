
import React, { useState, useCallback } from 'react';
import { User, UserRole, Student, Project, Evaluation, EvaluationTemplate, EvaluationScores, ProjectMilestone, ActivityLog } from './types';
import { MOCK_STUDENTS, MOCK_EVALUATORS, MOCK_ADMIN, MOCK_PROJECTS, MOCK_TEMPLATES, MOCK_EVALUATIONS, MOCK_ACTIVITY_LOG } from './constants';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import StudentDashboard from './components/StudentDashboard';
import EvaluatorDashboard from './components/EvaluatorDashboard';
import AdminDashboard from './components/AdminDashboard';
import UserList from './components/UserList';
import ProjectsList from './components/ProjectsList';
import ProjectForm from './components/ProjectForm';
import EvaluationForm from './components/EvaluationForm';
import ProjectDetail from './components/ProjectDetail';
import EvaluationTemplatesList from './components/EvaluationTemplatesList';
import EvaluationTemplateForm from './components/EvaluationTemplateForm';
import StudentsList from './components/StudentsList';

type View = 
  | 'dashboard' 
  | 'students'
  | 'projects' 
  | 'evaluations' 
  | 'templates' 
  | 'projectForm' 
  | 'projectDetail' 
  | 'templateForm' 
  | 'evaluateProject'
  | 'users'; // Admin

const App: React.FC = () => {
  const [allUsers, setAllUsers] = useState<User[]>([MOCK_ADMIN, ...MOCK_EVALUATORS, ...MOCK_STUDENTS]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [evaluations, setEvaluations] = useState<Evaluation[]>(MOCK_EVALUATIONS);
  const [templates, setTemplates] = useState<EvaluationTemplate[]>(MOCK_TEMPLATES);
  const [activityLog, setActivityLog] = useState<ActivityLog[]>(MOCK_ACTIVITY_LOG);
  
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [filter, setFilter] = useState<'all' | 'HIT 200' | 'HIT 400'>('all');

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<ProjectMilestone | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<EvaluationTemplate | null>(null);

  const students = allUsers.filter(u => u.role === UserRole.Student) as Student[];
  const evaluators = allUsers.filter(u => u.role === UserRole.Evaluator);

  const logActivity = (message: string, details: { projectId?: string; userId?: string }) => {
    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString(),
      message,
      ...details,
    };
    setActivityLog(prev => [newLog, ...prev]);
  };

  const clearSelections = () => {
    setSelectedProject(null);
    setEditingProject(null);
    setEditingTemplate(null);
    setSelectedMilestone(null);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
    clearSelections();
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };
  
  const handleSetView = (view: View) => {
    setCurrentView(view);
    setFilter('all');
    if (view !== 'projectDetail' && view !== 'evaluateProject') {
        clearSelections();
    }
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentView('projectDetail');
  };

  const handleBack = () => {
    const previousView: View = 
        currentView === 'projectDetail' ? (currentUser?.role === UserRole.Student ? 'dashboard' : 'projects') :
        currentView === 'evaluateProject' ? 'projectDetail' :
        currentView === 'projectForm' ? 'projects' :
        currentView === 'templateForm' ? 'templates' :
        'dashboard';
    setCurrentView(previousView);

    if (currentView === 'evaluateProject') {
        setSelectedMilestone(null);
    } else {
        clearSelections();
    }
  };
  
  const handleEvaluateMilestone = (milestone: ProjectMilestone) => {
    setSelectedMilestone(milestone);
    setCurrentView('evaluateProject');
  };

  const handleSaveEvaluation = useCallback((projectId: string, milestoneId: string, templateId: string, scores: EvaluationScores, comment: string) => {
    if (!currentUser) return;
    setEvaluations(prevEvals => {
      const existingEvalIndex = prevEvals.findIndex(ev => ev.projectId === projectId && ev.milestoneId === milestoneId && ev.evaluatorId === currentUser.id);
      const newEval = { 
          id: `eval-${Date.now()}`, 
          projectId, 
          milestoneId, 
          evaluatorId: currentUser.id, 
          templateId, 
          scores, 
          comment, 
          lastUpdated: new Date().toISOString() 
      };
      if (existingEvalIndex > -1) {
        const updatedEvals = [...prevEvals];
        updatedEvals[existingEvalIndex] = {...updatedEvals[existingEvalIndex], ...newEval};
        return updatedEvals;
      }
      return [...prevEvals, newEval];
    });

    const project = projects.find(p => p.id === projectId);
    const milestone = project?.milestones.find(m => m.id === milestoneId);
    logActivity(
        `${currentUser?.name} evaluated "${milestone?.name}" for project "${project?.name}".`,
        { projectId, userId: currentUser?.id }
    );

    setCurrentView('projectDetail');
    setSelectedMilestone(null);
  }, [currentUser, projects]);
  
  const handleAddMilestone = (projectId: string, milestoneName: string, deadline: string) => {
    setProjects(prevProjects => prevProjects.map(p => {
        if (p.id === projectId) {
            const newMilestone: ProjectMilestone = {
                id: `m-${projectId}-${Date.now()}`,
                name: milestoneName,
                deadline,
                submittedDocument: null,
                submissionDate: null,
            };
            return { ...p, milestones: [...p.milestones, newMilestone] };
        }
        return p;
    }));
  };
  
  const handleAssignEvaluator = (projectId: string, evaluatorIds: string[]) => {
      setProjects(prev => prev.map(p => p.id === projectId ? {...p, evaluatorIds} : p));
      const project = projects.find(p => p.id === projectId);
      logActivity(`Evaluators updated for project "${project?.name}".`, { projectId });
  };

  const handleAddOrUpdateProject = ({ id, name, description, course, emails }: { id?: string; name: string; description: string; course: 'HIT 200' | 'HIT 400'; emails: string[] }) => {
    const studentIds: string[] = [];
    const newStudents: Student[] = [];
    
    const lowercasedEmails = emails.map(e => e.toLowerCase().trim()).filter(e => e);

    lowercasedEmails.forEach(email => {
        let student = students.find(s => s.email.toLowerCase() === email);
        if (!student) {
            const studentIdMatch = email.match(/(h\d{6}[a-z])/i);
            const studentId = studentIdMatch ? studentIdMatch[0].toUpperCase() : `H${String(Math.floor(Math.random() * 900000) + 100000)}`;
            const newStudent: Student = {
                id: `stud-${Date.now()}-${email}`,
                name: email.split('@')[0],
                email: email,
                role: UserRole.Student,
                studentId,
            };
            newStudents.push(newStudent);
            student = newStudent;
        }
        studentIds.push(student.id);
    });

    if (newStudents.length > 0) {
        setAllUsers(prev => [...prev, ...newStudents]);
    }

    if (id) {
        setProjects(prev => prev.map(p => p.id === id ? { ...p, name, description, course, studentIds } : p));
        logActivity(`Project "${name}" was updated.`, { projectId: id });
    } else {
        const newProject: Project = {
            id: `proj-${Date.now()}`,
            name,
            description,
            course,
            studentIds,
            evaluatorIds: [],
            milestones: [],
        };
        setProjects(prev => [newProject, ...prev]);
        logActivity(`New project "${name}" was created.`, { projectId: newProject.id });
    }
    setCurrentView('projects');
    clearSelections();
  };

  const handleDeleteProject = (projectId: string) => {
      if(window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
        const projectName = projects.find(p => p.id === projectId)?.name || 'Unknown Project';
        setProjects(prev => prev.filter(p => p.id !== projectId));
        setEvaluations(prev => prev.filter(e => e.projectId !== projectId));
        logActivity(`Project "${projectName}" was deleted.`, {});
      }
  };

  const handleAddOrUpdateTemplate = ({ id, name, criteria }: { id?: string; name: string; criteria: string[] }) => {
    if (id) {
      setTemplates(prev => prev.map(t => t.id === id ? { ...t, name, criteria: criteria.map((c, i) => ({ id: `crit-${id}-${i}`, name: c })) } : t));
    } else {
      const newId = `template-${Date.now()}`;
      const newTemplate: EvaluationTemplate = {
        id: newId,
        name,
        criteria: criteria.map((c, i) => ({ id: `crit-${newId}-${i}`, name: c })),
      };
      setTemplates(prev => [...prev, newTemplate]);
    }
    setCurrentView('templates');
    clearSelections();
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      setTemplates(prev => prev.filter(t => t.id !== templateId));
    }
  };

  const handleSubmission = (projectId: string, milestoneId: string, documentName: string) => {
    setProjects(prevProjects => prevProjects.map(p => {
        if (p.id === projectId) {
            const updatedMilestones = p.milestones.map(m => {
                if (m.id === milestoneId) {
                    return { ...m, submittedDocument: documentName, submissionDate: new Date().toISOString() };
                }
                return m;
            });
            const milestone = updatedMilestones.find(m => m.id === milestoneId);
            logActivity(
                `${currentUser?.name} submitted "${documentName}" for milestone "${milestone?.name}".`,
                { projectId, userId: currentUser?.id }
            );
            return { ...p, milestones: updatedMilestones };
        }
        return p;
    }));
  };
  
  const handleDeleteSubmission = (projectId: string, milestoneId: string) => {
    setProjects(prevProjects => prevProjects.map(p => {
        if (p.id === projectId) {
            const milestone = p.milestones.find(m => m.id === milestoneId);
            logActivity(`Submission for milestone "${milestone?.name}" was deleted.`, { projectId, userId: currentUser?.id });
            const updatedMilestones = p.milestones.map(m => {
                if (m.id === milestoneId) {
                    return { ...m, submittedDocument: null, submissionDate: null };
                }
                return m;
            });
            return { ...p, milestones: updatedMilestones };
        }
        return p;
    }));
};

  const renderContent = () => {
    if (!currentUser) return null;

    const assignedProjects = projects.filter(p => p.evaluatorIds.includes(currentUser.id));
    const studentProjects = projects.filter(p => p.studentIds.includes(currentUser.id));
    
    switch (currentView) {
      case 'dashboard':
        if (currentUser.role === UserRole.Student) return <StudentDashboard student={currentUser as Student} projects={studentProjects} evaluations={evaluations.filter(e => studentProjects.some(p => p.id === e.projectId))} onSelectProject={handleSelectProject} />;
        if (currentUser.role === UserRole.Evaluator) return <EvaluatorDashboard assignedProjects={assignedProjects} evaluations={evaluations} currentUser={currentUser} activityLog={activityLog} />;
        if (currentUser.role === UserRole.Admin) return <AdminDashboard users={allUsers} projects={projects} evaluations={evaluations} activityLog={activityLog} />;
        return null;
      
      case 'students':
         return <StudentsList students={students} />;

      case 'users':
        return <UserList users={allUsers.filter(u => u.role !== UserRole.Admin)} />;

      case 'projects':
        const projectsToList = currentUser.role === UserRole.Admin ? projects : assignedProjects;
        return <ProjectsList 
                    projects={filter === 'all' ? projectsToList : projectsToList.filter(p => p.course === filter)} 
                    students={students} 
                    role={currentUser.role}
                    onSelectProject={handleSelectProject}
                    onAddNew={() => { setEditingProject(null); setCurrentView('projectForm'); }}
                    onEdit={(p) => { setEditingProject(p); setCurrentView('projectForm'); }}
                    onDelete={handleDeleteProject}
                    evaluators={evaluators}
                    onAssignEvaluator={handleAssignEvaluator}
                />;
      
      case 'projectForm':
        return <ProjectForm project={editingProject} students={students} onSubmit={handleAddOrUpdateProject} onBack={handleBack} />;

      case 'projectDetail':
        if (selectedProject && currentUser) {
            const projectEvals = evaluations.filter(e => e.projectId === selectedProject.id);
            return <ProjectDetail 
                        project={selectedProject} 
                        students={students} 
                        evaluations={projectEvals} 
                        templates={templates}
                        onEvaluateMilestone={handleEvaluateMilestone}
                        onAddMilestone={handleAddMilestone}
                        onSubmission={handleSubmission}
                        onDeleteSubmission={handleDeleteSubmission}
                        onBack={handleBack}
                        role={currentUser.role}
                        currentUser={currentUser}
                        evaluators={evaluators}
                    />;
        }
        return null;
      
      case 'evaluateProject':
        if (selectedProject && selectedMilestone) {
            const existingEval = evaluations.find(e => e.projectId === selectedProject.id && e.milestoneId === selectedMilestone.id && e.evaluatorId === currentUser.id);
            return <EvaluationForm 
                        project={selectedProject} 
                        milestone={selectedMilestone}
                        templates={templates}
                        existingEvaluation={existingEval}
                        onSave={handleSaveEvaluation}
                        onBack={handleBack}
                    />;
        }
        return null;

      case 'templates':
        return <EvaluationTemplatesList 
                    templates={templates} 
                    onAddNew={() => { setEditingTemplate(null); setCurrentView('templateForm'); }}
                    onEdit={(t) => { setEditingTemplate(t); setCurrentView('templateForm'); }}
                    onDelete={handleDeleteTemplate}
                    role={currentUser.role}
                />;
      
      case 'templateForm':
          return <EvaluationTemplateForm template={editingTemplate} onSubmit={handleAddOrUpdateTemplate} onBack={handleBack} />;

      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!currentUser ? (
        <Login onLogin={handleLogin} evaluators={evaluators} students={students} admin={MOCK_ADMIN}/>
      ) : (
        <div className="flex h-screen">
          <Sidebar user={currentUser} onLogout={handleLogout} onSetView={handleSetView} onSetFilter={setFilter} currentView={currentView}/>
          <main className="flex-1 p-8 overflow-y-auto">
            {renderContent()}
          </main>
        </div>
      )}
    </div>
  );
};

export default App;
