
import React from 'react';
import { Student } from '../types';
import { UserCircleIcon } from './icons/Icons';

interface StudentsListProps {
  students: Student[];
}

const StudentsList: React.FC<StudentsListProps> = ({ students }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Students</h1>
      <p className="text-gray-600 mb-6">A list of all students in the system.</p>
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Student Name</th>
                <th scope="col" className="px-6 py-3">Student ID</th>
                <th scope="col" className="px-6 py-3">Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <UserCircleIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    {student.name}
                  </th>
                  <td className="px-6 py-4 font-mono">{student.studentId}</td>
                  <td className="px-6 py-4">{student.email}</td>
                </tr>
              ))}
               {students.length === 0 && (
                <tr className="bg-white border-b">
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                        No students found.
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

export default StudentsList;
