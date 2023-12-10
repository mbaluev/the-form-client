import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

export const SearchInput = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    height: '100%',
    paddingLeft: '10px',
    backgroundColor: theme.palette.t1Grey[230],
    '&.Mui-focused .MuiSvgIcon-root, &:hover .MuiSvgIcon-root': {
      color: theme.palette.common.white,
    },
  },
  '& .MuiInputBase-input': {
    padding: '8px',
    paddingLeft: 0,
    color: theme.palette.common.white,
  },
  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
}));
