import { IBlockUserDTO } from '@model/entities/block';
import { titleMaterial } from '@ui/components/icons/titleMaterial';
import { Alert } from '@components/alert';
import { IconMaterial } from '@ui/components/icons/iconMaterial';
import { Box } from '@mui/material';

interface IProps {
  userBlock?: IBlockUserDTO | null;
}

export const AlertMaterial = (props: IProps) => {
  const { userBlock } = props;
  if (userBlock?.completeMaterials) {
    return (
      <Box style={{ padding: '0 20px 20px' }}>
        <Alert
          type="success"
          icon={<IconMaterial userBlock={userBlock} />}
          title={titleMaterial(userBlock)}
          variant="outlined"
          shadow={false}
          border={false}
        />
      </Box>
    );
  }
  return null;
};
