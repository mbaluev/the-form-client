import { StatusPage } from '@ui/errors/statusPage';
import { Component } from 'react';
import { Button } from '@theme/button';

export class ErrorBoundary extends Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log({ error, errorInfo });
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (this.state.hasError) {
      return (
        <StatusPage
          status="error"
          message="Oops, there is an error!"
          buttons={[
            <Button variant="outlined" onClick={() => this.setState({ hasError: false })}>
              Try again
            </Button>,
          ]}
        />
      );
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.props.children;
  }
}
