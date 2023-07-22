import { IBlockUserDTO } from '@model/entities/block';
import { Alert } from '@components/alert';
import { Box } from '@mui/material';
import { IconTask } from '@ui/components/icons/iconTask';
import { titleTask } from '@ui/components/icons/titleTask';

interface IProps {
  userBlock?: IBlockUserDTO | null;
}

export const AlertTask = (props: IProps) => {
  const { userBlock } = props;
  if (userBlock?.completeTasks) {
    return (
      <Box style={{ padding: '0 20px 20px' }}>
        <Alert
          type="success"
          icon={<IconTask userBlock={userBlock} />}
          title={titleTask(userBlock)}
          variant="outlined"
          shadow={false}
          border={false}
        />
      </Box>
    );
  }
  return null;
};
