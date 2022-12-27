import { FC } from 'react';
import { Button } from '@components/button';

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
  return (
    <div
      className="month-range-field-control__month"
      style={{
        borderTopLeftRadius: isFirst || isStart ? borderRadius : 0,
        borderBottomLeftRadius: isFirst || isStart ? borderRadius : 0,
        borderTopRightRadius: isLast || isEnd ? borderRadius : 0,
        borderBottomRightRadius: isLast || isEnd ? borderRadius : 0,
      }}
    >
      <Button
        onClick={onClick}
        variant={selected ? 'contained' : 'text'}
        size="small"
        color="blue"
        fullWidth
      >
        {month}
      </Button>
    </div>
  );
};
