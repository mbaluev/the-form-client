import React from 'react';
import Link from 'next/link';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { classNames } from '@utils/classNames';
import { Button } from '@components/button';
import IconTheFormCircle from '../../../../core/icons/theFormCircle';
import './index.scss';

export const IndexContent = () => {
  const cls = classNames('index-content');
  return (
    <div className={cls}>
      <IconTheFormCircle />
      <div className="index-content__name">
        <div className="index-content__title">The Form</div>
        <div className="index-content__description">School of analytics</div>
      </div>
      <Link href={ROUTER_CONST_SCHOOL.SCHOOL_MODULES.path} passHref>
        <Button>Go to modules</Button>
      </Link>
    </div>
  );
};
