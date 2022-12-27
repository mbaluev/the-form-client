import React from 'react';
import Link from 'next/link';
import { classNames } from '@utils/classNames';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { IBlockDTO } from '@model/block';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { ModuleBlockStatus } from '@ui/pages/module/[id]/moduleBlockStatus';
import {
  getProgress,
  ModuleProgress,
} from '@ui/pages/module/index/moduleProgress';
import './index.scss';

interface IModuleBlockProps {
  block: IBlockDTO;
}

const ModuleBlockContent = (props: IModuleBlockProps) => {
  const { block } = props;
  const progress = getProgress(block?.tabs.map((t) => t.complete));
  return (
    <React.Fragment>
      <div className="module-block__title">
        {block.title}
        <ModuleBlockStatus block={block} />
      </div>
      <div className="module-block__name">{block.name}</div>
      <ul className="module-block__ul">
        {block.tabs.map((tab, index) => {
          const clsLi = classNames('module-block__li', {
            'module-block__li_complete': tab.complete,
          });
          return (
            <li key={index} className={clsLi}>
              <div className="module-block__li-icon">
                {tab.complete ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
              </div>
              <div className="module-block__li-label">{tab.label}</div>
            </li>
          );
        })}
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
