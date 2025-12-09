import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  TrophyIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Total Employés',
    value: '247',
    change: '+12',
    changeType: 'increase',
    icon: UserGroupIcon,
  },
  {
    name: 'Taux de Satisfaction',
    value: '94%',
    change: '+3%',
    changeType: 'increase',
    icon: TrophyIcon,
  },
  {
    name: 'Objectifs Atteints',
    value: '87%',
    change: '+8%',
    changeType: 'increase',
    icon: ChartBarIcon,
  },
  {
    name: 'Alertes Actives',
    value: '3',
    change: '-2',
    changeType: 'decrease',
    icon: ExclamationTriangleIcon,
  },
];

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header du dashboard */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Bonjour, {user.firstName} ! 👋
                </h1>
                <p className="mt-2 text-gray-600">
                  Voici un aperçu de vos analytics RH
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  ✨ Nouveautés disponibles
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques principales */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600 truncate">
                    {stat.name}
                  </p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                    <p className={`ml-2 text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sections principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Analytics récents */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                📊 Analytics Récents
              </h3>
              <p className="text-sm text-gray-600">
                Insights générés cette semaine
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  {
                    title: "Augmentation de l'engagement",
                    description: "L'engagement des employés a augmenté de 12% ce mois-ci",
                    time: "Il y a 2 heures",
                    type: "positive"
                  },
                  {
                    title: "Nouveau talent identifié", 
                    description: "3 employés montrent un potentiel de leadership élevé",
                    time: "Hier",
                    type: "info"
                  },
                  {
                    title: "Alerte turnover",
                    description: "Risque de départ détecté dans l'équipe Marketing",
                    time: "Il y a 3 jours",
                    type: "warning"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`h-2 w-2 mt-2 rounded-full ${
                      item.type === 'positive' ? 'bg-green-400' :
                      item.type === 'info' ? 'bg-blue-400' : 'bg-yellow-400'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {item.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                ⚡ Actions Rapides
              </h3>
              <p className="text-sm text-gray-600">
                Outils fréquemment utilisés
              </p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Générer Rapport", icon: "📊", color: "blue" },
                  { name: "Évaluer Équipe", icon: "👥", color: "green" },
                  { name: "Planifier 1:1", icon: "📅", color: "purple" },
                  { name: "Analyser KPIs", icon: "🎯", color: "orange" }
                ].map((action) => (
                  <button
                    key={action.name}
                    className={`p-4 rounded-lg border-2 border-gray-200 hover:border-${action.color}-300 hover:bg-${action.color}-50 transition-colors text-left`}
                  >
                    <div className="text-2xl mb-2">{action.icon}</div>
                    <div className="text-sm font-medium text-gray-900">
                      {action.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bonne pratiques */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start space-x-4">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-xl">💡</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Conseil de la semaine
              </h3>
              <p className="text-blue-800 mb-4">
                Planifiez des entretiens individuels réguliers pour maintenir l'engagement de vos équipes. 
                Les données montrent que les managers qui font des 1:1 hebdomadaires ont des équipes 30% plus performantes.
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                📖 En savoir plus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
