import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Rejoignez <span className="text-blue-600">Targetym AI</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Créez votre compte et transformez vos RH avec l'IA
          </p>
        </div>
        
        <div className="mt-8">
          <SignUp 
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-2xl border-0 rounded-xl"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
