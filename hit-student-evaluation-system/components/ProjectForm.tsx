
import React, { useState, useEffect } from 'react';
import { Project, Student } from '../types';
import Card from './Card';
import { BackIcon } from './icons/Icons';

interface ProjectFormProps {
  project: Project | null;
  students: Student[];
  onSubmit: (data: { id?: string; name:string; description: string; course: 'HIT 200' | 'HIT 400'; emails: string[] }) => void;
  onBack: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, students, onSubmit, onBack }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<'HIT 200' | 'HIT 400'>('HIT 200');
  const [studentEmails, setStudentEmails] = useState('');

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description)
      setCourse(project.course);
      const emails = project.studentIds
        .map(id => students.find(s => s.id === id)?.email)
        .filter(Boolean)
        .join(', ');
      setStudentEmails(emails);
    }
  }, [project, students]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return; // Basic validation
    const emails = studentEmails.split(',').map(email => email.trim()).filter(email => email);
    onSubmit({ id: project?.id, name, description, course, emails });
  };

  return (
    <div>
        <button onClick={onBack} className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 mb-4">
            <BackIcon className="h-4 w-4" />
            <span>Back to Projects</span>
        </button>
      <h1 className="text-3xl font-bold text-gray-900">{project ? 'Edit Project' : 'Add New Project'}</h1>
      <p className="text-gray-600 mb-6">{project ? 'Update the details for this project.' : 'Fill in the details to create a new project.'}</p>

        <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Project Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                        placeholder="A brief description of the project."
                    ></textarea>
                </div>
                 <div>
                    <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course</label>
                    <select
                        id="course"
                        value={course}
                        onChange={(e) => setCourse(e.target.value as 'HIT 200' | 'HIT 400')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                    >
                        <option value="HIT 200">HIT 200 (Group Project)</option>
                        <option value="HIT 400">HIT 400 (Individual Project)</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="studentEmails" className="block text-sm font-medium text-gray-700">
                        {course === 'HIT 200' ? 'Group Member Emails' : 'Project Owner Email'}
                    </label>
                    <textarea
                        id="studentEmails"
                        rows={4}
                        value={studentEmails}
                        onChange={(e) => setStudentEmails(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                        placeholder={course === 'HIT 200' ? "Enter student emails, separated by commas. New students will be created automatically." : "Enter a single student email."}
                    ></textarea>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="font-medium text-white bg-gray-800 hover:bg-gray-900 rounded-md px-6 py-2 transition-colors duration-150"
                    >
                        {project ? 'Update Project' : 'Save Project'}
                    </button>
                </div>
            </form>
        </Card>
    </div>
  );
};

export default ProjectForm;
