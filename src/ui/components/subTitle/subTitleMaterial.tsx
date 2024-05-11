import { observer } from 'mobx-react';
import { Chip, Stack, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { IMaterialUserDTO } from '@model/entities/material';
import { TagMaterial } from '@ui/components/tag/tagMaterial';

interface IProps {
  userMaterial?: IMaterialUserDTO | null;
}

export const SubTitleMaterial = observer((props: IProps) => {
  const { userMaterial } = props;
  const documentType = userMaterial?.material?.document?.documentType.name;
  const theme = useTheme();
  const grey = theme.palette.fGrey[100];
  return (
    <Stack direction="row" spacing={2}>
      <TagMaterial userMaterial={userMaterial} />
      <Chip
        label={userMaterial?.material?.document?.documentType.name}
        color="primary"
        size="small"
      />
      {(documentType === 'link' || documentType === 'video') && (
        <Typography noWrap fontWeight={600} color={grey}>
          {userMaterial?.material?.document?.url}
        </Typography>
      )}
      {documentType === 'file' && (
        <Typography noWrap fontWeight={600} color={grey}>
          {userMaterial?.material?.document?.file.name}
        </Typography>
      )}
    </Stack>
  );
});
