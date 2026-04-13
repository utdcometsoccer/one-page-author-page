import { useState } from 'react'

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<Error | null>(null)

  if (error) {
    return (
      <div style={{ color: 'red', padding: '2rem', textAlign: 'center' }}>
        <h2>Something went wrong.</h2>
        <pre>{error.message}</pre>
      </div>
    )
  }

  return (
    <ErrorCatcher onError={setError}>
      {children}
    </ErrorCatcher>
  )
}

// Helper component to catch errors in render phase
function ErrorCatcher({ onError, children }: { onError: (e: Error) => void, children: React.ReactNode }) {
  try {
    return children
  } catch (e) {
    onError(e as Error)
    return null
  }
}

export default ErrorBoundary
