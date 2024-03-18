import Link from 'next/link';
import { observer } from 'mobx-react';
import { Typography, Stack, useTheme, Box } from '@mui/material';
import { TagModule } from '@ui/components/tag/tagModule';
import { getProgress } from '@ui/components/progress/getProgress';
import { ProgressBar } from '@ui/components/progress';
import { IModuleUserDTO } from '@model/entities/module';
import { ROUTES } from '@settings/routes';
import { ReactNode } from 'react';
import { IconBlock } from '@ui/components/icon/iconBlock';
import { SeparatorBase } from '@ui/layout/card/separator';
import { IconModule } from '@ui/components/icon/iconModule';

interface IProps {
  userModule: IModuleUserDTO;
}

export const ModuleGridItem = observer((props: IProps) => {
  const { userModule } = props;
  const theme = useTheme();

  const progressValues = userModule.userBlocks?.reduce((prev: boolean[], curr) => {
    return prev.concat([
      Boolean(curr.completeMaterials),
      Boolean(curr.completeQuestions),
      Boolean(curr.completeTasks),
    ]);
  }, []);
  const progress = getProgress(progressValues);
  const disabled = !userModule.enable;
  const complete = userModule.enable && userModule.complete;

  const Wrapper = ({ children }: { children: ReactNode }) => {
    if (disabled) return <Box height="100%">{children}</Box>;
    return (
      <Link passHref href={{ pathname: ROUTES.SCHOOL_MODULE.path, query: { id: userModule.id } }}>
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
          <Stack direction="row" spacing={2}>
            <IconModule userModule={userModule} />
            <TagModule userModule={userModule} />
          </Stack>
          <Typography fontSize="1.1rem" fontWeight={600} color={theme.palette.common.black}>
            {userModule.module?.name}
          </Typography>
          <Typography fontWeight={600} color={theme.palette.fGrey[100]}>
            {userModule.module?.title}
          </Typography>
        </Stack>
        <Stack flexGrow={1} spacing={2} padding={3} paddingBottom={0} justifyContent="flex-end">
          {userModule.userBlocks?.map((userBlock, index) => (
            <Stack key={index} direction="row" spacing={2}>
              <IconBlock userBlock={userBlock} />
              <Typography color={theme.palette.common.black}>{userBlock.block?.name}</Typography>
            </Stack>
          ))}
        </Stack>
        <SeparatorBase />
        <ProgressBar value={progress} sx={{ padding: 3, paddingTop: 0 }} />
      </Stack>
    </Wrapper>
  );
});
