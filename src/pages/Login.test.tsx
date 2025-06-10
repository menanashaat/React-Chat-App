import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../auth/AuthContext';
import Login from '../pages/Login';

// Helper to wrap component in context

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <AuthProvider>
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        {ui}
      </BrowserRouter>
    </AuthProvider>
  );
};

describe('Login Page', () => {
  it('renders input fields and sign-in button', () => {
    renderWithProviders(<Login />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows error on invalid credentials', async () => {
    renderWithProviders(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'wrong@user.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'wrongpass' }
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() =>
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument()
    );
  });

  it('navigates on successful login', async () => {
    renderWithProviders(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@chat.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: '123456' }
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() =>
      expect(screen.queryByText(/invalid email or password/i)).not.toBeInTheDocument()
    );
  });
});
