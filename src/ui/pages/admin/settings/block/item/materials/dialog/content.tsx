/* eslint-disable sonarjs/no-duplicate-string */
import { observer } from 'mobx-react';
import { useUnsavedChanges } from '@hooks/useUnsavedChanges';
import { Fragment } from 'react';
import { TabSkeleton } from '@ui/layout/card/tabSkeleton';
import { useMaterialItemStore } from '@store/modules/entities/material/item/useMaterialItemStore';
import { Form } from '@ui/pages/admin/settings/block/item/materials/dialog/form';

export const Content = observer(() => {
  const { isModalLoading, hasModalChanges } = useMaterialItemStore();
  const { Prompt } = useUnsavedChanges(hasModalChanges);
  const saveHandler = async () => {
    console.log('saveHandler');
  };
  const discardHandler = async () => {
    console.log('discardHandler');
  };

  if (isModalLoading) {
    return <TabSkeleton />;
  }

  return (
    <Fragment>
      <Form />
      <Prompt onSave={saveHandler} onDiscard={discardHandler} />
    </Fragment>
  );
});
