'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const publicNavigation = [
  { name: 'Solutions', href: '/solutions' },
  { name: 'Tarification', href: '/pricing' },
  { name: 'Cas d\'Usage', href: '/case-studies' },
]

const authenticatedNavigation = [
  { name: 'Dashboard', href: '/dashboard' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuth()
  
  // Choisir la navigation selon l'état d'authentification
  const navigation = isAuthenticated ? authenticatedNavigation : publicNavigation

  return (
    <header className="bg-white shadow-sm border-b relative z-50">
      {/* Special announcement banner */}
      <div className="bg-primary-600 px-4 py-2 text-center">
        <p className="text-sm text-white">
          <span className="font-medium">✨ Maintenant avec Analytique IA</span>
        </p>
      </div>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-primary-500 py-6 lg:border-none">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white font-bold">
                T
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">Targetym AI</span>
                <span className="text-xs text-primary-600 font-medium">HR Analytics</span>
              </div>
            </Link>
          </div>

          <div className="ml-10 hidden space-x-8 lg:block">
            {navigation.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-base font-medium transition-colors",
                  pathname === link.href
                    ? "text-primary-600"
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="ml-6 flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.first_name} {user?.last_name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-medium text-sm">
                      {user?.first_name?.[0]}{user?.last_name?.[0]}
                    </span>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Connexion
                </Link>
                <Link 
                  href="/auth/signup"
                  className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
                >
                  Essai Gratuit
                </Link>
              </>
            )}
          </div>

          <div className="ml-6 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="Ouvrir le menu"
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 py-4 lg:hidden">
          {navigation.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-base font-medium transition-colors",
                pathname === link.href
                  ? "text-primary-600"
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50">
            <div 
              className="fixed inset-0 bg-black bg-opacity-25" 
              onClick={() => setMobileMenuOpen(false)} 
              onKeyDown={(e) => e.key === 'Escape' && setMobileMenuOpen(false)}
              role="button"
              tabIndex={0}
              aria-label="Fermer le menu"
            />
            <div className="fixed top-0 right-0 w-full max-w-sm bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white font-bold">
                    T
                  </div>
                  <span className="text-lg font-bold text-gray-900">Targetym AI</span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
                  aria-label="Fermer le menu"
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 space-y-4">
                {navigation.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-base font-medium text-gray-900 hover:text-primary-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <hr className="my-4" />
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-medium">
                          {user?.first_name?.[0]}{user?.last_name?.[0]}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {user?.first_name} {user?.last_name}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout()
                        setMobileMenuOpen(false)
                      }}
                      className="block w-full text-left text-base font-medium text-red-600 hover:text-red-500 p-2"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="block text-base font-medium text-gray-500 hover:text-gray-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Connexion
                    </Link>
                    <Link 
                      href="/auth/signup"
                      className="block w-full rounded-lg bg-primary-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Essai Gratuit
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
