import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (<>
    <div className='text-red-300'>Home</div>
    <Link to='/login'>Login</Link>
  </>
  )
}
