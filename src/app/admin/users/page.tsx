'use client';

import { useState } from 'react';

// Mock user data matching Prisma User model structure
const mockUsers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@edushare.edu',
    department: 'Computer Science',
    role: 'Student',
    isActive: true,
  },
  {
    id: '2',
    name: 'Dr. Emily Davis',
    email: 'emily.davis@edushare.edu',
    department: 'Engineering',
    role: 'Faculty',
    isActive: true,
  },
  {
    id: '3',
    name: 'Michael Wong',
    email: 'michael.wong@edushare.edu',
    department: 'Business',
    role: 'Student',
    isActive: false,
  },
  {
    id: '4',
    name: 'Alicia Lopez',
    email: 'alicia.lopez@edushare.edu',
    department: 'Administration',
    role: 'Staff',
    isActive: true,
  },
  {
    id: '5',
    name: 'Robert Chen',
    email: 'robert.chen@edushare.edu',
    department: 'Computer Science',
    role: 'Faculty',
    isActive: true,
  },
  {
    id: '6',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@edushare.edu',
    department: 'Business',
    role: 'Staff',
    isActive: false,
  },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      roleFilter === 'All Roles' || user.role === roleFilter;
    const matchesDepartment =
      departmentFilter === 'All Departments' ||
      user.department === departmentFilter;
    return matchesSearch && matchesRole && matchesDepartment;
  });

  return (
    <>
      {/* SideNavBar */}
      <nav className="bg-blue-950 dark:bg-slate-950 text-blue-400 dark:text-blue-500 font-['Public_Sans'] text-sm font-medium fixed left-0 top-0 h-full w-64 rounded-none border-r border-blue-900 dark:border-slate-800 shadow-2xl flex flex-col h-full py-6 z-50 md:flex hidden">
        <div className="px-6 mb-8">
          <h1 className="text-lg font-black text-white tracking-tight">
            EduShare
          </h1>
          <p className="text-blue-200/70 text-xs mt-1">
            Polytechnic Admin
          </p>
        </div>
        <div className="flex-1 overflow-y-auto space-y-1">
          <a
            className="text-blue-200/70 hover:text-white px-4 py-3 flex items-center gap-3 hover:bg-blue-900/30 transition-all duration-200 Hover: translate-x-1"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="dashboard">
              dashboard
            </span>
            Dashboard
          </a>
          <a
            className="bg-blue-900/50 dark:bg-blue-900/20 text-white border-l-4 border-blue-400 px-4 py-3 flex items-center gap-3 hover:bg-blue-900/30 transition-all duration-200 Hover: translate-x-1"
            href="#"
            aria-current="page"
          >
            <span className="material-symbols-outlined" data-icon="group" style={{ fontVariationSettings: "'FILL' 1" }}>
              group
            </span>
            User Management
          </a>
          <a
            className="text-blue-200/70 hover:text-white px-4 py-3 flex items-center gap-3 hover:bg-blue-900/30 transition-all duration-200 Hover: translate-x-1"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="description">
              description
            </span>
            Reports
          </a>
          <a
            className="text-blue-200/70 hover:text-white px-4 py-3 flex items-center gap-3 hover:bg-blue-900/30 transition-all duration-200 Hover: translate-x-1"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="monitoring">
              monitoring
            </span>
            Analytics
          </a>
        </div>
        <div className="px-4 py-4 mt-auto">
          <div className="text-xs text-blue-200/50 mb-4 px-4">
            System Status: Online
          </div>
          <a
            className="text-blue-200/70 hover:text-white px-4 py-3 flex items-center gap-3 hover:bg-blue-900/30 transition-all duration-200"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="contact_support">
              contact_support
            </span>
            Support
          </a>
          <a
            className="text-blue-200/70 hover:text-white px-4 py-3 flex items-center gap-3 hover:bg-blue-900/30 transition-all duration-200"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="logout">
              logout
            </span>
            Sign Out
          </a>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64 w-full">
        {/* TopNavBar */}
        <header className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-md text-blue-900 dark:text-blue-400 font-['Public_Sans'] antialiased docked full-width top-0 border-b border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center w-full px-6 h-16 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <span className="material-symbols-outlined cursor-pointer">menu</span>
            </div>
            <div className="text-xl font-bold text-blue-900 dark:text-blue-100 hidden md:block">
              EduShare Admin
            </div>
            {/* Search on Left */}
            <div className="relative ml-4 md:ml-8 hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                search
              </span>
              <input
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-DEFAULT text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-surface-container-low w-64 transition-colors"
                placeholder="Search..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors p-2 rounded-full Active: opacity-80 duration-150"
            >
              <span className="material-symbols-outlined" data-icon="notifications">
                notifications
              </span>
            </button>
            <button
              className="text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors p-2 rounded-full Active: opacity-80 duration-150"
            >
              <span className="material-symbols-outlined" data-icon="settings">
                settings
              </span>
            </button>
            <button
              className="text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors p-2 rounded-full Active: opacity-80 duration-150 hidden sm:block"
            >
              <span className="material-symbols-outlined" data-icon="help">
                help
              </span>
            </button>
            <div className="h-8 w-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary font-bold overflow-hidden border border-slate-200 ml-2">
              <img
                alt="Administrator Profile"
                className="h-full w-full object-cover"
                data-alt="A modern, abstract digital graphic featuring deep blue corporate tones with subtle gradients. Clean geometric shapes imply professional data structure and administrative authority."
                src="https://lh3.googleusercontent.com/aida/ADBb0ujlIuFlvNUWpQ-nbc_is9FwIzxXciIKbiCCAepmAOfkiC-c0VTzAEhvm67aFD_rUDCCMeReTArzOy9_SGNt5CGxRjHrHSPQYklOwFde5QsLoX85OvCUx_y9UXwhAhIhCMgdr8debPR3HP77F4d1ShawNNiXmKvL8Bf4f5N3N5GZmBlQlCwAvB4LAcVW8swlqpISLbH93F_oq2-OMNikOjt4AYt2AbmUW1_wSeA7zjgCYbW92ZHShgpsnnrA"
              />
            </div>
          </div>
        </header>

        {/* Canvas */}
        <main className="flex-1 p-gutter md:p-lg lg:p-xl max-w-container-max mx-auto w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-md gap-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">
                User Management
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Manage students, faculty, and administrative staff access.
              </p>
            </div>
            <button
              className="bg-secondary text-on-secondary px-[20px] py-[8px] rounded-DEFAULT font-label-md text-label-md hover:bg-secondary-container transition-colors flex items-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Add User
            </button>
          </div>

          {/* Bento/Glassmorphism Control Bar */}
          <div className="bg-surface-container-lowest rounded-xl p-md mb-md shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-end">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto flex-1">
              <div className="flex-1 max-w-md">
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">
                  Search Users
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                    search
                  </span>
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-[#CBD5E1] rounded-DEFAULT font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-surface-container-lowest transition-colors"
                    placeholder="Search by name, ID, or email"
                    type="text"
                  />
                </div>
              </div>
              <div className="w-full sm:w-48">
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">
                  Role
                </label>
                <select
                  value={roleFilter}
      onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-[#CBD5E1] rounded-DEFAULT font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-surface-container-lowest transition-colors appearance-none pr-8 relative"
                >
                  <option>All Roles</option>
                  <option>Student</option>
                  <option>Faculty</option>
                  <option>Staff</option>
                </select>
              </div>
              <div className="w-full sm:w-48">
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">
                  Department
                </label>
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-[#CBD5E1] rounded-DEFAULT font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-surface-container-lowest transition-colors appearance-none pr-8 relative"
                >
                  <option>All Departments</option>
                  <option>Computer Science</option>
                  <option>Engineering</option>
                  <option>Business</option>
                  <option>Administration</option>
                </select>
              </div>
            </div>
          </div>

          {/* High Density Data Table */}
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container-low/50">
                    <th className="py-3 px-6 font-label-md text-label-md text-on-surface-variant">
                      Name
                    </th>
                    <th className="py-3 px-6 font-label-md text-label-md text-on-surface-variant">
                      Role
                    </th>
                    <th className="py-3 px-6 font-label-md text-label-md text-on-surface-variant">
                      Department
                    </th>
                    <th className="py-3 px-6 font-label-md text-label-md text-on-surface-variant">
                      Status
                    </th>
                    <th className="py-3 px-6 font-label-md text-label-md text-on-surface-variant text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="font-body-sm text-body-sm divide-y divide-outline-variant/30">
                  {filteredUsers.map((user) => (
                    <UserTableRow key={user.id} user={user} />
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="p-4 border-t border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest">
              <div className="font-body-sm text-body-sm text-on-surface-variant">
                Showing 1 to {filteredUsers.length} of 1,248 users
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1 text-outline hover:text-primary transition-colors disabled:opacity-50" disabled>
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <button className="w-8 h-8 rounded-DEFAULT bg-primary-container text-on-primary font-label-sm flex items-center justify-center">
                  1
                </button>
                <button className="w-8 h-8 rounded-DEFAULT text-on-surface-variant hover:bg-surface-container-low font-label-sm flex items-center justify-center transition-colors">
                  2
                </button>
                <button className="w-8 h-8 rounded-DEFAULT text-on-surface-variant hover:bg-surface-container-low font-label-sm flex items-center justify-center transition-colors">
                  3
                </button>
                <span className="px-2 text-on-surface-variant">...</span>
                <button className="p-1 text-outline hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

function UserTableRow({ user }: { user: typeof mockUsers[0] }) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <tr className="hover:bg-surface-container-low/20 transition-colors group">
      <td className="py-3 px-6">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full ${
            user.role === 'Student'
              ? 'bg-primary-container text-on-primary'
              : user.role === 'Faculty'
              ? 'bg-tertiary-container text-on-tertiary'
              : user.role === 'Staff'
              ? 'bg-secondary-container text-on-secondary-container'
              : 'bg-surface-variant text-on-surface-variant'
          } flex items-center justify-center font-bold text-xs`}>
            {getInitials(user.name)}
          </div>
          <div>
            <div className="font-medium text-on-surface">{user.name}</div>
            <div className="text-xs text-on-surface-variant">
              ID: {user.id.padStart(7, '0')}
            </div>
          </div>
        </div>
      </td>
      <td className="py-3 px-6">{user.role}</td>
      <td className="py-3 px-6">{user.department}</td>
      <td className="py-3 px-6">
        <span className={`inline-flex items-center px-2 py-1 rounded-DEFAULT ${
          user.isActive
            ? 'bg-[#F0F9FF] text-[#0284C7]'
            : 'bg-surface-variant text-on-surface-variant'
        } font-label-sm text-label-sm`}>
          {user.isActive ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="py-3 px-6 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="p-1.5 text-on-surface-variant hover:text-primary transition-colors rounded-DEFAULT hover:bg-surface-container-low"
            title="Edit"
          >
            <span className="material-symbols-outlined text-[18px]" data-icon="edit">
              edit
            </span>
          </button>
          <button
            className={`flex items-center gap-1 px-2 py-1.5 ${
              user.isActive
                ? 'text-error hover:bg-error-container/20'
                : 'text-on-surface-variant hover:bg-surface-container-low'
            } transition-colors rounded-DEFAULT font-label-sm text-label-sm`}>
              title={user.isActive ? 'Deactivate' : 'Activate'}
            >
              <span className="material-symbols-outlined text-[18px]" data-icon={user.isActive ? 'block' : 'check_circle'}>
                {user.isActive ? 'block' : 'check_circle'}
              </span>
              {user.isActive ? 'Deactivate' : 'Activate'}
            </button>
        </div>
      </td>
    </tr>
  );
}