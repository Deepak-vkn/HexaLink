import React from 'react'
import { FaUserCircle, FaRegBookmark, FaRegClock, FaRegFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'
const leftActivityBar = () => {
  return (

    <div className="bg-white shadow rounded-lg p-4">
    <h3 className="text-md font-semibold text-gray-800 mb-3">Your Activity</h3>
    <ul className="space-y-2">
      <li className="flex items-center text-sm text-gray-600">
        <FaRegClock className="mr-2" />
        <span>Recent Activity</span>
      </li>
      <li className="flex items-center text-sm text-gray-600">
        <FaRegFileAlt className="mr-2" />
        <Link to="/posts" className="hover:text-blue-600 transition duration-300">
          Your Posts
        </Link>
      </li>
      <li className="flex items-center text-sm text-gray-600">
        <FaRegBookmark className="mr-2" />
        <Link to="/saved" className="hover:text-blue-600 transition duration-300">
        Saved Items
        </Link>
      </li>
    </ul>
  </div>
  )
}

export default leftActivityBar
