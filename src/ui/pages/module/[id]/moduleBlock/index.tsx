import React from 'react';
import Link from 'next/link';
import { classNames } from '@utils/classNames';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { IBlockUserDTO } from '@model/block';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { ModuleBlockStatus } from '@ui/pages/module/[id]/moduleBlockStatus';
import {
  getProgress,
  ModuleProgress,
} from '@ui/pages/module/index/moduleProgress';
import './index.scss';

interface IModuleBlockProps {
  block: IBlockUserDTO;
}

const ModuleBlockContent = (props: IModuleBlockProps) => {
  const { block } = props;
  const progress = getProgress([
    Boolean(block.completeMaterials),
    Boolean(block.completeQuestions),
    Boolean(block.completeTasks),
  ]);

  const clsLi = classNames('module-block__li');
  const clsLiMaterials = classNames(clsLi, {
    'module-block__li_complete': block.completeMaterials,
  });
  const clsLiQuestions = classNames(clsLi, {
    'module-block__li_complete': block.completeMaterials,
  });
  const clsLiTasks = classNames(clsLi, {
    'module-block__li_complete': block.completeMaterials,
  });

  return (
    <React.Fragment>
      <div className="module-block__title">
        {block.title}
        <ModuleBlockStatus block={block} />
      </div>
      <div className="module-block__name">{block.name}</div>
      <ul className="module-block__ul">
        <li className={clsLiMaterials}>
          <div className="module-block__li-icon">
            {block.completeMaterials ? (
              <CheckBoxIcon />
            ) : (
              <CheckBoxOutlineBlankIcon />
            )}
          </div>
          <div className="module-block__li-label">Materials downloaded</div>
        </li>
        <li className={clsLiQuestions}>
          <div className="module-block__li-icon">
            {block.completeQuestions ? (
              <CheckBoxIcon />
            ) : (
              <CheckBoxOutlineBlankIcon />
            )}
          </div>
          <div className="module-block__li-label">Test passed</div>
        </li>
        <li className={clsLiTasks}>
          <div className="module-block__li-icon">
            {block.completeTasks ? (
              <CheckBoxIcon />
            ) : (
              <CheckBoxOutlineBlankIcon />
            )}
          </div>
          <div className="module-block__li-label">Homework done</div>
        </li>
      </ul>
      <ModuleProgress value={progress} />
    </React.Fragment>
  );
};

export const ModuleBlock = (props: IModuleBlockProps) => {
  const { block } = props;
  const cls = classNames('module-block', 'card', {
    card_complete: block.complete,
    card_disable: !block.enable,
  });

  if (!block.enable) {
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
        pathname: ROUTER_CONST_SCHOOL.BLOCK.path,
        query: { id: block.id },
      }}
    >
      <a className={cls}>
        <ModuleBlockContent {...props} />
      </a>
    </Link>
  );
};
