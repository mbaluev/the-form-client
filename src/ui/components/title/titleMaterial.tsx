import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { IMaterialUserDTO } from '@model/entities/material';
import { PageIcon } from '@ui/layout/page/pageIcon';
import Typography from '@mui/material/Typography';
import { IconMaterial } from '@ui/components/icon/iconMaterial';
import { IconDocument } from '@ui/components/icon/iconDocument';

interface IProps {
  userMaterial?: IMaterialUserDTO | null;
}

export const TitleMaterial = observer((props: IProps) => {
  const { userMaterial } = props;
  const name = userMaterial?.material?.document?.name;
  if (!userMaterial) return null;
  return (
    <Stack direction="row" spacing={2}>
      <PageIcon>
        <IconMaterial userMaterial={userMaterial} />
      </PageIcon>
      <PageIcon>
        <IconDocument document={userMaterial.material?.document} />
      </PageIcon>
      <Typography sx={{ fontSize: '1.3rem', fontWeight: 600, lineHeight: '24px' }}>
        {name}
      </Typography>
    </Stack>
  );
});
