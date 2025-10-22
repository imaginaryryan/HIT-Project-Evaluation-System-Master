
import React, { useState, useRef, useEffect } from 'react';
import { Project, User, UserRole } from '../types';
import Card from './Card';
import { PaperAirplaneIcon, UserCircleIcon } from './icons/Icons';

interface ProjectCommunicationProps {
    project: Project;
    currentUser: User;
    onAddComment: (projectId: string, content: string) => void;
}

const ProjectCommunication: React.FC<ProjectCommunicationProps> = ({ project, currentUser, onAddComment }) => {
    const [comment, setComment] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    const canComment = currentUser.role === UserRole.Evaluator && project.evaluatorIds.includes(currentUser.id)
                      || currentUser.role === UserRole.Student && project.studentIds.includes(currentUser.id);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (comment.trim() && canComment) {
            onAddComment(project.id, comment.trim());
            setComment('');
        }
    };

    useEffect(() => {
        if(scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [project.comments]);

    return (
        <Card>
            <div className="flex items-center mb-4">
                <div className="bg-gray-100 p-2 rounded-lg mr-4"><UserCircleIcon className="h-6 w-6 text-gray-700"/></div>
                <h3 className="text-lg font-bold text-gray-900">Project Discussion</h3>
            </div>
            <div className="space-y-4">
                <div ref={scrollRef} className="h-64 overflow-y-auto pr-2 space-y-4 bg-gray-50 p-3 rounded-md border">
                    {project.comments.length > 0 ? project.comments.map(c => {
                        const isCurrentUser = c.authorId === currentUser.id;
                        return (
                            <div key={c.id} className={`flex items-start gap-3 ${isCurrentUser ? 'justify-end' : ''}`}>
                                <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                                    <div className={`p-3 rounded-lg max-w-xs ${isCurrentUser ? 'bg-gray-800 text-white rounded-br-none' : 'bg-white border rounded-bl-none'}`}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-semibold text-sm">{c.authorName}</p>
                                            <span className={`text-xs font-bold capitalize ${c.authorRole === UserRole.Evaluator ? 'text-blue-400' : 'text-green-400'}`}>{c.authorRole}</span>
                                        </div>
                                        <p className="text-sm">{c.content}</p>
                                    </div>
                                    <span className="text-xs text-gray-400 mt-1">{new Date(c.timestamp).toLocaleString()}</span>
                                </div>
                            </div>
                        )
                    }) : (
                        <div className="h-full flex items-center justify-center">
                            <p className="text-sm text-gray-500">No comments yet. Start the conversation!</p>
                        </div>
                    )}
                </div>

                {canComment && (
                    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write a comment..."
                            rows={1}
                            className="flex-grow px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 resize-none"
                        />
                        <button
                            type="submit"
                            disabled={!comment.trim()}
                            className="p-2 text-white bg-gray-800 rounded-md hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                            aria-label="Send comment"
                        >
                            <PaperAirplaneIcon className="h-5 w-5" />
                        </button>
                    </form>
                )}
            </div>
        </Card>
    );
};

export default ProjectCommunication;
