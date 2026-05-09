import React from "react";

export default function JoinClassModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-surface-container-lowest rounded-xl p-6 w-full max-w-sm shadow-[0_8px_20px_rgba(0,35,111,0.08)]">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-6">
          Join a Section
        </h2>
        <input
          type="text"
          placeholder="Enter section code (e.g. C1)"
          className="w-full border border-outline-variant rounded px-3 py-2 font-body-md text-on-surface bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors mb-6"
        />
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-low rounded transition-colors"
          >
            Cancel
          </button>
          <button className="px-4 py-2 font-label-md text-label-md bg-secondary text-on-secondary rounded hover:opacity-90 transition-opacity">
            Join
          </button>
        </div>
      </div>
    </div>
  );
}
