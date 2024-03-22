import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Skeleton, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useQuestionSettingsItemStore } from '@store/modules/settings/question/item/hook';
import { IQuestionDTO } from '@model/entities/question';

interface IProps {
  onClose?: () => Promise<void>;
}

export const Title = observer((props: IProps) => {
  const { onClose } = props;
  const { control } = useFormContext<IQuestionDTO>();
  const { isModalLoading } = useQuestionSettingsItemStore();
  const displayName = useWatch({ control, name: 'title' }) || 'New question';
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
      <Typography
        fontWeight={600}
        fontSize="1.1rem"
        paddingX={2}
        paddingY="7px"
        width="100%"
        noWrap
      >
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
