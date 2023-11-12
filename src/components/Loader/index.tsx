import Spinner from './Spinner'

export default function Loader() {
  return (
    <div
      className="fixed w-full h-screen flex items-center justify-center z-50 bg-gray-200/50 
    dark:bg-gray-900/80"
    >
      <Spinner className="w-12 h-12" />
    </div>
  )
}
