
import React, { useState, useEffect } from 'react';
import { Project, EvaluationTemplate, EvaluationScores, Evaluation, ProjectMilestone } from '../types';
import Card from './Card';
import { BackIcon, ProjectIcon } from './icons/Icons';

interface SliderInputProps {
  label: string;
  criterionId: string;
  value: number;
  onChange: (id: string, value: number) => void;
}

const SliderInput: React.FC<SliderInputProps> = ({ label, criterionId, value, onChange }) => (
  <div>
    <label htmlFor={criterionId} className="block text-sm font-medium text-gray-700 mb-1">
      {label}: <span className="font-bold text-gray-900">{value} / 25</span>
    </label>
    <input
      id={criterionId}
      name={criterionId}
      type="range"
      min="0"
      max="25"
      value={value}
      onChange={(e) => onChange(criterionId, parseInt(e.target.value, 10))}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
    />
  </div>
);

interface EvaluationFormProps {
  project: Project;
  milestone: ProjectMilestone;
  templates: EvaluationTemplate[];
  existingEvaluation?: Evaluation;
  onSave: (projectId: string, milestoneId: string, templateId: string, scores: EvaluationScores, comment: string) => void;
  onBack: () => void;
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({ project, milestone, templates, existingEvaluation, onSave, onBack }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(existingEvaluation?.templateId || '');
  const [scores, setScores] = useState<EvaluationScores>(existingEvaluation?.scores || {});
  const [comment, setComment] = useState<string>(existingEvaluation?.comment || '');
  const [isSaved, setIsSaved] = useState(false);

  const selectedTemplate = templates.find(t => t.id === selectedTemplateId);

  useEffect(() => {
    if (existingEvaluation) {
      setSelectedTemplateId(existingEvaluation.templateId);
      setScores(existingEvaluation.scores);
      setComment(existingEvaluation.comment);
    } else if (templates.length > 0) {
      setSelectedTemplateId(templates[0].id);
    }
  }, [existingEvaluation, templates]);

  useEffect(() => {
    if (selectedTemplate) {
      const initialScores: EvaluationScores = {};
      selectedTemplate.criteria.forEach(c => {
        initialScores[c.id] = scores[c.id] || 12;
      });
      setScores(initialScores);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplateId]);

  const handleScoreChange = (criterionId: string, value: number) => {
    setScores(prev => ({ ...prev, [criterionId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTemplateId) {
      onSave(project.id, milestone.id, selectedTemplateId, scores, comment);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 mb-4">
        <BackIcon className="h-4 w-4" />
        <span>Back to Project Details</span>
      </button>
      <h1 className="text-3xl font-bold text-gray-900">Evaluating Milestone: {milestone.name}</h1>
      <p className="text-gray-600 mb-6">For project: {project.name}</p>

      <Card>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-4">
            <div className="bg-gray-100 p-2 rounded-lg mr-4"><ProjectIcon className="h-6 w-6 text-gray-700" /></div>
            <h3 className="text-lg font-bold text-gray-900">Evaluation Rubric</h3>
          </div>

          <div>
            <label htmlFor="template" className="block text-sm font-medium text-gray-700">Evaluation Template</label>
            <select
              id="template"
              value={selectedTemplateId}
              onChange={(e) => setSelectedTemplateId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
            >
              <option value="" disabled>Select a template...</option>
              {templates.map(template => (
                <option key={template.id} value={template.id}>{template.name}</option>
              ))}
            </select>
          </div>

          {selectedTemplate && (
            <div className="space-y-4 mt-6 border-t border-gray-200 pt-6">
              {selectedTemplate.criteria.map(criterion => (
                <SliderInput
                  key={criterion.id}
                  label={criterion.name}
                  criterionId={criterion.id}
                  value={scores[criterion.id] || 0}
                  onChange={handleScoreChange}
                />
              ))}
              <div className="border-t pt-4 mt-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comments</label>
                <textarea
                    id="comment"
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                    placeholder="Provide overall feedback for this milestone."
                ></textarea>
              </div>
            </div>
          )}

          <div className="mt-6">
            <button
              type="submit"
              disabled={!selectedTemplateId}
              className={`w-full text-white px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${isSaved ? 'bg-green-500' : 'bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400'}`}
            >
              {isSaved ? 'Saved!' : 'Save Evaluation'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EvaluationForm;
