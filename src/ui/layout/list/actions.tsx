import { Stack } from '@mui/material';
import { BtnCreate } from '@ui/layout/list/btnCreate';
import { BtnDelete } from '@ui/layout/list/btnDelete';

interface IProps {
  hasSelected?: boolean;
  handleCreate?: () => Promise<void>;
  handleDelete?: () => Promise<void>;
}

export const Actions = (props: IProps) => {
  const { hasSelected, handleCreate, handleDelete } = props;

  if (!handleCreate && !handleDelete) return null;

  return (
    <Stack direction="row" spacing={2}>
      {handleCreate && <BtnCreate handleCreate={handleCreate} />}
      {handleDelete && <BtnDelete handleDelete={handleDelete} hasSelected={hasSelected} />}
    </Stack>
  );
};
