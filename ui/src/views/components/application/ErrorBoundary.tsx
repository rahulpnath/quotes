import React from 'react';

interface IErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<{}, IErrorBoundaryState> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Rendering failed below Error Boundary: ', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>:(</h1>
          <p>Unfortunately something went wrong. Please contact your system administrator."</p>
        </div>
      );
    }

    return this.props.children;
  }
}
