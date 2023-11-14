import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ToastWrapper() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      toastClassName={
        '!rounded-md !drop-shadow-lg !font-bold bg-gray-900 font-montserrat dark:bg-gray-50 dark:text-gray-900'
      }
      progressClassName={'!bg-gray-100 dark:!bg-gray-500'}
    />
  )
}
