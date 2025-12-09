import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  BoltIcon,
  CpuChipIcon,
  CheckIcon,
  ArrowRightIcon,
  LightBulbIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'

const solutions = [
  {
    name: 'Analytique People',
    description: 'Transformez les données RH brutes en insights exploitables avec des analyses avancées et des recommandations alimentées par l\'IA.',
    icon: ChartBarIcon,
    features: [
      'Analytique de personnel en temps réel',
      'Modélisation prédictive du turnover',
      'Analyse des tendances de performance',
      'Création de tableaux de bord personnalisés'
    ],
    benefits: [
      'Parfait pour: Technologie, Finance, Santé'
    ]
  },
  {
    name: 'Gestion de Performance',
    description: 'Rationalisez les évaluations de performance avec des outils d\'évaluation complets et des systèmes de feedback continu.',
    icon: TrophyIcon,
    features: [
      'Feedback à 360 degrés',
      'Définition et suivi d\'objectifs',
      'Calibrage des performances',
      'Planification du développement'
    ],
    benefits: [
      'Parfait pour: Manufacturing, Retail, Services Professionnels'
    ]
  },
  {
    name: 'Suivi Objectifs & OKRs',
    description: 'Alignez votre organisation avec une définition d\'objectifs transparente et un suivi de progrès en temps réel.',
    icon: BoltIcon,
    features: [
      'OKRs à l\'échelle de l\'entreprise',
      'Gestion d\'objectifs individuels',
      'Visualisation des progrès',
      'Analytique des réalisations'
    ],
    benefits: [
      'Parfait pour: Startups, Entreprise, Non-profit'
    ]
  },
  {
    name: 'Engagement Employés',
    description: 'Mesurez et améliorez la satisfaction des employés avec des enquêtes pulse et des analyses d\'engagement.',
    icon: LightBulbIcon,
    features: [
      'Enquêtes d\'engagement',
      'Analyse de sentiment',
      'Prédictions de rétention',
      'Insights culturels'
    ],
    benefits: [
      'Parfait pour: Équipes Distantes, Travail Hybride, Bureau Traditionnel'
    ]
  },
  {
    name: 'Planification Talents & Acquisition',
    description: 'Rationalisez le recrutement avec un matching de candidats alimenté par l\'IA et une planification stratégique de la main-d\'œuvre.',
    icon: UserGroupIcon,
    features: [
      'Filtrage de candidats alimenté par l\'IA',
      'Gestion du pipeline de talents',
      'Analyse des écarts de compétences',
      'Analytique de recrutement',
      'Matrice 9-Box des Talents'
    ],
    benefits: [
      'Parfait pour: Technologie, Consulting, Entreprises en croissance rapide'
    ]
  },
  {
    name: 'Apprentissage & Développement',
    description: 'Responsabilisez votre personnel avec des parcours d\'apprentissage personnalisés et des programmes complets de développement de compétences.',
    icon: CpuChipIcon,
    features: [
      'Parcours d\'apprentissage personnalisés',
      'Évaluation et suivi des compétences',
      'Gestion de cours',
      'Suivi des certifications'
    ],
    benefits: [
      'Parfait pour: Corporate, Éducation, Services Professionnels'
    ]
  }
]

const sectorSolutions = [
  {
    name: 'Entreprise',
    size: '500+ employés',
    description: 'Mettez à l\'échelle les opérations RH sur des milliers d\'employés avec une sécurité et une conformité de niveau entreprise.',
    features: [
      'Intégration SSO',
      'Sécurité Avancée',
      'Workflows Personnalisés',
      'Support Dédié'
    ]
  },
  {
    name: 'Services Professionnels',
    size: '50-500 employés',
    description: 'Optimisez les heures facturables et les relations client avec des analyses RH spécialisées pour les entreprises de services.',
    features: [
      'Analytique Projets',
      'Satisfaction Client',
      'Suivi d\'Utilisation',
      'Gestion Compétences'
    ]
  },
  {
    name: 'Éducation',
    size: 'Toute taille',
    description: 'Gérez les performances du corps professoral et du personnel avec des solutions adaptées aux institutions éducatives.',
    features: [
      'Calendriers Académiques',
      'Suivi Titularisation',
      'Analytique Recherche',
      'Feedback Étudiants'
    ]
  },
  {
    name: 'Santé',
    size: '100+ employés',
    description: 'Assurez la conformité et optimisez la planification du personnel avec des outils RH spécifiques à la santé.',
    features: [
      'Suivi Conformité',
      'Gestion Équipes',
      'Suivi Certifications',
      'Analytique Sécurité'
    ]
  }
]

export default function SolutionsPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Solutions pour Chaque{' '}
              <span className="text-primary-600">Défi RH</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Découvrez comment Targetym AI peut transformer votre gestion du personnel avec des solutions adaptées à votre secteur d'activité et à la taille de votre entreprise.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/auth/signup">
                  Essayer gratuitement
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">
                  Demander une démo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Solutions RH Complètes
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Tout ce dont vous avez besoin pour gérer, analyser et optimiser votre personnel
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {solutions.map((solution) => (
            <div key={solution.name} className="relative bg-white p-8 rounded-2xl shadow-lg ring-1 ring-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-x-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600">
                  <solution.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{solution.name}</h3>
              </div>

              <p className="text-gray-600 mb-6">{solution.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Fonctionnalités clés</h4>
                  <ul className="space-y-2">
                    {solution.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-x-2 text-sm text-gray-600">
                        <CheckIcon className="h-4 w-4 text-primary-600 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Bénéfices mesurés</h4>
                  <ul className="space-y-2">
                    {solution.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-x-2 text-sm text-gray-600">
                        <TrophyIcon className="h-4 w-4 text-success-600 mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button variant="outline" className="w-full group">
                  En savoir plus
                  <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Solutions Spécifiques par Secteur */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Solutions Spécifiques par Secteur
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Fonctionnalités et workflows adaptés conçus pour les besoins uniques de votre secteur
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {sectorSolutions.map((sector) => (
              <div key={sector.name} className="bg-white p-8 rounded-2xl shadow-lg ring-1 ring-gray-200">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{sector.name}</h3>
                    <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700">
                      {sector.size}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{sector.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {sector.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-x-2">
                        <CheckIcon className="h-4 w-4 text-primary-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <Button variant="outline" className="w-full">
                    En savoir plus sur {sector.name}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Intégrations Transparentes */}
      <div className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Intégrations Transparentes
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Connectez-vous avec vos outils et workflows existants. Targetym AI s'intègre avec plus de 50 plateformes populaires.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6 items-center justify-items-center opacity-60">
            {/* Logos simulés des principales intégrations */}
            {['Slack', 'Teams', 'Workday', 'BambooHR', 'Greenhouse', 'Jira'].map((tool) => (
              <div
                key={tool}
                className="h-12 w-24 bg-gray-200 rounded-lg flex items-center justify-center"
              >
                <span className="text-xs text-gray-600 font-medium">{tool}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link href="/integrations">
                Voir Toutes les Intégrations
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Prêt à commencer ? */}
      <div className="bg-primary-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Prêt à commencer ?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100">
              Rejoignez des centaines d'entreprises qui utilisent déjà Targetym AI Analytics
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
                  Contacter les Ventes
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
