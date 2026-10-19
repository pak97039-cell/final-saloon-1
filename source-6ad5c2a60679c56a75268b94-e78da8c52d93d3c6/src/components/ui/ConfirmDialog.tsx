import React from 'react';
import { Modal } from './Modal';
import { AlertCircle, HelpCircle } from 'lucide-react';

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      maxWidth="sm"
      showCloseButton={false}
      ariaLabel={title}
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3.5">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
              isDestructive
                ? 'bg-rose-50 border-rose-200 text-rose-700'
                : 'bg-[#FAF8F5] border-[#E8DCCF] text-[#8A6A2F]'
            }`}
          >
            {isDestructive ? (
              <AlertCircle className="w-5 h-5" />
            ) : (
              <HelpCircle className="w-5 h-5" />
            )}
          </div>
          <div>
            <h4 className="font-serif text-lg text-[#1E1B18] font-medium leading-snug">
              {title}
            </h4>
            <p className="text-xs text-[#1E1B18]/75 mt-1 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 text-xs font-medium text-[#1E1B18] bg-white border border-[#E8DCCF] rounded-sm hover:bg-[#FAF8F5] min-h-[44px] transition-colors focus-visible:outline-2 focus-visible:outline-[#C5A059]"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-sm min-h-[44px] transition-all shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 ${
              isDestructive
                ? 'bg-rose-700 hover:bg-rose-800 text-white focus-visible:outline-rose-700'
                : 'bg-[#1E1B18] hover:bg-[#121212] text-[#FAF8F5] focus-visible:outline-[#1E1B18]'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
};
