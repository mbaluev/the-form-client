import { PageContent } from '@ui/layout/page/pageContent';
import { SeparatorBase } from '@ui/layout/card/separator';
import { Title } from '@ui/pages/settings/block/index/title';
import { BlocksList } from '@ui/pages/settings/block/index/list';

export const PageBlocks = () => {
  return (
    <PageContent title={<Title />} separator={<SeparatorBase />}>
      <BlocksList />
    </PageContent>
  );
};
