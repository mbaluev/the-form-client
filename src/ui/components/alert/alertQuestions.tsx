import { IBlockUserDTO } from '@model/entities/block';
import { Alert } from '@components/alert';
import { Box } from '@mui/material';
import { IconQuestions } from '@ui/components/icon/iconQuestions';
import { statusQuestions } from '@ui/components/status/statusQuestions';

interface IProps {
  userBlock?: IBlockUserDTO | null;
}

export const AlertQuestions = (props: IProps) => {
  const { userBlock } = props;
  if (userBlock?.completeQuestions) {
    return (
      <Box style={{ padding: '0 20px 20px' }}>
        <Alert
          type={userBlock?.errorQuestions ? 'error' : 'success'}
          icon={<IconQuestions userBlock={userBlock} />}
          title={statusQuestions(userBlock)}
          variant="outlined"
          shadow={false}
          border={false}
        />
      </Box>
    );
  }
  return null;
};
