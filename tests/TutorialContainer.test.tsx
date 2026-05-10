import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TutorialContainer from '../src/TutorialContainer';

describe('TutorialContainer', () => {
  it('renders the welcome heading', () => {
    render(<TutorialContainer />);
    expect(screen.getByText('Welcome to One Page Author Page')).toBeInTheDocument();
  });

  it('renders the introductory paragraph', () => {
    render(<TutorialContainer />);
    expect(
      screen.getByText(/This system creates a beautiful, responsive author page/i)
    ).toBeInTheDocument();
  });

  it('renders the Getting Started section heading', () => {
    render(<TutorialContainer />);
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
  });

  it('renders all four setup steps', () => {
    render(<TutorialContainer />);
    expect(screen.getByText(/1\. Create your author data file/i)).toBeInTheDocument();
    expect(screen.getByText(/2\. Configure environment variables/i)).toBeInTheDocument();
    expect(screen.getByText(/3\. Add your assets/i)).toBeInTheDocument();
    expect(screen.getByText(/4\. Start the development server/i)).toBeInTheDocument();
  });

  it('renders the Additional Resources section', () => {
    render(<TutorialContainer />);
    expect(screen.getByText('Additional Resources')).toBeInTheDocument();
  });

  it('renders documentation links', () => {
    render(<TutorialContainer />);
    expect(screen.getByText('Full documentation on GitHub')).toBeInTheDocument();
    expect(screen.getByText('Design system reference')).toBeInTheDocument();
    expect(screen.getByText('Deployment guide')).toBeInTheDocument();
  });

  it('links open in a new tab with rel noopener noreferrer', () => {
    render(<TutorialContainer />);
    const links = screen.getAllByRole('link');
    for (const link of links) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });
});
