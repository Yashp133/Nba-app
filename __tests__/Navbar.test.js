import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../components/navbar';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Navbar', () => {
  it('renders NBA logo text', () => {
    render(<Navbar />);
    expect(screen.getByText('N')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('shows login/register when not logged in', () => {
    render(<Navbar />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });
});
