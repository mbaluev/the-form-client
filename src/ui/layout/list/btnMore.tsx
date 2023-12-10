import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MouseEvent } from 'react';
import { ButtonProps } from '@mui/material';

export const BtnMore = (props: ButtonProps) => {
  const handleMore = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };
  return (
    <IconButton onClick={handleMore} size="small" {...props}>
      <MoreVertIcon />
    </IconButton>
  );
};
