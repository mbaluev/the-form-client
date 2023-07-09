import React from 'react';
import Link from 'next/link';
import { classNames } from '@utils/classNames';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { IModuleUserDTO } from 'controller/model/entities/module';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { ModuleItemStatus } from '@ui/pages/school/module/index/moduleItemStatus';
import DoDisturbAltOutlinedIcon from '@mui/icons-material/DoDisturbAltOutlined';
import {
  getProgress,
  ModuleProgress,
} from '@ui/pages/school/module/index/moduleProgress';
import './index.scss';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Tooltip } from '@components/tooltip';
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';

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
      <div className="module-item__title">
        {userModule.module?.title}
        <ModuleItemStatus userModule={userModule} />
      </div>
      <div className="module-item__name">{userModule.module?.name}</div>
      <ul className="module-item__ul">
        {userModule.userBlocks?.map((userBlock, index) => {
          const clsLi = classNames('module-item__li', {
            'module-item__li_complete': userBlock.complete,
          });
          return (
            <li key={index} className={clsLi}>
              <div className="module-item__li-icon">
                {userBlock.complete && <CheckCircleIcon />}
                {!userBlock.complete && userBlock.enable && (
                  <RadioButtonUncheckedIcon />
                )}
                {!userBlock.complete && !userBlock.enable && (
                  <DoDisturbAltOutlinedIcon />
                )}
              </div>
              <div className="module-item__li-label">
                {userBlock.block?.name}
              </div>
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
          );
        })}
      </ul>
      <ModuleProgress value={progress} />
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
