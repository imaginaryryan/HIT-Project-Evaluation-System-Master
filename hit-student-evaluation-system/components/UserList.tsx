
import React from 'react';
import { User, UserRole } from '../types';
import { UserCircleIcon } from './icons/Icons';

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Users</h1>
      <p className="text-gray-600 mb-6">A list of all students and evaluators in the system.</p>
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">User Name</th>
                <th scope="col" className="px-6 py-3">Role</th>
                <th scope="col" className="px-6 py-3">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <UserCircleIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    {user.name}
                  </th>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                        user.role === UserRole.Student ? 'bg-blue-100 text-blue-800' : 
                        user.role === UserRole.Evaluator ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                    }`}>
                        {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                </tr>
              ))}
               {users.length === 0 && (
                <tr className="bg-white border-b">
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                        No users found.
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

export default UserList;
