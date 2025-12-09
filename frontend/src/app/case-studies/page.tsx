import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  BuildingOfficeIcon,
  HeartIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  TrophyIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

const impactStats = [
  {
    value: '85%',
    description: 'Augmentation Moyenne de l\'Engagement Employé'
  },
  {
    value: '4,2M€',
    description: 'Économies Annuelles Moyennes par Client'
  },
  {
    value: '60%',
    description: 'Réduction du Temps Administratif RH'
  },
  {
    value: '3,2x',
    description: 'Amélioration de l\'Efficacité des Évaluations'
  }
]

const caseStudies = [
  {
    company: 'TechCorp Inc.',
    industry: 'Technology',
    employees: '500+ employees',
    icon: BuildingOfficeIcon,
    challenge: 'Turnover élevé des employés et manque de visibilité sur les performances dans les équipes distribuées.',
    solution: 'Mise en place de Targetym AI pour suivre les métriques d\'engagement, prédire les risques de départ et optimiser les processus de gestion des performances.',
    tags: ['Rétention des Employés', 'Gestion de Performance', 'Analytique Prédictive'],
    results: [
      { metric: '40%', description: 'Réduction du turnover des employés' },
      { metric: '65%', description: 'Augmentation du taux d\'achèvement des évaluations' },
      { metric: '2,5M€', description: 'Économies annuelles grâce à l\'amélioration de la rétention' }
    ],
    testimonial: {
      quote: 'Targetym AI nous a aidés à identifier les employés à risque avant qu\'ils ne partent. Les insights prédictifs changent la donne.',
      author: 'Sarah Johnson',
      title: 'Directrice des Ressources Humaines'
    }
  },
  {
    company: 'Healthcare Partners',
    industry: 'Healthcare',
    employees: '1,200+ employees',
    icon: HeartIcon,
    challenge: 'Exigences de conformité complexes et gestion des performances sur plusieurs équipes et sites.',
    solution: 'Déploiement d\'un suivi complet des performances avec surveillance de la conformité et tableaux de bord analytiques en temps réel.',
    tags: ['Santé', 'Conformité', 'Opérations'],
    results: [
      { metric: '100%', description: 'Taux de réussite des audits de conformité' },
      { metric: '30%', description: 'Amélioration de l\'efficacité de planification du personnel' },
      { metric: '45%', description: 'Réduction des frais administratifs généraux' }
    ],
    testimonial: {
      quote: 'Le suivi de conformité seul nous a fait économiser d\'innombrables heures et éliminé le stress des audits. Le ROI est incroyable.',
      author: 'Dr. Michael Chen',
      title: 'Directeur des Opérations'
    }
  },
  {
    company: 'Global Consulting',
    industry: 'Professional Services',
    employees: '300+ employees',
    icon: BriefcaseIcon,
    challenge: 'Suivi des heures facturables, optimisation des équipes projet et amélioration des scores de satisfaction client.',
    solution: 'Intégration de l\'analytique projet avec les données RH pour optimiser l\'allocation des ressources et suivre les métriques de performance.',
    tags: ['Services Professionnels', 'Optimisation des Ressources', 'Satisfaction Client'],
    results: [
      { metric: '25%', description: 'Augmentation de l\'utilisation des heures facturables' },
      { metric: '90%', description: 'Amélioration du score de satisfaction client' },
      { metric: '1,8M€', description: 'Revenus annuels supplémentaires grâce à l\'optimisation' }
    ],
    testimonial: {
      quote: 'Nous pouvons maintenant associer instantanément le bon talent au bon projet. Nos clients remarquent la différence.',
      author: 'Emily Davis',
      title: 'Associée Directrice'
    }
  },
  {
    company: 'EduTech University',
    industry: 'Education',
    employees: '800+ employees',
    icon: AcademicCapIcon,
    challenge: 'Gestion des évaluations du corps professoral, suivi de la productivité de recherche et efficacité administrative.',
    solution: 'Plateforme analytique personnalisée pour les environnements académiques avec rapports spécialisés et suivi d\'objectifs.',
    tags: ['Éducation', 'Gestion du Corps Professoral', 'Analytique de Recherche'],
    results: [
      { metric: '95%', description: 'Taux d\'achèvement des évaluations du corps professoral' },
      { metric: '50%', description: 'Augmentation de la collaboration en recherche' },
      { metric: '35%', description: 'Réduction du temps de traitement administratif' }
    ],
    testimonial: {
      quote: 'Targetym AI comprend les besoins uniques du monde académique. Le corps professoral adore le processus d\'évaluation simplifié.',
      author: 'Prof. Lisa Wang',
      title: 'Provost et Vice-Présidente'
    }
  }
]

