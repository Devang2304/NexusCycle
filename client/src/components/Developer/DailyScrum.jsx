import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function DailyScrum() {
    const navigate = useNavigate()
    const redirectToScrum = () => {
        navigate(`/video-call/1`)
    }
  return (
    <div>
        <button onClick={redirectToScrum} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Daily Scrum
        </button>
    </div>
  )
}
