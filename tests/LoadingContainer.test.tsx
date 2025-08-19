import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingContainer from '../src/LoadingContainer';

describe('LoadingContainer', () => {
  it('renders the CircularProgress with default label', () => {
    render(<LoadingContainer />);
    expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
  });
  it('renders the CircularProgress with custom label', () => {
    render(<LoadingContainer label="Please wait" />);
    expect(screen.getByLabelText('Please wait')).toBeInTheDocument();
  });
});
