import { useNotification } from '@/context/NotificationContext'
import { X, CheckCircle, AlertCircle, InfoIcon, AlertTriangle } from 'lucide-react'
import clsx from 'clsx'

export function ToastContainer() {
  const { notifications, removeNotification } = useNotification()

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  )
}

interface ToastProps {
  notification: {
    id: string
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
  }
  onClose: () => void
}

export function Toast({ notification, onClose }: ToastProps) {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    error: <AlertCircle className="w-5 h-5 text-red-600" />,
    info: <InfoIcon className="w-5 h-5 text-blue-600" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
  }

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-yellow-50 border-yellow-200',
  }

  return (
    <div
      className={clsx(
        'flex items-center gap-3 px-4 py-3 rounded-lg border animate-in fade-in slide-in-from-bottom-4 duration-300',
        bgColors[notification.type]
      )}
    >
      {icons[notification.type]}
      <p className="flex-1 text-sm font-medium">{notification.message}</p>
      <button
        onClick={onClose}
        className="p-1 hover:bg-white rounded transition"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
