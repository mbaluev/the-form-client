import {
  ReactElement,
  useState,
  ChangeEvent,
  MouseEvent,
  cloneElement,
  CSSProperties,
} from 'react';
import { observer } from 'mobx-react';
import Divider from '@mui/material/Divider';
import { CheckboxField } from 'core/components/fields/checkboxField';
import { classNames } from '@utils/classNames';
import classes from './item.module.scss';
import { ProgressBase } from '@ui/layout/card/progress';

interface IProps {
  id?: string;
  selected?: boolean;
  selectItem?: (id: string) => void;
  onClick?: () => void;
  avatar?: ReactElement;
  content?: ReactElement;
  more?: ReactElement;
  action?: ReactElement;
  loading?: boolean | null;
  rowStyle?: CSSProperties;
}

export const VirtualizeItem = observer((props: IProps) => {
  const { id, selected, selectItem, onClick, avatar, content, more, loading, rowStyle } = props;

  // hover
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  // handlers
  const handleClick = () => {
    if (onClick) onClick();
  };
  const handleCheckClick = (e: MouseEvent<HTMLButtonElement>) => e.stopPropagation();
  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (selectItem) selectItem(e.target.name);
  };

  return (
    <div
      className={classNames(classes.item, { [classes.item_hover]: hover })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={rowStyle}
    >
      <Divider />
      <div className={classes.item_container}>
        {selectItem && (
          <div className={classes.item_checkbox}>
            <CheckboxField
              size="small"
              value={selected}
              onClick={handleCheckClick}
              onChange={handleCheck}
              name={id}
            />
          </div>
        )}
        <div className={classes.item_content}>
          {avatar && <div style={{ flexGrow: 0 }}>{avatar}</div>}
          <div style={{ flexGrow: 1, overflow: 'hidden' }}>
            {content && cloneElement(content, { hover })}
          </div>
          {more && <div style={{ flexGrow: 0 }}>{more}</div>}
        </div>
      </div>
      {loading ? (
        <ProgressBase sx={{ mt: '-2px' }} />
      ) : (
        <Divider sx={{ borderWidth: 1, borderColor: 'transparent', mt: '-2px' }} />
      )}
    </div>
  );
});
