import React from 'react'
import { CheckCircle, XCircle, Info, X, AlertTriangle } from 'lucide-react'
import { useToast } from '../context/ToastContext'

const icons = {
  success: <CheckCircle size={18} className="text-green-500" />,
  error:   <XCircle     size={18} className="text-red-500" />,
  info:    <Info        size={18} className="text-blue-500" />,
  warning: <AlertTriangle size={18} className="text-amber-500" />,
}

const borders = {
  success: 'border-l-green-500',
  error:   'border-l-red-500',
  info:    'border-l-blue-500',
  warning: 'border-l-amber-500',
}

export default function Toast() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 z-[9999] flex flex-col gap-3 sm:max-w-sm pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`toast-enter pointer-events-auto flex items-start gap-3 bg-white rounded-lg shadow-xl border border-gray-100 border-l-4 ${borders[t.type] || borders.info} p-4`}
        >
          <span className="mt-0.5 shrink-0">{icons[t.type] || icons.info}</span>
          <p className="text-sm text-gray-700 flex-1 leading-snug">{t.message}</p>
          <button
            onClick={() => removeToast(t.id)}
            className="text-gray-400 hover:text-gray-600 shrink-0 transition-colors"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}
