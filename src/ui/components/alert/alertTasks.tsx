import { IBlockUserDTO } from '@model/entities/block';
import { Alert } from '@components/alert';
import { Box } from '@mui/material';
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
        <Alert
          type="success"
          icon={<IconTasks userBlock={userBlock} />}
          title={statusTasks(userBlock)}
          variant="outlined"
          shadow={false}
          border={false}
        />
      </Box>
    );
  }
  return null;
};
