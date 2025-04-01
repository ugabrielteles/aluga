import { useEffect, useState } from 'react';
import { FiHome, FiCalendar, FiTool, FiUsers, FiSettings, FiBell, FiSearch, FiPlus } from 'react-icons/fi';

const Home = () => {

  useEffect(() => {
    console.log('sdfsdfsd')
  })
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dados simulados
  const stats = [
    { title: 'Equipamentos Disponíveis', value: '24', change: '+5%', trend: 'up' },
    { title: 'Equipamentos Alugados', value: '18', change: '+12%', trend: 'up' },
    { title: 'Clientes Ativos', value: '32', change: '+8%', trend: 'up' },
    { title: 'Devoluções Hoje', value: '5', change: '-2%', trend: 'down' },
  ];

  const recentRentals = [
    { id: 1, equipment: 'Betoneira', client: 'João Silva', start: '10/05/2023', end: '15/05/2023', status: 'active' },
    { id: 2, equipment: 'Andaime', client: 'Maria Souza', start: '08/05/2023', end: '20/05/2023', status: 'active' },
    { id: 3, equipment: 'Furadeira', client: 'Carlos Oliveira', start: '05/05/2023', end: '10/05/2023', status: 'completed' },
    { id: 4, equipment: 'Compactador', client: 'Ana Costa', start: '12/05/2023', end: '18/05/2023', status: 'active' },
  ];

  const equipmentList = [
    { id: 1, name: 'Betoneira', category: 'Concreto', status: 'available', lastMaintenance: '01/05/2023' },
    { id: 2, name: 'Andaime', category: 'Acesso', status: 'rented', lastMaintenance: '15/04/2023' },
    { id: 3, name: 'Furadeira', category: 'Elétricos', status: 'maintenance', lastMaintenance: '20/04/2023' },
    { id: 4, name: 'Compactador', category: 'Terraplanagem', status: 'available', lastMaintenance: '05/05/2023' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">    

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
       

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Visão Geral</h2>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center">
              {/* <FiPlus className="mr-2" /> */}
              Novo Aluguel
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Rentals */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-lg font-semibold mb-4">Aluguéis Recentes</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipamento</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Início</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Término</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentRentals.map((rental) => (
                    <tr key={rental.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{rental.equipment}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rental.client}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rental.start}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rental.end}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          rental.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {rental.status === 'active' ? 'Ativo' : 'Concluído'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Equipment Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Status dos Equipamentos</h3>
              <div className="space-y-4">
                {equipmentList.map((equip) => (
                  <div key={equip.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{equip.name}</p>
                      <p className="text-sm text-gray-500">{equip.category}</p>
                    </div>
                    <div className="flex items-center">
                      <span className={`h-3 w-3 rounded-full mr-2 ${
                        equip.status === 'available' ? 'bg-green-500' : 
                        equip.status === 'rented' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></span>
                      <span className="text-sm">
                        {equip.status === 'available' ? 'Disponível' : 
                         equip.status === 'rented' ? 'Alugado' : 'Manutenção'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Calendário de Aluguéis</h3>
              <div className="bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center">
                <p className="text-gray-500">Visualização do calendário aqui</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, text, active, onClick, sidebarOpen }: any) => {
  return (
    <div 
      className={`flex items-center p-3 mx-2 my-1 rounded-lg cursor-pointer 
        ${active ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        {icon}
        {sidebarOpen && (
          <span className="ml-3">{text}</span>
        )}
      </div>
    </div>
  );
};

export default Home;