'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CheckIcon } from '@heroicons/react/20/solid'

const tiers = [
  {
    name: 'Démarrage',
    id: 'tier-demarrage',
    href: '/auth/signup?plan=demarrage',
    monthlyPrice: 24,
    yearlyPrice: 22, // 264€/12 = 22€/mois
    yearlyTotal: 264,
    monthlySavings: 0,
    yearlySavings: 60,
    employees: 'Jusqu\'à 50 employés',
    description: 'Parfait pour les petites équipes qui commencent avec l\'analytique RH',
    features: [
      'Analytique people de base',
      'Annuaire des employés',
      'Suivi des performances',
      'Définition d\'objectifs',
      'Support par email',
      'Intégrations standards'
    ],
    mostPopular: false,
  },
  {
    name: 'Professionnel',
    id: 'tier-professionnel',
    href: '/auth/signup?plan=professionnel',
    monthlyPrice: 65,
    yearlyPrice: 51, // 612€/12 = 51€/mois
    yearlyTotal: 612,
    monthlySavings: 0,
    yearlySavings: 168,
    employees: 'Jusqu\'à 250 employés',
    description: 'Fonctionnalités avancées pour les entreprises en croissance',
    features: [
      'Analytique et insights avancés',
      'Feedback à 360 degrés',
      'Évaluations de performance',
      'Gestion des OKRs',
      'Analytique d\'équipe',
      'Rapports personnalisés',
      'Accès API',
      'Support prioritaire',
      'Intégrations avancées'
    ],
    mostPopular: true,
  },
  {
    name: 'Entreprise',
    id: 'tier-entreprise',
    href: '/contact?plan=entreprise',
    monthlyPrice: 125,
    yearlyPrice: 101, // 1212€/12 = 101€/mois
    yearlyTotal: 1212,
    monthlySavings: 0,
    yearlySavings: 288,
    employees: 'Jusqu\'à 1 000 employés',
    description: 'Solution complète pour les grandes organisations',
    features: [
      'Insights alimentés par l\'IA',
      'Analytique prédictive',
      'Sécurité avancée (SSO, SAML)',
      'Workflows personnalisés',
      'Rapports illimités',
      'Options marque blanche',
      'Success manager dédié',
      'Support téléphonique 24/7',
      'Intégrations personnalisées'
    ],
    mostPopular: false,
  },
  {
    name: 'Entreprise Plus',
    id: 'tier-entreprise-plus',
    href: '/contact?plan=entreprise-plus',
    monthlyPrice: null,
    yearlyPrice: null,
    yearlyTotal: null,
    monthlySavings: null,
    yearlySavings: null,
    employees: '1 000+ employés',
    description: 'Solution sur mesure pour les grandes entreprises',
    features: [
      'Tout dans Entreprise',
      'Modèles IA personnalisés',
      'Outils de conformité avancés',
      'Architecture multi-tenant',
      'Développement personnalisé',
      'Déploiement sur site',
      'Reporting exécutif',
      'Infrastructure dédiée'
    ],
    mostPopular: false,
  },
]

