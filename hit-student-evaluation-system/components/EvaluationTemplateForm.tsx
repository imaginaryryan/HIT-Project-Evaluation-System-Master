
import React, { useState, useEffect } from 'react';
import { EvaluationTemplate } from '../types';
import Card from './Card';
import { BackIcon } from './icons/Icons';

interface EvaluationTemplateFormProps {
  template: EvaluationTemplate | null;
  onSubmit: (data: { id?: string; name: string; criteria: string[] }) => void;
  onBack: () => void;
}

const EvaluationTemplateForm: React.FC<EvaluationTemplateFormProps> = ({ template, onSubmit, onBack }) => {
  const [name, setName] = useState('');
  const [criteria, setCriteria] = useState('');

  useEffect(() => {
    if (template) {
      setName(template.name);
      setCriteria(template.criteria.map(c => c.name).join('\n'));
    }
  }, [template]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const criteriaList = criteria.split('\n').map(c => c.trim()).filter(c => c);
    onSubmit({ id: template?.id, name, criteria: criteriaList });
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 mb-4">
        <BackIcon className="h-4 w-4" />
        <span>Back to Templates</span>
      </button>
      <h1 className="text-3xl font-bold text-gray-900">{template ? 'Edit Template' : 'Add New Template'}</h1>
      <p className="text-gray-600 mb-6">{template ? 'Update the details for this template.' : 'Fill in the details for a new rubric.'}</p>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Template Name</label>
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
            <label htmlFor="criteria" className="block text-sm font-medium text-gray-700">Criteria</label>
            <textarea
              id="criteria"
              rows={6}
              value={criteria}
              onChange={(e) => setCriteria(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
              placeholder="Enter one evaluation criterion per line."
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="font-medium text-white bg-gray-800 hover:bg-gray-900 rounded-md px-6 py-2 transition-colors duration-150"
            >
              {template ? 'Update Template' : 'Save Template'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EvaluationTemplateForm;
