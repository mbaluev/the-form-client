import { ErrorIcon } from '@ui/layout/page/errorIcon';
import { Component } from 'react';
import { Button } from '@mui/material';

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
        <ErrorIcon
          status="error"
          title="Error"
          message="Oops, there is an error!"
          buttons={
            <Button variant="contained" onClick={() => this.setState({ hasError: false })}>
              Try again
            </Button>
          }
        />
      );
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.props.children;
  }
}
