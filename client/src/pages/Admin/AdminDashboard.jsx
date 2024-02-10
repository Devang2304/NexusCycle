import React from 'react'
import AllProjects from '../../components/Admin/AllProjects'
import NewProjects from '../../components/Admin/NewProjects'

export default function AdminDashboard() {
  return (
    <div>
      <NewProjects />
      <AllProjects />
    </div>
  )
}
