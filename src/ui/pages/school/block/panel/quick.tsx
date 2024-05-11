import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Stack } from '@mui/material';
import { observer } from 'mobx-react';
import { ROUTES } from '@settings/routes';
import { useRouter } from 'next/router';

export const Quick = observer(() => {
  const router = useRouter();
  const block = router.query.slug?.[0] as string;
  const tab = router.query.slug?.[1] as string;

  const handleClose = async () => {
    await router.push({
      pathname: ROUTES.SCHOOL_BLOCK.path,
      query: { slug: [block, tab] },
    });
  };

  return (
    <Stack direction="row" spacing={2}>
      <IconButton color="primary" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
});
