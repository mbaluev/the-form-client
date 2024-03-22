import { PageContent } from '@ui/layout/page/pageContent';
import { Title } from '@ui/pages/settings/module/index/title';
import { SeparatorBase } from '@ui/layout/card/separator';
import { ModulesList } from '@ui/pages/settings/module/index/list';

export const PageModules = () => {
  return (
    <PageContent title={<Title />} separator={<SeparatorBase />}>
      <ModulesList />
    </PageContent>
  );
};
