import React, { useEffect, useState } from 'react';
import { RouterEvent, useRouter } from 'next/router';
import { DialogUnsaved } from 'ui/dialogs/common/dialogUnsaved';

interface IPromptProps {
  onCancel?: () => Promise<void>;
  onDiscard?: () => Promise<void>;
  onSave?: () => Promise<void>;
  disabled?: boolean;
}

export const useUnsavedChanges = (hasChanges: boolean) => {
  const router = useRouter();
  const [{ nextRoute, confirmed }, setNextRoute] = useState<{
    nextRoute: RouterEvent | null;
    confirmed: boolean;
  }>({
    nextRoute: null,
    confirmed: false,
  });

  const toNextRoute = () => setNextRoute({ nextRoute, confirmed: true });
  const stayHere = () => setNextRoute({ nextRoute: null, confirmed: false });
  const reset = () => setNextRoute({ nextRoute: null, confirmed: false });

  const onWindowClose = (e: BeforeUnloadEvent) => {
    if (!hasChanges) return;
    e.preventDefault();
    e.returnValue = 'You have unsaved message.';
    return e;
  };
  const onRouteChangeStart = (route: RouterEvent) => {
    if (!hasChanges) return undefined;
    setNextRoute({ nextRoute: route, confirmed: false });
    router.events.emit('routeChangeError');
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw 'routeChange aborted.';
  };

  const cleanUpFunction = () => {
    window.removeEventListener('beforeunload', onWindowClose);
    router.events.off('routeChangeStart', onRouteChangeStart);
  };

  useEffect(() => {
    if (nextRoute && confirmed) {
      router.push(nextRoute);
      return cleanUpFunction;
    }
    window.addEventListener('beforeunload', onWindowClose);
    router.events.on('routeChangeStart', onRouteChangeStart);
    return cleanUpFunction;
  }, [nextRoute, confirmed, hasChanges]);

  useEffect(() => reset(), [router.asPath]);

  const Prompt = (props: IPromptProps) => {
    const { onCancel, onDiscard, onSave, disabled } = props;
    return (
      <DialogUnsaved
        isOpen={Boolean(nextRoute)}
        onCancel={async () => {
          if (onCancel) await onCancel();
          stayHere();
        }}
        onSave={async () => {
          if (onSave) await onSave();
          toNextRoute();
        }}
        onDiscard={async () => {
          if (onDiscard) await onDiscard();
          toNextRoute();
        }}
        disabled={disabled}
      />
    );
  };

  return { Prompt };
};
