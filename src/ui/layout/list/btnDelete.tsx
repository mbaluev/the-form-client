import IconButton from '@mui/material/IconButton';
import { MouseEvent } from 'react';
import { observer } from 'mobx-react';
import DeleteIcon from '@mui/icons-material/Delete';

interface IProps {
  hasSelected?: boolean;
  handleDelete?: () => void;
}

export const BtnDelete = observer((props: IProps) => {
  const { hasSelected, handleDelete } = props;

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (handleDelete) handleDelete();
  };

  return (
    <IconButton size="small" onClick={handleClick} disabled={!hasSelected}>
      <DeleteIcon />
    </IconButton>
  );
});
