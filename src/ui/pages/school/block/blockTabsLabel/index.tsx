import React from 'react';
import { classNames } from '@utils/classNames';
import { IBlockUserDTO } from '@model/entities/block';
import { IconMaterials } from '@ui/components/statuses/iconMaterials';
import { IconTasks } from '@ui/components/statuses/iconTasks';
import { IconQuestions } from '@ui/components/statuses/iconQuestions';
import './index.scss';

interface IModuleTabLabelProps {
  label?: string;
  userBlock?: IBlockUserDTO | null;
}

export const BlockTabsLabel = (props: IModuleTabLabelProps) => {
  const { label, userBlock } = props;
  const cls = classNames('block-tabs-label');
  return (
    <div className={cls}>
      {label === 'Materials' && <IconMaterials userBlock={userBlock} />}
      {label === 'Homework' && <IconTasks userBlock={userBlock} />}
      {label === 'Test' && <IconQuestions userBlock={userBlock} />}
      <div className="block-tabs-label__label">{label}</div>
    </div>
  );
};
