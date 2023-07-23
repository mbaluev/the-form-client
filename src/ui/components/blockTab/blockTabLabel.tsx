import React from 'react';
import { IBlockUserDTO } from '@model/entities/block';
import { IconMaterials } from '@ui/components/icon/iconMaterials';
import { IconTasks } from '@ui/components/icon/iconTasks';
import { IconQuestions } from '@ui/components/icon/iconQuestions';
import { Stack, Typography } from '@mui/material';

interface IProps {
  label?: string;
  userBlock?: IBlockUserDTO | null;
  admin?: boolean;
}

export const BlockTabLabel = (props: IProps) => {
  const { label, userBlock, admin } = props;
  return (
    <Stack direction="row" spacing={2}>
      {label === 'Materials' && (
        <IconMaterials userBlock={userBlock} admin={admin} />
      )}
      {label === 'Homework' && (
        <IconTasks userBlock={userBlock} admin={admin} />
      )}
      {label === 'Test' && (
        <IconQuestions userBlock={userBlock} admin={admin} />
      )}
      <Typography fontWeight={500}>{label}</Typography>
    </Stack>
  );
};
