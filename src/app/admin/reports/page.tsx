'use client';

import { useState } from 'react';

// Mock report data based on Prisma Report model
const mockReports = [
  {
    id: '1',
    reason: 'INAPPROPRIATE',
    description: 'User reported this PDF for containing inappropriate content',
    status: 'PENDING',
    actionTaken: null,
    createdAt: new Date('2026-05-18T10:30:00Z'),
    resolvedAt: null,
    reporter: {
      name: 'Sarah Jenkins',
      role: 'Student'
    },
    resourceName: 'Advanced Calculus 101 Notes.pdf'
  },
  {
    id: '2',
    reason: 'BULLYING',
    description: 'Comment deemed harassing towards another student',
    status: 'PENDING',
    actionTaken: null,
    createdAt: new Date('2026-05-17T14:15:00Z'),
    resolvedAt: null,
    reporter: {
      name: 'Dr. Alan Turing',
      role: 'Faculty'
    },
    resourceName: 'Re: Final Project Discussion'
  },
  {
    id: '3',
    reason: 'OTHER',
    description: 'Automatically flagged by AI for potential PII exposure',
    status: 'RESOLVED',
    actionTaken: 'Content removed and user warned',
    createdAt: new Date('2026-05-16T09:00:00Z'),
    resolvedAt: new Date('2026-05-16T10:00:00Z'),
    reporter: {
      name: 'System Auto-Flag',
      role: 'AI Detection'
    },
    resourceName: 'Lab_Results_04.png'
  },
  {
    id: '4',
    reason: 'SPAM',
    description: 'Repeated posting of identical content',
    status: 'DISMISSED',
    actionTaken: 'No action required',
    createdAt: new Date('2026-05-15T16:45:00Z'),
    resolvedAt: new Date('2026-05-15T17:00:00Z'),
    reporter: {
      name: 'Michael Wong',
      role: 'Student'
    },
    resourceName: 'Week 3 Assignment Template'
  },
  {
    id: '5',
    reason: 'INAPPROPRIATE',
    description: 'Image contains inappropriate visual content',
    status: 'PENDING',
    actionTaken: null,
    createdAt: new Date('2026-05-14T11:20:00Z'),
    resolvedAt: null,
    reporter: {
      name: 'Alicia Lopez',
      role: 'Staff'
    },
    resourceName: 'Chemistry Lab Safety Diagram.jpg'
  }
];

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterReason, setFilterReason] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string[]>([]);

  const filteredReports = mockReports.filter(report => {
    // Search by resource name or reporter name
    const matchesSearch =
      report.resourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reporter.name.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by reason
    const matchesReason =
      filterReason.length === 0 ||
      filterReason.includes(report.reason);

    // Filter by status
    const matchesStatus =
      filterStatus.length === 0 ||
      filterStatus.includes(report.status);

    return matchesSearch && matchesReason && matchesStatus;
  });

  return (
    <>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h3 className="font-headline-lg text-on-surface mb-2">
            Flagged Content
          </h3>
          <p className="font-body-md text-on-surface-variant">
            Review and manage content reported by users across the network.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 border border-outline-variant rounded-lg text-on-surface bg-surface-container-lowest hover:bg-surface-container-high transition-colors font-label-md flex items-center gap-2"
            onClick={() => {
              // Placeholder for filter logic - would open filter dialog in real implementation
              console.log('Filter button clicked');
            }}
          >
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filter
          </button>
        </div>
      </div>

      {/* Reports Table Card */}
      <div className="bg-surface-container-lowest rounded-xl shadow-level-1 border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container text-on-surface-variant font-label-md uppercase tracking-wider text-xs border-b border-outline-variant/50">
                <th className="p-4 font-semibold">Resource Name</th>
                <th className="p-4 font-semibold">Reporter</th>
                <th className="p-4 font-semibold">Reason</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-on-surface divide-y divide-outline-variant/30">
              {filteredReports.map(report => (
                <ReportTableRow key={report.id} report={report} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest">
          <span className="font-body-sm text-on-surface-variant">
            Showing 1 to {filteredReports.length} of {mockReports.length} entries
          </span>
          <div className="flex gap-1">
            <button
              className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:bg-surface disabled:opacity-50"
              disabled
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary font-label-sm"
            >
              1
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface hover:bg-surface font-label-sm"
            >
              2
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface hover:bg-surface font-label-sm"
            >
              3
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:bg-surface"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function ReportTableRow({ report }: { report: typeof mockReports[0] }) {
  const getStatusBadge = (status: typeof report.status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-error-container text-on-error-container';
      case 'RESOLVED':
        return 'bg-primary-fixed text-on-primary-fixed';
      case 'DISMISSED':
        return 'bg-surface-container-highest text-on-surface';
      default:
        return 'bg-surface-container-highest text-on-surface';
    }
  };

  const getStatusIcon = (status: typeof report.status) => {
    switch (status) {
      case 'PENDING':
        return 'pending';
      case 'RESOLVED':
        return 'check_circle';
      case 'DISMISSED':
        return 'cancel';
      default:
        return 'pending';
    }
  };

  return (
    <tr className="hover:bg-surface transition-colors group">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-error-container text-error flex items-center justify-center">
            <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
          </div>
          <div>
            <p className="font-semibold text-primary">{report.resourceName}</p>
            <p className="text-xs text-on-surface-variant">
              {/* Mock course or context */}
              {report.resourceName.includes('PDF') && 'Course: MAT201'}
              {report.resourceName.includes('Discussion') && 'Forum: Computer Science'}
              {report.resourceName.includes('PNG') && 'Upload: Chemistry Dept'}
              {report.resourceName.includes('JPG') && 'Chemistry Lab Safety'}
              {!report.resourceName.includes('PDF') && !report.resourceName.includes('Discussion') && !report.resourceName.includes('PNG') && !report.resourceName.includes('JPG') && 'Document'}
            </p>
          </div>
        </div>
      </td>
      <td className="p-4">
        <p className="font-medium">{report.reporter.name}</p>
        <p className="text-xs text-on-surface-variant">
          {report.reporter.role}
        </p>
      </td>
      <td className="p-4">
        <span className={`bg-surface-container-highest text-on-surface px-2 py-1 rounded text-xs font-medium border border-outline-variant/50`}>
          {report.reason}
        </span>
      </td>
      <td className="p-4">
        <span className={`${getStatusBadge(report.status)} px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-max`}>
          <span className={`material-symbols-outlined text-[14px]`}>{getStatusIcon(report.status)}</span>
          {report.status}
        </span>
      </td>
      <td className="p-4">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="px-3 py-1.5 border border-error text-error hover:bg-error-container rounded font-label-sm transition-colors"
          >
            Remove Content
          </button>
          <button
            className="px-3 py-1.5 border border-outline text-on-surface-variant hover:bg-surface-container-high rounded font-label-sm transition-colors"
          >
            Dismiss
          </button>
        </div>
      </td>
    </tr>
  );
}