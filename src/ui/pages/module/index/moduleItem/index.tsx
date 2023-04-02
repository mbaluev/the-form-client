import React from 'react';
import Link from 'next/link';
import { classNames } from '@utils/classNames';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { IModuleUserDTO } from '@model/module';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { ModuleItemStatus } from '@ui/pages/module/index/moduleItemStatus';
import {
  getProgress,
  ModuleProgress,
} from '@ui/pages/module/index/moduleProgress';
import './index.scss';

interface IModuleItemProps {
  module: IModuleUserDTO;
}

const ModuleItemContent = (props: IModuleItemProps) => {
  const { module } = props;
  const progressValues = module.blocks?.reduce((prev: boolean[], curr) => {
    return prev.concat([
      Boolean(curr.completeMaterials),
      Boolean(curr.completeQuestions),
      Boolean(curr.completeTasks),
    ]);
  }, []);
  const progress = getProgress(progressValues);
  return (
    <React.Fragment>
      <div className="module-item__title">
        {module.title}
        <ModuleItemStatus module={module} />
      </div>
      <div className="module-item__name">{module.name}</div>
      <ul className="module-item__ul">
        {module.blocks?.map((block, index) => {
          const clsLi = classNames('module-item__li', {
            'module-item__li_complete': block.complete,
          });
          return (
            <li key={index} className={clsLi}>
              <div className="module-item__li-icon">
                {block.complete ? (
                  <CheckCircleIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </div>
              <div className="module-item__li-label">{block.name}</div>
            </li>
          );
        })}
      </ul>
      <ModuleProgress value={progress} />
    </React.Fragment>
  );
};

export const ModuleItem = (props: IModuleItemProps) => {
  const { module } = props;

  const cls = classNames('module-item', 'card', {
    card_complete: Boolean(module.complete),
    card_disable: !Boolean(module.enable),
  });

  if (!module.enable) {
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
        pathname: ROUTER_CONST_SCHOOL.MODULE.path,
        query: { id: module.id },
      }}
    >
      <a className={cls}>
        <ModuleItemContent {...props} />
      </a>
    </Link>
  );
};
