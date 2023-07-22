import { IBlockUserDTO } from '@model/entities/block';
import { titleMaterials } from '@ui/components/icons/titleMaterials';
import { Alert } from '@components/alert';
import { IconMaterials } from '@ui/components/icons/iconMaterials';
import { Box } from '@mui/material';

interface IProps {
  userBlock?: IBlockUserDTO | null;
}

export const AlertMaterials = (props: IProps) => {
  const { userBlock } = props;
  if (userBlock?.completeMaterials) {
    return (
      <Box style={{ padding: '0 20px 20px' }}>
        <Alert
          type="success"
          icon={<IconMaterials userBlock={userBlock} />}
          title={titleMaterials(userBlock)}
          variant="outlined"
          shadow={false}
          border={false}
        />
      </Box>
    );
  }
  return null;
};
