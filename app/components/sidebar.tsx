"use client"
import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <div
        className={`fixed left-0 top-0 h-full bg-gray-800 text-white transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64`}
      >
        <div className="p-4">
          <p>Text 1</p>
          <p>Text 2</p>
          <p>Text 3</p>
        </div>
      </div>
      <div
        className={`flex-1 transition-all duration-300 ${
          isOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="bg-blue-500 p-2 m-4 rounded"
        >
          {isOpen ? 'Close' : 'Open'} Sidebar
        </button>
        <div className="p-10">
          <h1>Main Content Area</h1>
          <p>This is the main content that will be pushed to the right when the sidebar is open.</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
