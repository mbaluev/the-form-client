import { Fragment, ReactElement } from 'react';
import { observer } from 'mobx-react';
import { IMenuItemDTO } from '@model/common/menu';
import { isAccess } from '@ui/layout/navigation/menu/isAccess';

interface IProps {
  item: IMenuItemDTO;
  children?: ReactElement;
}

export const Wrapper = observer((props: IProps) => {
  const { item, children } = props;
  return <Fragment>{isAccess(item) ? children : null}</Fragment>;
});
