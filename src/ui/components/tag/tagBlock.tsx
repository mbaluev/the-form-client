import { IBlockUserDTO } from '@model/entities/block';
import { statusBlock } from '@ui/components/status/statusBlock';
import { Chip, ChipProps } from '@mui/material';

interface IProps {
  userBlock?: IBlockUserDTO | null;
}

export const TagBlock = (props: IProps) => {
  const { userBlock } = props;
  const label = statusBlock(userBlock);
  let color: ChipProps['color'] = 'primary';
  if (userBlock?.complete) color = 'success';
  if (!userBlock?.enable) color = 'secondary';
  return <Chip label={label} color={color} size="small" />;
};
