'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton, useUser } from '@clerk/nextjs'
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'

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
  const { isSignedIn, user } = useUser()
  
  // Navigation selon l'état d'authentification
  const navigation = isSignedIn ? authenticatedNavigation : publicNavigation

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Bannière d'annonce */}
      <div className="bg-blue-600 px-4 py-2 text-center">
        <p className="text-sm text-white">
          <span className="font-medium">✨ Nouvelle authentification avec Clerk</span>
        </p>
      </div>

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
                T
              </div>
              <span className="text-xl font-bold text-gray-900">
                Targetym <span className="text-blue-600">AI</span>
              </span>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-base font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center space-x-4">
            {/* Utilisateur connecté */}
            <SignedIn>
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.emailAddresses[0]?.emailAddress}
                  </p>
                </div>
                <Link 
                  href="/profile"
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <UserCircleIcon className="h-5 w-5" />
                  <span className="hidden sm:inline">Mon Profil</span>
                </Link>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                      userButtonPopoverCard: "shadow-xl border-0 mt-2",
                      userButtonPopoverActionButton: "hover:bg-blue-50"
                    }
                  }}
                />
              </div>
            </SignedIn>

            {/* Utilisateur non connecté */}
            <SignedOut>
              <div className="flex items-center space-x-3">
                <SignInButton forceRedirectUrl="/dashboard">
                  <button className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors">
                    Connexion
                  </button>
                </SignInButton>
                <SignUpButton forceRedirectUrl="/dashboard">
                  <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm">
                    Inscription
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>

            {/* Bouton menu mobile */}
            <div className="lg:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Ouvrir le menu</span>
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    pathname === item.href
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Actions mobile pour utilisateurs non connectés */}
              <SignedOut>
                <div className="pt-3 border-t border-gray-200">
                  <SignInButton forceRedirectUrl="/dashboard">
                    <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md">
                      Connexion
                    </button>
                  </SignInButton>
                  <SignUpButton forceRedirectUrl="/dashboard">
                    <button className="mt-2 block w-full text-left px-3 py-2 text-base font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Inscription
                    </button>
                  </SignUpButton>
                </div>
              </SignedOut>

              {/* Profil mobile pour utilisateurs connectés */}
              <SignedIn>
                <div className="pt-3 border-t border-gray-200">
                  <Link
                    href="/profile"
                    className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <UserCircleIcon className="h-5 w-5" />
                    <span>Mon Profil</span>
                  </Link>
                </div>
              </SignedIn>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
