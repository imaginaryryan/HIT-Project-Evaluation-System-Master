
import { User, Student, UserRole, Project, EvaluationTemplate, Evaluation, ActivityLog, Comment } from './types';

export const MOCK_EVALUATOR: User = {
  id: 'eval-001',
  name: 'Dr. Evelyn Reed',
  email: 'e.reed@hit.ac.zw',
  role: UserRole.Evaluator,
};

export const MOCK_EVALUATOR_2: User = {
  id: 'eval-002',
  name: 'Dr. Ben Carter',
  email: 'b.carter@hit.ac.zw',
  role: UserRole.Evaluator,
};

export const MOCK_EVALUATORS = [MOCK_EVALUATOR, MOCK_EVALUATOR_2];

export const MOCK_ADMIN: User = {
  id: 'admin-001',
  name: 'Admin User',
  email: 'admin@hit.ac.zw',
  role: UserRole.Admin,
};

export const MOCK_STUDENTS: Student[] = [
  {
    id: 'stud-001',
    name: 'Alice Johnson',
    studentId: 'H190123F',
    email: 'h190123f@hit.ac.zw',
    role: UserRole.Student,
  },
  {
    id: 'stud-002',
    name: 'Bob Williams',
    studentId: 'H200456T',
    email: 'h200456t@hit.ac.zw',
    role: UserRole.Student,
  },
  {
    id: 'stud-003',
    name: 'Charlie Brown',
    studentId: 'H210789P',
    email: 'h210789p@hit.ac.zw',
    role: UserRole.Student,
  },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-01',
    name: 'AI-Powered Chatbot',
    description: 'A group project to build a customer service chatbot using natural language processing.',
    course: 'HIT 200',
    studentIds: ['stud-001', 'stud-002'],
    evaluatorIds: ['eval-001'],
    milestones: [
        { id: 'm-01-1', name: 'Project Proposal', deadline: '2024-09-30T23:59:59Z', submittedDocument: 'proposal_v1.pdf', submissionDate: '2024-09-28T14:00:00Z' },
        { id: 'm-01-2', name: 'Final Submission', deadline: '2024-11-30T23:59:59Z' },
    ],
    // FIX: Add comments property to match Project type
    comments: [],
  },
  {
    id: 'proj-02',
    name: 'IoT Home Automation',
    description: 'An individual project to develop a system for controlling home appliances remotely.',
    course: 'HIT 400',
    studentIds: ['stud-001'],
    evaluatorIds: ['eval-002'],
    milestones: [
        { id: 'm-02-1', name: 'Initial Design', deadline: '2024-10-15T23:59:59Z' },
    ],
    // FIX: Add comments property to match Project type
    comments: [],
  },
  {
    id: 'proj-03',
    name: 'Data Visualization Dashboard',
    description: 'A group project to create an interactive dashboard for visualizing large datasets.',
    course: 'HIT 200',
    studentIds: ['stud-002', 'stud-003'],
    evaluatorIds: ['eval-001', 'eval-002'],
    milestones: [
       { id: 'm-03-1', name: 'Prototype Submission', deadline: '2024-10-20T23:59:59Z' },
    ],
    // FIX: Add comments property to match Project type
    comments: [],
  },
   {
    id: 'proj-04',
    name: 'Mobile Health Tracker',
    description: 'An individual project to build a mobile app for tracking fitness and health metrics.',
    course: 'HIT 400',
    studentIds: ['stud-003'],
    evaluatorIds: [],
    milestones: [],
    // FIX: Add comments property to match Project type
    comments: [],
  },
];

export const MOCK_TEMPLATES: EvaluationTemplate[] = [
    {
        id: 'template-1',
        name: 'Standard Group Project Rubric',
        criteria: [
            { id: 'crit-1-1', name: 'Technical Skills' },
            { id: 'crit-1-2', name: 'Communication' },
            { id: 'crit-1-3', name: 'Teamwork' },
            { id: 'crit-1-4', name: 'Problem Solving' },
            { id: 'crit-1-5', name: 'Presentation' },
        ],
    },
    {
        id: 'template-2',
        name: 'Individual Research Project Rubric',
        criteria: [
            { id: 'crit-2-1', name: 'Research Quality' },
            { id: 'crit-2-2', name: 'Implementation' },
            { id: 'crit-2-3', name: 'Documentation' },
            { id: 'crit-2-4', name: 'Innovation' },
        ],
    },
];

export const MOCK_EVALUATIONS: Evaluation[] = [
    {
        id: 'eval-1',
        projectId: 'proj-01',
        milestoneId: 'm-01-1',
        evaluatorId: 'eval-001',
        templateId: 'template-1',
        scores: { 'crit-1-1': 22, 'crit-1-2': 20, 'crit-1-3': 24, 'crit-1-4': 19, 'crit-1-5': 21 },
        comment: 'A strong start. The proposal is well-structured, but the technical implementation details could be more specific.',
        lastUpdated: '2024-10-05T10:00:00.000Z',
    },
    {
        id: 'eval-2',
        projectId: 'proj-02',
        milestoneId: 'm-02-1',
        evaluatorId: 'eval-002',
        templateId: 'template-2',
        scores: { 'crit-2-1': 23, 'crit-2-2': 21, 'crit-2-3': 18, 'crit-2-4': 24 },
        comment: 'Excellent innovation and a solid design. The documentation for the API endpoints needs improvement.',
        lastUpdated: '2024-10-20T11:30:00.000Z',
    },
    {
        id: 'eval-3',
        projectId: 'proj-03',
        milestoneId: 'm-03-1',
        evaluatorId: 'eval-001',
        templateId: 'template-1',
        scores: { 'crit-1-1': 24, 'crit-1-2': 22, 'crit-1-3': 23, 'crit-1-4': 25, 'crit-1-5': 20 },
        comment: 'Very impressive prototype. The data visualizations are clear and insightful.',
        lastUpdated: '2024-10-22T14:00:00.000Z',
    },
    {
        id: 'eval-4',
        projectId: 'proj-03',
        milestoneId: 'm-03-1',
        evaluatorId: 'eval-002',
        templateId: 'template-1',
        scores: { 'crit-1-1': 22, 'crit-1-2': 21, 'crit-1-3': 22, 'crit-1-4': 23, 'crit-1-5': 19 },
        comment: 'Good teamwork and solid technical execution. The presentation could be more polished.',
        lastUpdated: '2024-10-22T16:30:00.000Z',
    }
];

export const MOCK_ACTIVITY_LOG: ActivityLog[] = [
    {
        id: 'act-1',
        timestamp: '2024-10-20T11:30:00.000Z',
        message: 'Dr. Ben Carter evaluated "Initial Design" for project "IoT Home Automation".',
        projectId: 'proj-02',
        userId: 'eval-002',
    },
    {
        id: 'act-2',
        timestamp: '2024-10-05T10:00:00.000Z',
        message: 'Dr. Evelyn Reed evaluated "Project Proposal" for project "AI-Powered Chatbot".',
        projectId: 'proj-01',
        userId: 'eval-001',
    },
    {
        id: 'act-3',
        timestamp: '2024-09-28T14:00:00.000Z',
        message: 'Alice Johnson submitted "proposal_v1.pdf" for milestone "Project Proposal".',
        projectId: 'proj-01',
        userId: 'stud-001',
    },
    {
        id: 'act-4',
        timestamp: '2024-09-01T09:00:00.000Z',
        message: 'New project "AI-Powered Chatbot" was created.',
        projectId: 'proj-01',
    },
];
