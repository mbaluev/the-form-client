import { IBlockUserDTO } from '@model/entities/block';
import { statusMaterials } from '@ui/components/status/statusMaterials';
import { IconMaterials } from '@ui/components/icon/iconMaterials';
import { Alert, Box } from '@mui/material';

interface IProps {
  userBlock?: IBlockUserDTO | null;
}

export const AlertMaterials = (props: IProps) => {
  const { userBlock } = props;
  if (userBlock?.completeMaterials) {
    return (
      <Box style={{ padding: '0 20px 20px' }}>
        <Alert variant="outlined" severity="success" icon={<IconMaterials userBlock={userBlock} />}>
          {statusMaterials(userBlock)}
        </Alert>
      </Box>
    );
  }
  return null;
};
