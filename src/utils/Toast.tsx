import { CheckCircle, XCircle } from 'lucide-react'
import { toast } from 'react-toastify'

type ToastType = 'success' | 'error'

export default function Toast(type: ToastType, message: string) {
  if (type === 'success') {
    return toast.success(message, {
      icon: <CheckCircle strokeWidth={3} />,
    })
  }

  if (type === 'error') {
    return toast.error(message, {
      icon: <XCircle strokeWidth={3} className="text-red-500" />,
    })
  }
}