const faqs = [
  {
    question: 'Puis-je changer mon plan à tout moment ?',
    answer: 'Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement pour les upgrades, ou au prochain cycle de facturation pour les downgrades.',
  },
  {
    question: 'Y a-t-il un essai gratuit ?',
    answer: 'Oui, nous offrons un essai gratuit de 14 jours pour tous les plans payants. Aucune carte de crédit n\'est requise pour commencer votre essai.',
  },
  {
    question: 'Que se passe-t-il si je dépasse ma limite d\'employés ?',
    answer: 'Nous vous notifierons lorsque vous approchez de votre limite. Vous pouvez upgrader votre plan ou nous ajusterons automatiquement votre facturation selon l\'usage.',
  },
  {
    question: 'Offrez-vous une tarification personnalisée pour les grandes organisations ?',
    answer: 'Oui, nous offrons une tarification et des fonctionnalités personnalisées pour les organisations de 1 000+ employés. Contactez notre équipe commerciale pour un devis personnalisé.',
  },
  {
    question: 'Quelles intégrations sont incluses ?',
    answer: 'Tous les plans incluent les intégrations standards avec des outils populaires comme Slack, Teams et Google Workspace. Les intégrations avancées et personnalisées sont disponibles dans les niveaux supérieurs.',
  },
  {
    question: 'Mes données sont-elles sécurisées ?',
    answer: 'Absolument. Nous utilisons une sécurité de niveau bancaire avec conformité SOC 2 Type II, chiffrement de bout en bout et audits de sécurité réguliers.',
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState('monthly')

  const getPriceDisplay = (tier: typeof tiers[0]) => {
    if (tier.monthlyPrice === null) return 'Sur Mesure'
    
    if (billingPeriod === 'annual') {
      return `${tier.yearlyPrice}€`
    } else {
      return `${tier.monthlyPrice}€`
    }
  }

  const getSavingsDisplay = (tier: typeof tiers[0]) => {
    if (billingPeriod === 'annual' && tier.yearlySavings) {
      return `Économisez ${tier.yearlySavings}€/an`
    }
    return null
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Tarification</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Simple, Transparente{' '}
            <span className="text-primary-600">Tarification</span>
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Choisissez le plan parfait pour votre organisation. Commencez avec un essai gratuit, évoluez selon votre croissance, et ne payez que ce dont vous avez besoin.
        </p>

        {/* Billing Period Toggle */}
        <div className="mt-10 flex justify-center">
          <div className="flex items-center bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingPeriod === 'annual'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annuel
              {' '}
              <span className="ml-1 text-green-600 text-xs font-semibold">
                Économisez jusqu'à 20%
              </span>
            </button>
          </div>
        </div>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4 gap-x-8">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? 'lg:z-10 lg:rounded-b-none border-primary-500' : 'border-gray-200',
                tierIdx === 0 ? 'lg:rounded-r-none' : '',
                tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : '',
                'flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 xl:p-10 relative'
              )}
            >
              {tier.mostPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Plus Populaire
                  </span>
                </div>
              )}
              
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className={classNames(
                    tier.mostPopular ? 'text-primary-600' : 'text-gray-900',
                    'text-lg font-semibold leading-8'
                  )}>
                    {tier.name}
                  </h3>
                </div>
                
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {tier.description}
                </p>
                
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {getPriceDisplay(tier)}
                  </span>
                  {tier.monthlyPrice !== null && (
                    <span className="text-sm font-semibold leading-6 text-gray-600">
                      /mois
                    </span>
                  )}
                </p>
                
                {getSavingsDisplay(tier) && (
                  <p className="mt-2 text-sm text-green-600 font-medium">
                    {getSavingsDisplay(tier)}
                  </p>
                )}
                
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {tier.employees}
                </p>
                
                <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-primary-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link
                href={tier.href}
                className={`mt-8 w-full rounded-lg px-4 py-3 text-center text-sm font-semibold transition-colors ${
                  tier.mostPopular 
                    ? 'bg-primary-600 text-white hover:bg-primary-700' 
                    : 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tier.name === 'Entreprise' || tier.name === 'Entreprise Plus' ? 'Contacter les Ventes' : 'Commencer l\'Essai Gratuit'}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mx-auto mt-24 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900 text-center mb-10">
              Questions fréquentes
            </h2>
            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
              {faqs.map((faq) => (
                <div key={faq.question} className="pt-6">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mx-auto mt-24 max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Prêt à transformer vos RH ?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Rejoignez plus de 500 entreprises qui utilisent déjà Targetym AI pour optimiser leur personnel.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link 
              href="/auth/signup"
              className="rounded-lg bg-primary-600 px-8 py-3 text-sm font-semibold text-white shadow hover:bg-primary-700 transition-colors"
            >
              Commencer l'essai gratuit
            </Link>
            <Link 
              href="/contact"
              className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-sm font-semibold text-gray-900 shadow hover:bg-gray-50 transition-colors"
            >
              Demander une démo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
