
import React from 'react';
import { User, Student } from '../types';
import { LogoIcon } from './icons/Icons';

interface LoginProps {
  onLogin: (user: User) => void;
  evaluators: User[];
  students: Student[];
  admin: User;
}

const Login: React.FC<LoginProps> = ({ onLogin, evaluators, students, admin }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8">
        <div className="text-center">
          <LogoIcon className="w-20 h-20 mx-auto text-gray-800" />
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            HIT Evaluation System
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Please select your role to continue
          </p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-xl shadow-md space-y-4">
           <div>
            <h2 className="text-xl font-bold text-gray-800">Login as Admin</h2>
            <button
              onClick={() => onLogin(admin)}
              className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition duration-150 ease-in-out"
            >
              {admin.name}
            </button>
          </div>

          <div className="border-t border-gray-200"></div>

          <div>
            <h2 className="text-xl font-bold text-gray-800">Login as Evaluator</h2>
             <div className="mt-2 space-y-2">
                {evaluators.map(evaluator => (
                    <button
                        key={evaluator.id}
                        onClick={() => onLogin(evaluator)}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition duration-150 ease-in-out"
                    >
                        {evaluator.name}
                    </button>
                ))}
             </div>
          </div>
          
          <div className="border-t border-gray-200"></div>

          <div>
             <h2 className="text-xl font-bold text-gray-800">Login as Student</h2>
             <div className="mt-2 space-y-2">
                {students.map(student => (
                     <button
                        key={student.id}
                        onClick={() => onLogin(student)}
                        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                     >
                        {student.name}
                    </button>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
