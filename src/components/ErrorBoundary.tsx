import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundaryClass extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

const ErrorFallback: React.FC<{ error?: Error }> = ({ error }) => {
  const { language } = useLanguage();

  const content = {
    title: {
      da: 'Noget gik galt',
      en: 'Something went wrong'
    },
    message: {
      da: 'Vi beklager, men der opstod en fejl. Prøv at genindlæse siden.',
      en: 'We apologize, but an error occurred. Please try refreshing the page.'
    },
    button: {
      da: 'Genindlæs side',
      en: 'Refresh Page'
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {content.title[language]}
        </h1>
        <p className="text-gray-600 mb-6">
          {content.message[language]}
        </p>
        {error && process.env.NODE_ENV === 'development' && (
          <pre className="text-left text-sm text-red-500 bg-red-50 p-4 rounded mb-6 overflow-auto">
            {error.message}
          </pre>
        )}
        <button
          onClick={() => window.location.reload()}
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          {content.button[language]}
        </button>
      </div>
    </div>
  );
};

export const ErrorBoundary = ErrorBoundaryClass; 