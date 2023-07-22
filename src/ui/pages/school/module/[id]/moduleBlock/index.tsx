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
import { IconMaterials } from '@ui/components/icons/iconMaterials';
import { IconTasks } from '@ui/components/icons/iconTasks';
import { IconQuestions } from '@ui/components/icons/iconQuestions';
import { titleMaterials } from '@ui/components/icons/titleMaterials';
import { titleTasks } from '@ui/components/icons/titleTasks';
import { titleQuestions } from '@ui/components/icons/titleQuestions';
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
          <IconMaterials userBlock={userBlock} />
          <div className="module-block__li-label">
            {titleMaterials(userBlock)}
          </div>
        </li>
        <li className={clsLiTasks}>
          <IconTasks userBlock={userBlock} />
          <div className="module-block__li-label">{titleTasks(userBlock)}</div>
        </li>
        <li className={clsLiQuestions}>
          <IconQuestions userBlock={userBlock} />
          <div className="module-block__li-label">
            {titleQuestions(userBlock)}
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
