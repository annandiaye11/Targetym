import { UserProfile } from '@clerk/nextjs'

export default function UserProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
          <p className="mt-2 text-gray-600">
            Gérez vos informations personnelles et vos préférences de compte.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <UserProfile
            routing="path"
            path="/profile"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-0",
                navbar: "hidden",
                navbarMobileMenuButton: "hidden",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
