import { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { IBlockUserViewModel } from '@viewModel/modules/entities/block/user/interface';
import { IModuleUserViewModel } from '@viewModel/modules/entities/module/user/interface';
import { IMaterialUserViewModel } from '@viewModel/modules/entities/material/user/interface';
import { ITaskUserViewModel } from '@viewModel/modules/entities/task/user/interface';
import { IQuestionUserViewModel } from '@viewModel/modules/entities/question/user/interface';
import { BlockPage } from '@ui/pages/school/block/[id]/blockPage';
import { useRouter } from 'next/router';

const Block = () => {
  const { getDataByBlockId: getModule, clearData: clearModule } =
    useViewModel<IModuleUserViewModel>(VIEW_MODEL.ModuleUser);
  const { getData: getBlock, clearData: clearBlock } =
    useViewModel<IBlockUserViewModel>(VIEW_MODEL.BlockUser);

  const { clearData: clearMaterial } = useViewModel<IMaterialUserViewModel>(
    VIEW_MODEL.MaterialUser
  );
  const { clearData: clearTask } = useViewModel<ITaskUserViewModel>(
    VIEW_MODEL.TaskUser
  );
  const { clearData: clearQuestion } = useViewModel<IQuestionUserViewModel>(
    VIEW_MODEL.QuestionUser
  );

  const router = useRouter();
  const id = router.query?.id as string;

  useEffect(() => {
    if (id) {
      getModule(id);
      getBlock(id);
    }
    return () => {
      clearModule();
      clearBlock();
      clearMaterial();
      clearTask();
      clearQuestion();
    };
  }, [id]);

  return <BlockPage />;
};

Block.Layout = MasterSchool;
export default observer(Block);
