
import React from 'react';
import { EvaluationTemplate, UserRole } from '../types';

interface EvaluationTemplatesListProps {
  templates: EvaluationTemplate[];
  onAddNew: () => void;
  onEdit: (template: EvaluationTemplate) => void;
  onDelete: (templateId: string) => void;
  role: UserRole;
}

const EvaluationTemplatesList: React.FC<EvaluationTemplatesListProps> = ({ templates, onAddNew, onEdit, onDelete, role }) => {
  const canModify = role === UserRole.Admin;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Evaluation Templates</h1>
          <p className="text-gray-600">{canModify ? 'Manage reusable evaluation rubrics for all evaluators.' : 'A list of available evaluation rubrics.'}</p>
        </div>
        {canModify && (
            <button
            onClick={onAddNew}
            className="font-medium text-white bg-gray-800 hover:bg-gray-900 rounded-md px-4 py-2 transition-colors duration-150"
            >
            + Add New Template
            </button>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Template Name</th>
                <th scope="col" className="px-6 py-3">Criteria</th>
                {canModify && <th scope="col" className="px-6 py-3 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {templates.map((template) => (
                <tr key={template.id} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{template.name}</th>
                  <td className="px-6 py-4 max-w-md truncate">
                    {template.criteria.map(c => c.name).join(', ')}
                  </td>
                  {canModify && (
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => onEdit(template)} className="font-medium text-gray-600 hover:text-gray-900">Edit</button>
                        <button onClick={() => onDelete(template.id)} className="font-medium text-red-600 hover:text-red-900">Delete</button>
                      </td>
                  )}
                </tr>
              ))}
              {templates.length === 0 && (
                <tr className="bg-white border-b">
                  <td colSpan={canModify ? 3 : 2} className="px-6 py-8 text-center text-gray-500">
                    No templates created yet.
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

export default EvaluationTemplatesList;
