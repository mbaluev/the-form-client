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
  const clsLiMaterials = classNames(clsLi, {
    'module-block__li_complete': userBlock.completeMaterials,
  });
  const clsLiQuestions = classNames(clsLi, {
    'module-block__li_complete': Boolean(userBlock.completeQuestions),
  });
  const clsLiTasks = classNames(clsLi, {
    'module-block__li_complete': userBlock.completeTasks,
  });

  return (
    <React.Fragment>
      <div className="module-block__title">
        {userBlock.block?.title}
        <ModuleBlockStatus userModuleBlock={userBlock} />
      </div>
      <div className="module-block__name">{userBlock.block?.name}</div>
      <ul className="module-block__ul">
        <li className={clsLiMaterials}>
          <div className="module-block__li-icon">
            {!userBlock.enable && <DoDisturbAltOutlinedIcon />}
            {userBlock.enable && userBlock.completeMaterials && (
              <CheckCircleIcon />
            )}
            {userBlock.enable && !userBlock.completeMaterials && (
              <RadioButtonUncheckedIcon />
            )}
          </div>
          <div className="module-block__li-label">Materials</div>
        </li>
        <li className={clsLiTasks}>
          <div className="module-block__li-icon">
            {!userBlock.enable && <DoDisturbAltOutlinedIcon />}
            {userBlock.enable && userBlock.completeTasks && <CheckCircleIcon />}
            {userBlock.enable && !userBlock.completeTasks && (
              <RadioButtonUncheckedIcon />
            )}
          </div>
          <div className="module-block__li-label">Homework</div>
        </li>
        <li className={clsLiQuestions}>
          <div className="module-block__li-icon">
            {!userBlock.enable && <DoDisturbAltOutlinedIcon />}
            {userBlock.enable && userBlock.completeQuestions && (
              <CheckCircleIcon />
            )}
            {userBlock.enable && !userBlock.completeQuestions && (
              <RadioButtonUncheckedIcon />
            )}
          </div>
          <div className="module-block__li-label">Test</div>
          {userBlock.errorQuestions && (
            <Tooltip title="Test failed">
              <InfoOutlinedIcon className="color_red" />
            </Tooltip>
          )}
          {userBlock.commentQuestions && (
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
