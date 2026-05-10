import React from 'react';

const TutorialContainer: React.FC = () => (
  <div className="main-container tutorial-container">
    <header className="tutorial-header">
      <h1>Welcome to One Page Author Page</h1>
      <p className="tutorial-intro">
        This system creates a beautiful, responsive author page from a simple JSON data file.
        Follow the steps below to get started.
      </p>
    </header>

    <section className="tutorial-section" aria-label="Setup instructions">
      <h2>Getting Started</h2>

      <ol className="tutorial-steps">
        <li className="tutorial-step">
          <h3>1. Create your author data file</h3>
          <p>
            Create a JSON file named <code>author-data.json</code> with your author information.
            Place it at:
          </p>
          <pre className="tutorial-code">
            <code>public/com/&#123;your-domain&#125;/en/us/author-data.json</code>
          </pre>
          <p>Use this template as a starting point:</p>
          <pre className="tutorial-code">
            <code>{`{
  "name": "Your Name",
  "welcome": "Welcome to my author page!",
  "aboutMe": "A brief description about yourself.",
  "headshot": "/authorphotos/your-headshot.webp",
  "copyright": "© 2025 Your Name. All rights reserved.",
  "email": "you@example.com",
  "social": [
    { "name": "LinkedIn", "url": "https://linkedin.com/in/yourprofile" }
  ],
  "books": [
    {
      "title": "Your Book Title",
      "description": "A short description of your book.",
      "url": "https://amazon.com/your-book",
      "cover": "/covers/your-book.webp"
    }
  ],
  "articles": [
    {
      "title": "Your Article Title",
      "url": "https://example.com/your-article",
      "publication": "Publication Name",
      "date": "2025-01-01"
    }
  ]
}`}</code>
          </pre>
        </li>

        <li className="tutorial-step">
          <h3>2. Configure environment variables</h3>
          <p>
            Create or update your <code>.env</code> file in the project root with the
            following variables:
          </p>
          <pre className="tutorial-code">
            <code>{`VITE_LOCAL_AUTHOR_DATA_BASE=
VITE_LOCAL_AUTHOR_DATA_FILE_EXTENSION=/author-data.json
VITE_LOCAL_LANG=en
VITE_LOCAL_REGION=us
VITE_LOCAL_HOST=localhost`}</code>
          </pre>
        </li>

        <li className="tutorial-step">
          <h3>3. Add your assets</h3>
          <p>
            Place your headshot image in <code>public/authorphotos/</code> and book cover
            images in <code>public/covers/</code>. Recommended formats are WebP or AVIF for
            best performance.
          </p>
        </li>

        <li className="tutorial-step">
          <h3>4. Start the development server</h3>
          <p>Run the following command to start the local development server:</p>
          <pre className="tutorial-code">
            <code>npm run dev</code>
          </pre>
          <p>
            Your author page will reload automatically once valid author data is detected.
          </p>
        </li>
      </ol>
    </section>

    <section className="tutorial-section" aria-label="Additional resources">
      <h2>Additional Resources</h2>
      <ul className="tutorial-links">
        <li>
          <a
            href="https://github.com/utdcometsoccer/one-page-author-page#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="tutorial-link"
          >
            Full documentation on GitHub
          </a>
        </li>
        <li>
          <a
            href="https://github.com/utdcometsoccer/one-page-author-page/blob/main/docs/DESIGN-SYSTEM.md"
            target="_blank"
            rel="noopener noreferrer"
            className="tutorial-link"
          >
            Design system reference
          </a>
        </li>
        <li>
          <a
            href="https://github.com/utdcometsoccer/one-page-author-page/blob/main/docs/DEPLOYMENT.md"
            target="_blank"
            rel="noopener noreferrer"
            className="tutorial-link"
          >
            Deployment guide
          </a>
        </li>
      </ul>
    </section>
  </div>
);

export default TutorialContainer;
