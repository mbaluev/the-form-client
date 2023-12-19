import { FC } from 'react';
import { Button } from '@mui/material';

interface IMonthProps {
  month: string;
  onClick?: () => void;
  selected: boolean;
  isFirst: boolean;
  isLast: boolean;
  isStart: boolean;
  isEnd: boolean;
}

export const Month: FC<IMonthProps> = (props) => {
  const { month, onClick, isFirst, isLast, isStart, isEnd, selected } = props;
  const borderRadius = 5;
  const style = {
    borderTopLeftRadius: isFirst || isStart || !selected ? borderRadius : 0,
    borderBottomLeftRadius: isFirst || isStart || !selected ? borderRadius : 0,
    borderTopRightRadius: isLast || isEnd || !selected ? borderRadius : 0,
    borderBottomRightRadius: isLast || isEnd || !selected ? borderRadius : 0,
  };
  return (
    <div className="month-range-field-control__month" style={style}>
      <Button
        onClick={onClick}
        variant={selected ? 'contained' : 'text'}
        style={style}
        size="small"
        fullWidth
      >
        {month}
      </Button>
    </div>
  );
};
