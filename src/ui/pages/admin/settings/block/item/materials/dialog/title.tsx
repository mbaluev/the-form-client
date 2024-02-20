/* eslint-disable sonarjs/no-duplicate-string */
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Skeleton, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useFormContext, useWatch } from 'react-hook-form';
import { IMaterialDTO } from '@model/entities/material';
import { useMaterialItemStore } from '@store/modules/entities/material/item/useMaterialItemStore';

interface IProps {
  onClose?: () => Promise<void>;
}

export const Title = observer((props: IProps) => {
  const { onClose } = props;
  const { control } = useFormContext<IMaterialDTO>();
  const { isModalLoading } = useMaterialItemStore();
  const displayName = useWatch({ control, name: 'document.name' }) || 'New document';
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
      <Typography fontWeight={600} fontSize="1.1rem" paddingX={2} paddingY="7px" width="100%">
        {isModalLoading ? <Skeleton width="50%" /> : displayName}
      </Typography>
      {onClose && (
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      )}
    </Stack>
  );
});
