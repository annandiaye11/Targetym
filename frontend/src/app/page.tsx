import Link from 'next/link'
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  BoltIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  CheckIcon 
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Analytique Avancée',
    description: 'Obtenez des insights approfondis sur votre personnel avec des analyses alimentées par l\'IA et des tableaux de bord en temps réel.',
    icon: ChartBarIcon,
  },
  {
    name: 'Gestion des Employés',
    description: 'Rationalisez les processus RH avec des profils d\'employés complets et un suivi des performances.',
    icon: UserGroupIcon,
  },
  {
    name: 'Objectifs & OKRs',
    description: 'Alignez vos équipes avec les objectifs de l\'entreprise grâce à la définition et au suivi d\'objectifs structurés.',
    icon: BoltIcon,
  },
  {
    name: 'Évaluations de Performance',
    description: 'Menez des évaluations de performance équitables et complètes avec des retours à 360 degrés.',
    icon: CheckIcon,
  },
  {
    name: 'Sécurité Entreprise',
    description: 'Sécurité de niveau bancaire avec conformité SOC 2 et protection avancée des données.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Insights IA',
    description: 'Exploitez l\'apprentissage automatique pour prédire les tendances et optimiser les décisions RH.',
    icon: CpuChipIcon,
  },
]

const testimonials = [
  {
    content: "Targetym AI a transformé notre façon de gérer notre équipe. Les insights sont incroyables et la plateforme est si intuitive.",
    author: "Sarah Johnson",
    position: "Directrice RH at TechCorp Inc."
  },
  {
    content: "L'analytique alimentée par l'IA nous a aidé à réduire le turnover de 40% en seulement 6 mois. Plateforme révolutionnaire.",
    author: "Mike Chen",
    position: "PDG at StartupX"
  },
  {
    content: "Enfin une plateforme RH qui comprend vraiment nos besoins. Le ROI a été phénoménal.",
    author: "Emily Davis",
    position: "Directrice du Personnel at Enterprise Solutions"
  }
]

const stats = [
  { name: '500+ Entreprises Nous Font Confiance', value: '500+' },
  { name: '50k+ Employés Gérés', value: '50k+' },
  { name: '99.9% Garantie de Disponibilité', value: '99.9%' },
  { name: '24/7 Support Disponible', value: '24/7' },
]

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-200 to-primary-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              ✨ Maintenant avec Analytique IA{' '}
              <Link href="/solutions" className="font-semibold text-primary-600">
                <span className="absolute inset-0" aria-hidden="true" />
                En savoir plus <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Transformez vos RH avec{' '}
              <span className="text-primary-600">l'Analytique People</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Libérez la puissance des décisions RH basées sur les données. Targetym AI fournit des insights complets, un suivi des performances et des recommandations alimentées par l'IA pour optimiser votre personnel.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link 
                href="/auth/signup"
                className="rounded-lg bg-primary-600 px-8 py-3 text-sm font-semibold text-white shadow hover:bg-primary-700 transition-colors"
              >
                Commencer l'Essai Gratuit
              </Link>
              <Link 
                href="/solutions"
                className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-sm font-semibold text-gray-900 shadow hover:bg-gray-50 transition-colors"
              >
                Voir les Solutions <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Features section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">
              Tout ce dont vous avez besoin pour exceller
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Plateforme d'analytique RH complète conçue pour les entreprises modernes
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col bg-white p-8 rounded-2xl shadow-sm ring-1 ring-gray-200">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-lg font-semibold leading-8 tracking-tight text-primary-600">Témoignages</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Approuvé par les entreprises leaders
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Rejoignez des centaines d'entreprises qui transforment déjà leurs RH
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <figure key={index} className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-900/5">
                <blockquote className="text-gray-900">
                  <p>"{testimonial.content}"</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white font-bold">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-gray-600">{testimonial.position}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-primary-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Prêt à transformer vos RH ?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100">
              Commencez votre essai gratuit dès aujourd'hui. Aucune carte de crédit requise.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link 
                href="/auth/signup"
                className="rounded-lg bg-white px-8 py-3 text-sm font-semibold text-primary-600 shadow hover:bg-gray-50 transition-colors"
              >
                Commencer l'Essai Gratuit
              </Link>
              <Link 
                href="/pricing"
                className="rounded-lg border border-white bg-transparent px-8 py-3 text-sm font-semibold text-white shadow hover:bg-white hover:text-primary-600 transition-colors"
              >
                Voir la Tarification <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
