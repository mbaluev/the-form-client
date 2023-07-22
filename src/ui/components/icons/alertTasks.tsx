import { IBlockUserDTO } from '@model/entities/block';
import { Alert } from '@components/alert';
import { Box } from '@mui/material';
import { IconTasks } from '@ui/components/icons/iconTasks';
import { titleTasks } from '@ui/components/icons/titleTasks';

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
          title={titleTasks(userBlock)}
          variant="outlined"
          shadow={false}
          border={false}
        />
      </Box>
    );
  }
  return null;
};
