import Link from 'next/link';
import { observer } from 'mobx-react';
import { Typography, Stack, useTheme, Box } from '@mui/material';
import { getProgress } from '@ui/components/progress/getProgress';
import { ProgressBar } from '@ui/components/progress';
import { ROUTES } from '@settings/routes';
import { ReactNode } from 'react';
import { SeparatorBase } from '@ui/layout/card/separator';
import { IBlockUserDTO } from '@model/entities/block';
import { TagBlock } from '@ui/components/tag/tagBlock';
import { IconMaterials } from '@ui/components/icon/iconMaterials';
import { statusMaterials } from '@ui/components/status/statusMaterials';
import { IconQuestions } from '@ui/components/icon/iconQuestions';
import { statusQuestions } from '@ui/components/status/statusQuestions';
import { IconTasks } from '@ui/components/icon/iconTasks';
import { statusTasks } from '@ui/components/status/statusTasks';

interface IProps {
  userBlock: IBlockUserDTO;
}

export const BlockGridItem = observer((props: IProps) => {
  const { userBlock } = props;
  const theme = useTheme();

  const progressValues = [
    Boolean(userBlock.completeMaterials),
    Boolean(userBlock.completeQuestions),
    Boolean(userBlock.completeTasks),
  ];
  const progress = getProgress(progressValues);
  const disabled = !userBlock.enable;
  const complete = userBlock.enable && userBlock.complete;

  const Wrapper = ({ children }: { children: ReactNode }) => {
    if (disabled) return <Box height="100%">{children}</Box>;
    return (
      <Link passHref href={{ pathname: ROUTES.SCHOOL_BLOCK.path, query: { id: userBlock.id } }}>
        {children}
      </Link>
    );
  };

  return (
    <Wrapper>
      <Stack
        spacing={3}
        borderRadius={1}
        border="solid 2px transparent"
        borderColor={
          complete
            ? theme.palette.success.light
            : disabled
            ? theme.palette.fGrey['20']
            : theme.palette.primary.light
        }
        height="100%"
        sx={{
          backgroundColor: disabled ? theme.palette.fGrey['10'] : undefined,
          cursor: disabled ? 'not-allowed' : undefined,
          '&:hover': {
            borderColor: disabled
              ? theme.palette.fGrey['50']
              : complete
              ? theme.palette.success.main
              : theme.palette.primary.main,
          },
        }}
      >
        <Stack spacing={2} padding={3} paddingBottom={0}>
          <TagBlock userBlock={userBlock} />
          <Typography fontSize="1.1rem" fontWeight={600} color={theme.palette.common.black}>
            {userBlock.block?.name}
          </Typography>
          <Typography fontWeight={600} color={theme.palette.fGrey[100]}>
            {userBlock.block?.title}
          </Typography>
        </Stack>
        <Stack flexGrow={1} spacing={2} padding={3} paddingBottom={0} justifyContent="flex-end">
          <Stack direction="row" spacing={2}>
            <IconMaterials userBlock={userBlock} />
            <Typography color={theme.palette.common.black}>{statusMaterials(userBlock)}</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <IconTasks userBlock={userBlock} />
            <Typography color={theme.palette.common.black}>{statusTasks(userBlock)}</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <IconQuestions userBlock={userBlock} />
            <Typography color={theme.palette.common.black}>{statusQuestions(userBlock)}</Typography>
          </Stack>
        </Stack>
        <SeparatorBase />
        <ProgressBar value={progress} sx={{ padding: 3, paddingTop: 0 }} />
      </Stack>
    </Wrapper>
  );
});
