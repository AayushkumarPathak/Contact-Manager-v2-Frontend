import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom'

function BackButton() {
    const navigate = useNavigate();
  return (
    <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
      >
        <ArrowLeft className="mr-2" /> Back
      </button>
  )
}

export default BackButton