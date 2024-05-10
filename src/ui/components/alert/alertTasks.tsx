import { IBlockUserDTO } from '@model/entities/block';
import { Alert, Box } from '@mui/material';
import { IconTasks } from '@ui/components/icon/iconTasks';
import { statusTasks } from '@ui/components/status/statusTasks';

interface IProps {
  userBlock?: IBlockUserDTO | null;
}

export const AlertTasks = (props: IProps) => {
  const { userBlock } = props;
  if (userBlock?.completeTasks) {
    return (
      <Box style={{ padding: '0 20px 20px' }}>
        <Alert variant="outlined" severity="success" icon={<IconTasks userBlock={userBlock} />}>
          {statusTasks(userBlock)}
        </Alert>
      </Box>
    );
  }
  return null;
};
