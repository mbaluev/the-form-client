import { Tooltip } from '@components/tooltip';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IBlockUserDTO } from '@model/entities/block';
import { titleMaterial } from '@ui/components/icons/titleMaterial';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import React from 'react';

interface IProps {
  userBlock?: IBlockUserDTO | null;
}

export const IconMaterial = (props: IProps) => {
  const { userBlock } = props;
  const title = titleMaterial(userBlock);
  let icon = <DoDisturbIcon className="color_grey-50" />;
  if (userBlock?.enable && !userBlock?.completeMaterials) {
    icon = <RadioButtonUncheckedIcon className="color_grey-50" />;
  }
  if (userBlock?.completeMaterials) {
    icon = <CheckCircleIcon className="color_green" />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
