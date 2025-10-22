
export enum UserRole {
  Student = 'student',
  Evaluator = 'evaluator',
  Admin = 'admin',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface EvaluationCriterion {
  id: string;
  name: string;
}

export interface EvaluationTemplate {
  id: string;
  name: string;
  criteria: EvaluationCriterion[];
}

export interface EvaluationScores {
  [criterionId: string]: number;
}

export interface ProjectMilestone {
  id:string;
  name: string;
  deadline: string;
  submittedDocument?: string | null;
  submissionDate?: string | null;
}

export interface Evaluation {
  id: string;
  projectId: string;
  milestoneId: string;
  evaluatorId: string;
  templateId: string;
  scores: EvaluationScores;
  comment: string;
  lastUpdated: string;
}

// FIX: Add Comment interface for ProjectCommunication component
export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  content: string;
  timestamp: string;
}

export interface Student extends User {
  role: UserRole.Student;
  studentId: string; // H******A format
}

export interface Project {
  id: string;
  name: string;
  description: string;
  course: 'HIT 200' | 'HIT 400';
  studentIds: string[];
  evaluatorIds: string[];
  milestones: ProjectMilestone[];
  // FIX: Add comments property for ProjectCommunication component
  comments: Comment[];
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  message: string;
  projectId?: string;
  userId?: string;
}
