'use client'

import { useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  TrophyIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline'

const stats = [
  {
    name: 'Total Employés',
    value: '247',
    change: '+12',
    changeType: 'increase',
    icon: UserGroupIcon,
  },
  {
    name: 'Performance Moyenne',
    value: '4.2/5',
    change: '+0.3',
    changeType: 'increase',
    icon: TrophyIcon,
  },
  {
    name: 'Engagement Score',
    value: '78%',
    change: '+5%',
    changeType: 'increase',
    icon: ChartBarIcon,
  },
  {
    name: 'Risques Identifiés',
    value: '3',
    change: '-2',
    changeType: 'decrease',
    icon: ExclamationTriangleIcon,
  },
]

const recentActivity = [
  {
    id: 1,
    type: 'employee_added',
    title: 'Nouvel employé ajouté',
    description: 'Sarah Martin a rejoint l\'équipe Marketing',
    time: 'il y a 2 heures',
  },
  {
    id: 2,
    type: 'evaluation_completed',
    title: 'Évaluation terminée',
    description: 'Évaluation trimestrielle de Pierre Dupont',
    time: 'il y a 4 heures',
  },
  {
    id: 3,
    type: 'goal_achieved',
    title: 'Objectif atteint',
    description: 'Équipe Dev a atteint 95% de ses OKRs',
    time: 'il y a 1 jour',
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-50">
      <div className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Bonjour, {user?.first_name} 👋
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Voici un aperçu de vos données RH aujourd'hui
              </p>
            </div>
            <div className="mt-4 flex md:ml-4 md:mt-0">
              <button className="ml-3 inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">
                Générer un rapport
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.name}
                  className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6"
                >
                  <div>
                    <div className="absolute rounded-md bg-primary-500 p-3">
                      <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
                  </div>
                  <div className="ml-16 flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <p
                      className={classNames(
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                        'ml-2 flex items-baseline text-sm font-semibold'
                      )}
                    >
                      {stat.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Two column layout */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Recent Activity */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Activité Récente
                </h3>
                <div className="flow-root">
                  <ul className="-my-5 divide-y divide-gray-200">
                    {recentActivity.map((activity) => (
                      <li key={activity.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">
                              {activity.title}
                            </p>
                            <p className="truncate text-sm text-gray-500">
                              {activity.description}
                            </p>
                          </div>
                          <div className="inline-flex items-center text-sm text-gray-500">
                            {activity.time}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Actions Rapides
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <button className="relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 hover:border-gray-400">
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <span className="block text-sm font-medium text-gray-900">
                          Ajouter un employé
                        </span>
                        <span className="mt-1 flex items-center text-sm text-gray-500">
                          Créer un nouveau profil employé
                        </span>
                      </span>
                    </span>
                  </button>
                  <button className="relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 hover:border-gray-400">
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <span className="block text-sm font-medium text-gray-900">
                          Créer une évaluation
                        </span>
                        <span className="mt-1 flex items-center text-sm text-gray-500">
                          Lancer un cycle d'évaluation
                        </span>
                      </span>
                    </span>
                  </button>
                  <button className="relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 hover:border-gray-400">
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <span className="block text-sm font-medium text-gray-900">
                          Analyser les tendances
                        </span>
                        <span className="mt-1 flex items-center text-sm text-gray-500">
                          Voir les insights IA
                        </span>
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  )
}
