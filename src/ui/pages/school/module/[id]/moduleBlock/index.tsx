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
import { IconMaterials } from '@ui/components/icon/iconMaterials';
import { IconTasks } from '@ui/components/icon/iconTasks';
import { IconQuestions } from '@ui/components/icon/iconQuestions';
import { statusMaterials } from '@ui/components/status/statusMaterials';
import { statusTasks } from '@ui/components/status/statusTasks';
import { statusQuestions } from '@ui/components/status/statusQuestions';
import { TagBlock } from '@ui/components/tag/tagBlock';

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
        <TagBlock userBlock={userBlock} />
      </div>
      <div className="module-block__name">{userBlock.block?.name}</div>
      <ul className="module-block__ul">
        <li className={clsLiMaterials}>
          <IconMaterials userBlock={userBlock} />
          <div className="module-block__li-label">
            {statusMaterials(userBlock)}
          </div>
        </li>
        <li className={clsLiTasks}>
          <IconTasks userBlock={userBlock} />
          <div className="module-block__li-label">{statusTasks(userBlock)}</div>
        </li>
        <li className={clsLiQuestions}>
          <IconQuestions userBlock={userBlock} />
          <div className="module-block__li-label">
            {statusQuestions(userBlock)}
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
