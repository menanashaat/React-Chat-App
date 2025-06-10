
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 p-6 sm:p-8 bg-white rounded-xl shadow">
        {children}
      </div>
    </div>
  );
}

