"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to console in development, to service in production
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    } else {
      // In production, send to error logging service
      // Example: logErrorToService(error, errorInfo);
      console.error("Production error:", error.message);
    }
  }

  render() {
    if (this.state.hasError) {
      const isDev = process.env.NODE_ENV === "development";
      return (
        <div className="text-center text-red-600 p-4" role="alert">
          <h2>Something went wrong.</h2>
          {isDev && (
            <details className="mt-2">
              <summary>Error details</summary>
              <pre className="text-sm">{this.state.error?.message}</pre>
            </details>
          )}
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            aria-label="Retry loading the application"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
