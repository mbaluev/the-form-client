import { Stack, useTheme } from '@mui/material';
import { observer } from 'mobx-react';
import Typography from '@mui/material/Typography';
import { IMaterialUserDTO } from '@model/entities/material';

interface IProps {
  item: IMaterialUserDTO;
}

export const Item = observer((props: IProps) => {
  const { item } = props;
  const theme = useTheme();
  const grey = theme.palette.fGrey[100];
  const documentType = item.material?.document?.documentType.name;

  return (
    <Stack spacing={1}>
      <Typography>{item.material?.document?.name}</Typography>
      {(documentType === 'link' || documentType === 'video') && (
        <Typography noWrap fontWeight={600} color={grey}>
          {item.material?.document?.url}
        </Typography>
      )}
      {documentType === 'file' && (
        <Typography noWrap fontWeight={600} color={grey}>
          {item.material?.document?.file.name}
        </Typography>
      )}
    </Stack>
  );
});
