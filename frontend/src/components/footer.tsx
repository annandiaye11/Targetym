import Link from 'next/link'

const navigation = {
  produit: [
    { name: 'Solutions', href: '/solutions' },
    { name: 'Tarification', href: '/pricing' },
    { name: 'Cas d\'Usage', href: '/case-studies' },
  ],
  entreprise: [
    { name: 'À Propos', href: '/about' },
    { name: 'Carrières', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  support: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Centre d\'Aide', href: '/help' },
    { name: 'Panneau Admin', href: '/admin' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-white">Targetym AI</h3>
              <p className="text-sm text-gray-400 mt-1">HR Analytics</p>
            </div>
            <p className="text-sm leading-6 text-gray-300 max-w-xs">
              Transformez vos RH avec l'analytique people alimentée par l'IA.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Produit</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.produit.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Entreprise</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.entreprise.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-700 pt-8">
          <p className="text-xs leading-5 text-gray-400">
            © 2024 Targetym AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
