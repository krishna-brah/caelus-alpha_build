import * as React from 'react'
import { Transition } from '@headlessui/react'
import { 
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon 
} from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'

export interface Toast {
  id: string
  title: string
  message?: string
  type?: 'success' | 'error' | 'info' | 'warning'
}

interface ToastProps extends Toast {
  onDismiss: (id: string) => void
}

const icons = {
  success: <CheckCircleIcon className="h-6 w-6 text-green-400" />,
  error: <XCircleIcon className="h-6 w-6 text-red-400" />,
  info: <InformationCircleIcon className="h-6 w-6 text-blue-400" />,
  warning: <ExclamationCircleIcon className="h-6 w-6 text-yellow-400" />
}

const styles = {
  success: 'bg-green-50 border-green-200',
  error: 'bg-red-50 border-red-200',
  info: 'bg-blue-50 border-blue-200',
  warning: 'bg-yellow-50 border-yellow-200'
}

export const ToastComponent: React.FC<ToastProps> = ({
  id,
  title,
  message,
  type = 'info',
  onDismiss
}) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id)
    }, 5000)

    return () => clearTimeout(timer)
  }, [id, onDismiss])

  return (
    <Transition
      show={true}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={`max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden border ${styles[type]}`}>
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {icons[type]}
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">
                {title}
              </p>
              {message && (
                <p className="mt-1 text-sm text-gray-500">
                  {message}
                </p>
              )}
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="bg-transparent rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cosmic-500"
                onClick={() => onDismiss(id)}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

interface ToastProviderProps {
  children: React.ReactNode
}

type ToastContextType = {
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

export const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback((toast: Omit<Toast, 'id'>) => {
    setToasts((prev) => [...prev, { ...toast, id: String(Date.now()) }])
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {toasts.map((toast) => (
            <ToastComponent
              key={toast.id}
              {...toast}
              onDismiss={removeToast}
            />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}