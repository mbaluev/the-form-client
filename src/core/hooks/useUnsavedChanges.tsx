import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DialogUnsaved } from '@ui/dialogs/dialogUnsaved';

interface IPromptProps {
  onCancel?: () => Promise<void>;
  onDiscard?: () => Promise<void>;
  onSave?: () => Promise<void>;
}

export const useUnsavedChanges = (isDirty: boolean) => {
  const router = useRouter();
  const [{ nextRoute, confirmed }, setNextRoute] = useState({
    nextRoute: null,
    confirmed: false,
  });
  const [isLoadingCancel, setLoadingCancel] = useState<boolean>(false);
  const [isLoadingDiscard, setLoadingDiscard] = useState<boolean>(false);
  const [isLoadingSave, setLoadingSave] = useState<boolean>(false);

  const toNextRoute = () => setNextRoute({ nextRoute, confirmed: true });
  const stayHere = () => setNextRoute({ nextRoute: null, confirmed: false });
  const reset = () => setNextRoute({ nextRoute: null, confirmed: false });

  const onWindowClose = (e: BeforeUnloadEvent) => {
    if (!isDirty) return;
    e.preventDefault();
    e.returnValue = 'You have modified this page';
    return e;
  };
  const onRouteChangeStart = (route: any) => {
    if (!isDirty) return undefined;
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
      reset();
      cleanUpFunction();
      router.push(nextRoute).then(() => {});
    }
    window.addEventListener('beforeunload', onWindowClose);
    router.events.on('routeChangeStart', onRouteChangeStart);
    return cleanUpFunction;
  }, [nextRoute, confirmed, isDirty]);

  const Prompt = (props: IPromptProps) => {
    const { onCancel, onDiscard, onSave } = props;
    return (
      <Fragment>
        <DialogUnsaved
          open={Boolean(nextRoute)}
          isLoadingCancel={isLoadingCancel}
          isLoadingDiscard={isLoadingDiscard}
          isLoadingSave={isLoadingSave}
          onCancel={async () => {
            setLoadingCancel(true);
            try {
              if (onCancel) await onCancel();
            } finally {
              setLoadingCancel(false);
            }
            stayHere();
          }}
          onSave={async () => {
            setLoadingSave(true);
            try {
              if (onSave) await onSave();
              toNextRoute();
            } catch (_) {
              stayHere();
            } finally {
              setLoadingSave(false);
            }
          }}
          onDiscard={async () => {
            setLoadingDiscard(true);
            try {
              if (onDiscard) await onDiscard();
              toNextRoute();
            } catch (_) {
              stayHere();
            } finally {
              setLoadingDiscard(false);
            }
          }}
        />
      </Fragment>
    );
  };

  return { Prompt };
};
