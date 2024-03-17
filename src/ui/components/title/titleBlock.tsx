import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { IBlockUserDTO } from '@model/entities/block';
import { IconBlock } from '@ui/components/icon/iconBlock';

interface IProps {
  userBlock?: IBlockUserDTO | null;
}

export const TitleBlock = observer((props: IProps) => {
  const { userBlock } = props;
  const name = userBlock?.block?.name;
  return (
    <Stack direction="row" spacing="10px">
      <IconBlock userBlock={userBlock} />
      {name && <div>{name}</div>}
    </Stack>
  );
});
