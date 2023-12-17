import IconButton from '@mui/material/IconButton';
import IconCopy from '@components/svg/icons/components/copy';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';
import { ButtonProps } from '@mui/material';

interface IProps extends ButtonProps {
  text?: string;
}

export const Copy = (props: IProps) => {
  const { text, ...otherProps } = props;
  const [clicked, setClicked] = useState<boolean>(false);
  const onClick = () => {
    navigator.clipboard.writeText(text || '');
    setClicked(true);
    setTimeout(() => setClicked(false), 1000);
  };
  return (
    <IconButton edge="end" onClick={onClick} {...otherProps}>
      {clicked ? <CheckIcon color="success" /> : <IconCopy />}
    </IconButton>
  );
};
