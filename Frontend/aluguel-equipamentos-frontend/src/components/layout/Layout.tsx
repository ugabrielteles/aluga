import { useState } from 'react';

const Layout = ({ children }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-indigo-700 text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold">Meu App</h1>
          ) : (
            <span className="text-xl font-bold">M</span>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-lg hover:bg-indigo-600"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        <nav className="mt-6">
          <NavItem icon="🏠" text="Dashboard" active sidebarOpen={sidebarOpen} />
          <NavItem icon="📊" text="Relatórios" sidebarOpen={sidebarOpen} />
          <NavItem icon="⚙️" text="Configurações" sidebarOpen={sidebarOpen} />
          <NavItem icon="👤" text="Perfil" sidebarOpen={sidebarOpen} />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <span className="text-gray-600">🔔</span>
              </button>
              <div className="flex items-center">
                <img 
                  src="https://via.placeholder.com/40" 
                  alt="User" 
                  className="w-8 h-8 rounded-full"
                />
                {sidebarOpen && (
                  <span className="ml-2 text-sm font-medium">Usuário</span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, text, active = false, sidebarOpen }: any) => {
  return (
    <div className={`flex items-center p-3 mx-2 my-1 rounded-lg cursor-pointer 
      ${active ? 'bg-indigo-600' : 'hover:bg-indigo-600'}`}
    >
      <span className="text-xl">{icon}</span>
      {sidebarOpen && (
        <span className="ml-3">{text}</span>
      )}
    </div>
  );
};

export default Layout;