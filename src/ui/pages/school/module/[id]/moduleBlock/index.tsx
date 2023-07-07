import React from 'react';
import Link from 'next/link';
import { classNames } from '@utils/classNames';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { IBlockUserDTO } from 'controller/model/entities/block';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { ModuleBlockStatus } from '@ui/pages/school/module/[id]/moduleBlockStatus';
import {
  getProgress,
  ModuleProgress,
} from '@ui/pages/school/module/index/moduleProgress';
import './index.scss';
import DoDisturbAltOutlinedIcon from '@mui/icons-material/DoDisturbAltOutlined';
import { Tooltip } from '@components/tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';

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
    'module-block__li_complete': Boolean(block.completeQuestions),
  });
  const clsLiTasks = classNames(clsLi, {
    'module-block__li_complete': block.completeTasks,
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
            {!block.enable && <DoDisturbAltOutlinedIcon />}
            {block.enable && block.completeMaterials && <CheckCircleIcon />}
            {block.enable && !block.completeMaterials && (
              <RadioButtonUncheckedIcon />
            )}
          </div>
          <div className="module-block__li-label">Materials</div>
        </li>
        <li className={clsLiTasks}>
          <div className="module-block__li-icon">
            {!block.enable && <DoDisturbAltOutlinedIcon />}
            {block.enable && block.completeTasks && <CheckCircleIcon />}
            {block.enable && !block.completeTasks && (
              <RadioButtonUncheckedIcon />
            )}
          </div>
          <div className="module-block__li-label">Homework</div>
        </li>
        <li className={clsLiQuestions}>
          <div className="module-block__li-icon">
            {!block.enable && <DoDisturbAltOutlinedIcon />}
            {block.enable && block.completeQuestions && <CheckCircleIcon />}
            {block.enable && !block.completeQuestions && (
              <RadioButtonUncheckedIcon />
            )}
          </div>
          <div className="module-block__li-label">Test</div>
          {block.errorQuestions && (
            <Tooltip title="Test failed">
              <InfoOutlinedIcon className="color_red" />
            </Tooltip>
          )}
          {block.commentQuestions && (
            <Tooltip title="Has a comments">
              <MarkChatUnreadOutlinedIcon className="color_red" />
            </Tooltip>
          )}
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
        pathname: ROUTER_CONST_SCHOOL.SCHOOL_BLOCK.path,
        query: { id: block.id },
      }}
    >
      <a className={cls}>
        <ModuleBlockContent {...props} />
      </a>
    </Link>
  );
};
