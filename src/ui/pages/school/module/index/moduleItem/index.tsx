import React from 'react';
import Link from 'next/link';
import { classNames } from '@utils/classNames';
import { IModuleUserDTO } from 'controller/model/entities/module';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { IconBlock } from '@ui/components/icon/iconBlock';
import { TagModule } from '@ui/components/tag/tagModule';
import {
  getProgress,
  ModuleProgress,
} from '@ui/pages/school/module/index/moduleProgress';
import './index.scss';

interface IModuleItemProps {
  userModule: IModuleUserDTO;
}

const ModuleItemContent = (props: IModuleItemProps) => {
  const { userModule } = props;
  const progressValues = userModule.userBlocks?.reduce(
    (prev: boolean[], curr) => {
      return prev.concat([
        Boolean(curr.completeMaterials),
        Boolean(curr.completeQuestions),
        Boolean(curr.completeTasks),
      ]);
    },
    []
  );
  const progress = getProgress(progressValues);
  return (
    <React.Fragment>
      <TagModule userModule={userModule} />
      <div className="module-item__header">
        <div className="module-item__name">{userModule.module?.name}</div>
        <div className="module-item__title">{userModule.module?.title}</div>
      </div>
      <div className="module-item__content">
        <ul className="module-item__ul">
          {userModule.userBlocks?.map((userBlock, index) => {
            const clsLi = classNames('module-item__li', {
              'module-item__li_complete': userBlock.complete,
            });
            return (
              <li key={index} className={clsLi}>
                <div className="module-item__li-icon">
                  <IconBlock userBlock={userBlock} />
                </div>
                <div className="module-item__li-label">
                  {userBlock.block?.name}
                </div>
              </li>
            );
          })}
        </ul>
        <ModuleProgress value={progress} width="100%" />
      </div>
    </React.Fragment>
  );
};

export const ModuleItem = (props: IModuleItemProps) => {
  const { userModule } = props;

  const cls = classNames('module-item', 'card', {
    card_complete: Boolean(userModule.complete),
    card_disable: !Boolean(userModule.enable),
  });

  if (!userModule.enable) {
    return (
      <div className={cls}>
        <ModuleItemContent {...props} />
      </div>
    );
  }

  return (
    <Link
      passHref
      href={{
        pathname: ROUTER_CONST_SCHOOL.SCHOOL_MODULE.path,
        query: { id: userModule.id },
      }}
    >
      <a className={cls}>
        <ModuleItemContent {...props} />
      </a>
    </Link>
  );
};
