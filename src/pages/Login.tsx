import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import ErrorMessage from '../components/ui/ErrorMessage';
import AuthLayout from '../components/layout/AuthLayout';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await auth.login(email, password);
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch {
      setError('Invalid email or password');
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>

      {error && <ErrorMessage message={error} />}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <InputField
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" isLoading={isLoading}>
          Sign in
        </Button>

        <div className="text-center text-sm text-gray-600">
          Use test@chat.com / 123456
        </div>
      </form>
    </AuthLayout>
  );
}
