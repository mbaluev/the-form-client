import React from 'react';
import Link from 'next/link';
import { classNames } from '@utils/classNames';
import { IBlockUserDTO } from 'controller/model/entities/block';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import {
  getProgress,
  ModuleProgress,
} from '@ui/pages/school/module/index/moduleProgress';
import './index.scss';
import { IconMaterial } from '@ui/components/icons/iconMaterial';
import { IconTask } from '@ui/components/icons/iconTask';
import { IconQuestion } from '@ui/components/icons/iconQuestion';
import { titleMaterial } from '@ui/components/icons/titleMaterial';
import { titleTask } from '@ui/components/icons/titleTask';
import { titleQuestion } from '@ui/components/icons/titleQuestion';
import { StatusBlock } from '@ui/components/statuses/statusBlock';

interface IModuleBlockProps {
  userBlock: IBlockUserDTO;
}

const ModuleBlockContent = (props: IModuleBlockProps) => {
  const { userBlock } = props;
  const progress = getProgress([
    Boolean(userBlock.completeMaterials),
    Boolean(userBlock.completeQuestions),
    Boolean(userBlock.completeTasks),
  ]);

  const clsLi = classNames('module-block__li');
  const clsLiMaterials = classNames(clsLi, {});
  const clsLiQuestions = classNames(clsLi, {});
  const clsLiTasks = classNames(clsLi, {});

  return (
    <React.Fragment>
      <div className="module-block__title">
        {userBlock.block?.title}
        <StatusBlock userBlock={userBlock} />
      </div>
      <div className="module-block__name">{userBlock.block?.name}</div>
      <ul className="module-block__ul">
        <li className={clsLiMaterials}>
          <IconMaterial userBlock={userBlock} />
          <div className="module-block__li-label">
            {titleMaterial(userBlock)}
          </div>
        </li>
        <li className={clsLiTasks}>
          <IconTask userBlock={userBlock} />
          <div className="module-block__li-label">{titleTask(userBlock)}</div>
        </li>
        <li className={clsLiQuestions}>
          <IconQuestion userBlock={userBlock} />
          <div className="module-block__li-label">
            {titleQuestion(userBlock)}
          </div>
        </li>
      </ul>
      <ModuleProgress value={progress} />
    </React.Fragment>
  );
};

export const ModuleBlock = (props: IModuleBlockProps) => {
  const { userBlock } = props;
  const cls = classNames('module-block', 'card', {
    card_complete: userBlock.complete,
    card_disable: !userBlock.enable,
  });

  if (!userBlock.enable) {
    return (
      <div className={cls}>
        <ModuleBlockContent {...props} />
      </div>
    );
  }

  return (
    <Link
      passHref
      href={{
        pathname: ROUTER_CONST_SCHOOL.SCHOOL_BLOCK.path,
        query: { id: userBlock.id },
      }}
    >
      <a className={cls}>
        <ModuleBlockContent {...props} />
      </a>
    </Link>
  );
};
