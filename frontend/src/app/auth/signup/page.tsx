'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    company: '',
    password: '',
    confirm_password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validate passwords match
    if (formData.password !== formData.confirm_password) {
      setError('Les mots de passe ne correspondent pas')
      setIsLoading(false)
      return
    }

    // Validate password length (bcrypt limit)
    if (formData.password.length > 72) {
      setError('Le mot de passe ne peut pas dépasser 72 caractères')
      setIsLoading(false)
      return
    }

    try {
      await register(formData)
      router.push('/auth/login')
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'inscription')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-primary-600">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Créez votre compte
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{' '}
            <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
              connectez-vous à votre compte existant
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-800">{error}</div>
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="sr-only">
                  Prénom
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
                  placeholder="Prénom"
                />
              </div>
              
              <div>
                <label htmlFor="last_name" className="sr-only">
                  Nom
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
                  placeholder="Nom"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
                placeholder="Adresse email"
              />
            </div>

            <div>
              <label htmlFor="company" className="sr-only">
                Entreprise
              </label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                value={formData.company}
                onChange={handleInputChange}
                className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
                placeholder="Entreprise (optionnel)"
              />
            </div>
            
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                maxLength={72}
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full rounded-lg border-0 py-3 px-4 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
                placeholder="Mot de passe (max 72 caractères)"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                )}
              </button>
            </div>

            <div className="relative">
              <label htmlFor="confirm_password" className="sr-only">
                Confirmer le mot de passe
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                maxLength={72}
                value={formData.confirm_password}
                onChange={handleInputChange}
                className="block w-full rounded-lg border-0 py-3 px-4 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
                placeholder="Confirmer le mot de passe"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              required
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
              J'accepte les{' '}
              <Link href="/terms" className="text-primary-600 hover:text-primary-500">
                conditions d'utilisation
              </Link>{' '}
              et la{' '}
              <Link href="/privacy" className="text-primary-600 hover:text-primary-500">
                politique de confidentialité
              </Link>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-lg bg-primary-600 py-3 px-4 text-sm font-semibold text-white hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Inscription...' : 'Créer mon compte'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Déjà un compte ?{' '}
              <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
                Connectez-vous
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}