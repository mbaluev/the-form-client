import { Stack, useTheme } from '@mui/material';
import { observer } from 'mobx-react';
import Typography from '@mui/material/Typography';
import { IMaterialDTO } from '@model/entities/material';

interface IProps {
  item: IMaterialDTO;
}

export const Item = observer((props: IProps) => {
  const { item } = props;
  const theme = useTheme();
  const grey = theme.palette.fGrey[100];
  const documentType = item.document?.documentType.name;

  return (
    <Stack spacing={1}>
      <Typography>{item.document?.name}</Typography>
      {(documentType === 'link' || documentType === 'video') && (
        <Typography noWrap fontWeight={600} color={grey}>
          {item.document?.url}
        </Typography>
      )}
      {documentType === 'file' && (
        <Typography noWrap fontWeight={600} color={grey}>
          {item.document?.file.name}
        </Typography>
      )}
    </Stack>
  );
});