const quickWins = [
  {
    metric: '45%',
    title: 'Réduction du Turnover',
    description: 'Une entreprise manufacturière a utilisé l\'analytique prédictive pour identifier les risques de départ et mettre en place des stratégies de rétention ciblées.',
    icon: UserGroupIcon
  },
  {
    metric: '90%',
    title: 'Engagement des Employés',
    description: 'Une startup tech a atteint des scores d\'engagement leaders de l\'industrie grâce au feedback continu et à l\'alignement des objectifs.',
    icon: TrophyIcon
  },
  {
    metric: 'Prix',
    title: 'Best Places to Work',
    description: 'Une entreprise de services professionnels a remporté un prix régional après avoir mis en place un programme complet d\'analytique people.',
    icon: TrophyIcon
  },
  {
    metric: '300%',
    title: 'ROI en Première Année',
    description: 'Un client entreprise a atteint 300% de retour sur investissement grâce à l\'amélioration de la rétention et des gains de productivité.',
    icon: ChartBarIcon
  }
]

const successSteps = [
  {
    step: '1',
    title: 'Découverte & Planification',
    description: 'Nous analysons votre état actuel et définissons les métriques de succès'
  },
  {
    step: '2',
    title: 'Implémentation',
    description: 'Déploiement rapide avec perturbation minimale de vos opérations'
  },
  {
    step: '3',
    title: 'Formation & Adoption',
    description: 'Formation complète pour s\'assurer que votre équipe maximise la valeur'
  },
  {
    step: '4',
    title: 'Succès Continu',
    description: 'Optimisation continue et support pour des résultats durables'
  }
]

export default function CaseStudiesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Résultats Réels d'{' '}
              <span className="text-primary-600">Entreprises Réelles</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Découvrez comment les organisations de tous secteurs transforment leurs opérations RH et obtiennent des résultats mesurables avec Targetym AI.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/auth/signup">
                  Commencer Votre Histoire de Succès
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Proven Impact Stats */}
      <div className="bg-primary-600 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Impact Prouvé dans Tous les Secteurs
            </h2>
            <p className="mt-6 text-lg leading-8 text-primary-100">
              Nos clients obtiennent systématiquement des améliorations remarquables des métriques RH clés
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-primary-100">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Success Stories */}
      <div className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Histoires de Succès Clients
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Découvrez comment des entreprises comme la vôtre réalisent leur transformation avec Targetym AI
            </p>
          </div>

          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg ring-1 ring-gray-200 p-8 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left side - Company info and challenge */}
                  <div>
                    <div className="flex items-center gap-x-4 mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600">
                        <study.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{study.company}</h3>
                        <div className="flex items-center gap-x-2 text-sm text-gray-600">
                          <span>{study.industry}</span>
                          <span>•</span>
                          <span>{study.employees}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Défi :</h4>
                      <p className="text-gray-600">{study.challenge}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Solution :</h4>
                      <p className="text-gray-600">{study.solution}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Tags :</h4>
                      <div className="flex flex-wrap gap-2">
                        {study.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right side - Results and testimonial */}
                  <div>
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-gray-900 mb-4">Résultats :</h4>
                      <div className="space-y-4">
                        {study.results.map((result, resultIndex) => (
                          <div key={resultIndex} className="flex items-center gap-x-3">
                            <div className="text-2xl font-bold text-primary-600">{result.metric}</div>
                            <div className="text-sm text-gray-600">{result.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <blockquote className="text-gray-900 italic mb-4">
                        "{study.testimonial.quote}"
                      </blockquote>
                      <div className="text-sm">
                        <div className="font-semibold text-gray-900">{study.testimonial.author}</div>
                        <div className="text-gray-600">{study.testimonial.title}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* More Success Stories */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Plus d'Histoires de Succès
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Victoires rapides et transformations à long terme à travers notre base de clients
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-4">
            {quickWins.map((win, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-x-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                    <win.icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="text-2xl font-bold text-primary-600">{win.metric}</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{win.title}</h3>
                <p className="text-sm text-gray-600">{win.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Your Success Journey */}
      <div className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Votre Parcours de Succès
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Notre méthodologie éprouvée vous assure d'obtenir des résultats rapidement et durablement
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {successSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-primary-600 text-white font-bold text-lg">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Prêt à rejoindre nos histoires de succès ?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100">
              Commencez votre transformation aujourd'hui et découvrez pourquoi les entreprises leaders choisissent Targetym AI
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-50"
                asChild
              >
                <Link href="/auth/signup">
                  Commencer l'Essai Gratuit
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-600"
                asChild
              >
                <Link href="/contact">
                  Planifier une Démo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
