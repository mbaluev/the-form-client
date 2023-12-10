import IconButton from '@mui/material/IconButton';
import { MouseEvent } from 'react';
import IconTrash from '@components/svg/icons/components/trash';
import { observer } from 'mobx-react';

interface IProps {
  handleDelete?: () => void;
}

export const BtnDelete = observer((props: IProps) => {
  const { handleDelete } = props;

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (handleDelete) handleDelete();
  };

  return (
    <IconButton size="small" onClick={handleClick} color="error">
      <IconTrash />
    </IconButton>
  );
});
