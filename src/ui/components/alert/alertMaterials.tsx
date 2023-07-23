import { IBlockUserDTO } from '@model/entities/block';
import { statusMaterials } from '@ui/components/status/statusMaterials';
import { Alert } from '@components/alert';
import { IconMaterials } from '@ui/components/icon/iconMaterials';
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
          title={statusMaterials(userBlock)}
          variant="outlined"
          shadow={false}
          border={false}
        />
      </Box>
    );
  }
  return null;
};
