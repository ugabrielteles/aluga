import { useEffect, useState } from 'react';
import Sidebar from './SideBar';
import MainContent from './MainContent';
import SidebarButton from './SidebarButton';
import { Outlet } from 'react-router-dom'
import Header from './Header';

const Layout = ({ children }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    console.log('qqq', children)
  })

  return (
    <div className="min-h-screen">
      <SidebarButton
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <MainContent>
        <Header></Header>
        <Outlet />
      </MainContent>
    </div>
  )
};

export default Layout;