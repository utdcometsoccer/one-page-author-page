import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorContainer from '../src/ErrorContainer';

describe('ErrorContainer', () => {
  it('renders the error title and message', () => {
    render(<ErrorContainer title="Test Error" message="Something went wrong." />);
    expect(screen.getByText('Test Error')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });
});
