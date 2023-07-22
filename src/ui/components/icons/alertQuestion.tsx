import { IBlockUserDTO } from '@model/entities/block';
import { Alert } from '@components/alert';
import { Box } from '@mui/material';
import { IconQuestion } from '@ui/components/icons/iconQuestion';
import { titleQuestion } from '@ui/components/icons/titleQuestion';

interface IProps {
  userBlock?: IBlockUserDTO | null;
}

export const AlertQuestion = (props: IProps) => {
  const { userBlock } = props;
  if (userBlock?.completeQuestions) {
    return (
      <Box style={{ padding: '0 20px 20px' }}>
        <Alert
          type={userBlock?.errorQuestions ? 'error' : 'success'}
          icon={<IconQuestion userBlock={userBlock} />}
          title={titleQuestion(userBlock)}
          variant="outlined"
          shadow={false}
          border={false}
        />
      </Box>
    );
  }
  return null;
};
