import React from 'react';
import Link from 'next/link';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { classNames } from '@utils/classNames';
import { IconLogo } from '@ui/icons';
import { Button } from '@components/button';
import './index.scss';

export const IndexContent = () => {
  const cls = classNames('index-content');
  return (
    <div className={cls}>
      <IconLogo />
      <div className="index-content__name">
        <div className="index-content__title">The Form</div>
        <div className="index-content__description">School of analytics</div>
      </div>
      <Link href={ROUTER_CONST_SCHOOL.MODULES.path} passHref>
        <Button>Go to modules</Button>
      </Link>
    </div>
  );
};
