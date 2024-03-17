import Link from 'next/link';
import { observer } from 'mobx-react';
import { Typography, Stack, useTheme, Box } from '@mui/material';
import { TagModule } from '@ui/components/tag/tagModule';
import { IconModule } from '@ui/components/icon/iconModule';
import { getProgress } from '@ui/components/progress/getProgress';
import { ProgressBar } from '@ui/components/progress';
import { IModuleUserDTO } from '@model/entities/module';
import { statusModule } from '@ui/components/status/statusModule';
import { ROUTES } from '@settings/routes';
import { ReactNode } from 'react';
import { IconBlock } from '@ui/components/icon/iconBlock';
import { SeparatorBase } from '@ui/layout/card/separator';

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
  const status = statusModule(userModule);
  const disabled = status === 'Disabled';

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
        borderColor={theme.palette.fGrey['30']}
        height="100%"
        sx={{
          backgroundColor: disabled ? theme.palette.fGrey['10'] : undefined,
          cursor: disabled ? 'not-allowed' : undefined,
          '&:hover': {
            borderColor: disabled ? theme.palette.fGrey['40'] : theme.palette.primary.main,
          },
        }}
      >
        <Stack spacing={3} padding={3} paddingBottom={0}>
          <TagModule userModule={userModule} />
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <IconModule userModule={userModule} />
              <Typography fontSize="1.1rem" fontWeight={600} color={theme.palette.common.black}>
                {userModule.module?.name}
              </Typography>
            </Stack>
            <Typography fontWeight={600} color={theme.palette.fGrey[100]}>
              {userModule.module?.title}
            </Typography>
          </Stack>
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
