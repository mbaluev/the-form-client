import React from 'react';
import { classNames } from '@utils/classNames';
import { IBlockUserDTO } from '@model/entities/block';
import { IconMaterial } from '@ui/components/icons/iconMaterial';
import { IconTask } from '@ui/components/icons/iconTask';
import { IconQuestion } from '@ui/components/icons/iconQuestion';
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
      {label === 'Materials' && <IconMaterial userBlock={userBlock} />}
      {label === 'Homework' && <IconTask userBlock={userBlock} />}
      {label === 'Test' && <IconQuestion userBlock={userBlock} />}
      <div className="block-tabs-label__label">{label}</div>
    </div>
  );
};
