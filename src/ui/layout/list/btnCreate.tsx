import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { observer } from 'mobx-react';

interface IProps {
  handleCreate?: () => Promise<void>;
}

export const BtnCreate = observer((props: IProps) => {
  const { handleCreate } = props;
  return (
    <IconButton size="small" onClick={handleCreate}>
      <AddIcon />
    </IconButton>
  );
});
