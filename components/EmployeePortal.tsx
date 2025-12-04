import React, { useState } from 'react';
import { MOCK_EMPLOYEES } from '../constants';
import { Employee } from '../types';
import { UserCheck, Clock, Calendar, LogOut, Shield } from 'lucide-react';

export const EmployeePortal: React.FC = () => {
  const [pin, setPin] = useState('');
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = employees.find(emp => emp.pin === pin);
    if (user) {
      setCurrentUser(user);
      setPin('');
    } else {
      alert('Invalid PIN');
      setPin('');
    }
  };

  const handleClockToggle = () => {
    if (!currentUser) return;
    
    setEmployees(prev => prev.map(emp => {
      if (emp.id === currentUser.id) {
        const updated = {
           ...emp, 
           isClockedIn: !emp.isClockedIn,
           lastClockIn: !emp.isClockedIn ? new Date() : emp.lastClockIn
        };
        setCurrentUser(updated); // Update local state immediately
        return updated;
      }
      return emp;
    }));
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Login Screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border-t-4 border-larosa-wood">
          <div className="text-center mb-8">
             <Shield className="w-12 h-12 text-larosa-wood mx-auto mb-4" />
             <h2 className="text-2xl font-serif font-bold text-gray-900">Staff Portal</h2>
             <p className="text-gray-500">Enter your PIN to access</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={4}
              placeholder="0000"
              className="w-full text-center text-4xl tracking-widest py-4 border-2 border-gray-300 rounded-lg focus:border-larosa-wood focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-larosa-wood text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors"
            >
              Access System
            </button>
          </form>
          <div className="mt-8 text-center text-xs text-gray-400">
             <p>Authorized Personnel Only</p>
             <p className="mt-2 text-larosa-tomato font-mono">(Demo PINs: 1985, 1234, 0000)</p>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="bg-larosa-wood text-white p-2 rounded-full">
               <UserCheck className="w-6 h-6" />
             </div>
             <div>
               <h2 className="font-bold text-gray-900">{currentUser.name}</h2>
               <p className="text-xs text-gray-500 uppercase">{currentUser.role}</p>
             </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center text-red-600 hover:text-red-800 font-medium"
          >
            <LogOut className="w-5 h-5 mr-1" /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Time Clock Section */}
        <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-larosa-gold">
           <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
             <Clock className="w-5 h-5 mr-2 text-larosa-gold" /> Time Clock
           </h3>
           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                 <p className="text-gray-500">Current Status</p>
                 <div className={`text-2xl font-bold ${currentUser.isClockedIn ? 'text-green-600' : 'text-gray-400'}`}>
                    {currentUser.isClockedIn ? 'CLOCKED IN' : 'CLOCKED OUT'}
                 </div>
                 {currentUser.isClockedIn && currentUser.lastClockIn && (
                   <p className="text-sm text-gray-400">Since {currentUser.lastClockIn.toLocaleTimeString()}</p>
                 )}
              </div>
              
              <button
                onClick={handleClockToggle}
                className={`w-full md:w-auto px-12 py-6 rounded-xl font-bold text-xl shadow-lg transform transition-all active:scale-95 ${
                  currentUser.isClockedIn 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200 border-2 border-red-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200 border-2 border-green-200'
                }`}
              >
                {currentUser.isClockedIn ? 'Clock Out' : 'Clock In'}
              </button>
           </div>
        </section>

        {/* Schedule Section */}
        <section className="bg-white rounded-xl shadow-md p-6">
           <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
             <Calendar className="w-5 h-5 mr-2 text-larosa-wood" /> Your Schedule
           </h3>
           <div className="overflow-x-auto">
             <table className="min-w-full divide-y divide-gray-200">
               <thead className="bg-gray-50">
                 <tr>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End</th>
                 </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-200">
                 {currentUser.schedule.map((shift) => (
                   <tr key={shift.id}>
                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{shift.day}</td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shift.start}</td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shift.end}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </section>

        {/* Manager Section */}
        {currentUser.role === 'Manager' && (
           <section className="bg-larosa-wood text-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center text-larosa-gold">
                <Shield className="w-5 h-5 mr-2" /> Manager Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 <div className="bg-white/10 p-4 rounded-lg">
                    <p className="text-sm text-gray-300">Active Staff</p>
                    <p className="text-3xl font-bold">{employees.filter(e => e.isClockedIn).length}</p>
                 </div>
                 <div className="bg-white/10 p-4 rounded-lg">
                    <p className="text-sm text-gray-300">Total Shifts Today</p>
                    <p className="text-3xl font-bold">5</p>
                 </div>
              </div>
              
              <h4 className="mt-8 mb-4 font-bold text-gray-300 text-sm uppercase">Currently Clocked In</h4>
              <ul className="space-y-2">
                 {employees.filter(e => e.isClockedIn).map(emp => (
                   <li key={emp.id} className="flex justify-between items-center bg-white/5 p-3 rounded">
                      <span>{emp.name}</span>
                      <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">{emp.role}</span>
                   </li>
                 ))}
              </ul>
           </section>
        )}

      </main>
    </div>
  );
};