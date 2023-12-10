import { useTheme, styled } from '@mui/material/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import SettingsIcon from '@mui/icons-material/Settings';
import Autocomplete, {
  AutocompleteCloseReason,
} from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import {
  useState,
  MouseEvent,
  ChangeEvent,
  Fragment,
  KeyboardEvent,
} from 'react';
import { Button } from '@theme/button';
import { ListItemText, MenuItem, Popover } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

interface PopperComponentProps {
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
}

function PopperComponent(props: PopperComponentProps) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <div {...other} />;
}

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: '100%',
  borderBottom: `1px solid ${theme.palette.t1Grey['30']}`,
  '& input': {
    borderRadius: theme.shape.borderRadius,
    padding: 8,
    paddingLeft: 14,
    paddingRight: 14,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    border: `1px solid ${theme.palette.t1Grey['30']}`,
    fontSize: 14,
    '&:focus': {
      borderWidth: 2,
      padding: 7,
      paddingLeft: 13,
      paddingRight: 13,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const labels = [
  {
    name: 'good first issue',
    color: '#7057ff',
    description: 'Good for newcomers',
  },
  {
    name: 'help wanted',
    color: '#008672',
    description: 'Extra attention is needed',
  },
  {
    name: 'priority: critical',
    color: '#b60205',
    description: '',
  },
  {
    name: 'priority: high',
    color: '#d93f0b',
    description: '',
  },
  {
    name: 'priority: low',
    color: '#0e8a16',
    description: '',
  },
  {
    name: 'priority: medium',
    color: '#fbca04',
    description: '',
  },
  {
    name: "status: can't reproduce",
    color: '#fec1c1',
    description: '',
  },
  {
    name: 'status: confirmed',
    color: '#215cea',
    description: '',
  },
  {
    name: 'status: duplicate',
    color: '#cfd3d7',
    description: 'This issue or pull request already exists',
  },
  {
    name: 'status: needs information',
    color: '#fef2c0',
    description: '',
  },
  {
    name: 'status: wont do/fix',
    color: '#eeeeee',
    description: 'This will not be worked on',
  },
  {
    name: 'type: bug',
    color: '#d73a4a',
    description: "Something isn't working",
  },
  {
    name: 'type: discussion',
    color: '#d4c5f9',
    description: '',
  },
  {
    name: 'type: documentation',
    color: '#006b75',
    description: '',
  },
  {
    name: 'type: enhancement',
    color: '#84b6eb',
    description: '',
  },
  {
    name: 'type: epic',
    color: '#3e4b9e',
    description: 'A theme of work that contain sub-tasks',
  },
  {
    name: 'type: feature request',
    color: '#fbca04',
    description: 'New feature or request',
  },
  {
    name: 'type: question',
    color: '#d876e3',
    description: 'Further information is requested',
  },
];

interface LabelType {
  name: string;
  color: string;
  description?: string;
}

const SelectButtonField = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState<LabelType[]>([labels[1], labels[11]]);
  const [pendingValue, setPendingValue] = useState<LabelType[]>([]);
  const theme = useTheme();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setValue(pendingValue);
    if (anchorEl) anchorEl.focus();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Fragment>
      <Button onClick={handleClick} endIcon={<SettingsIcon />} fullWidth>
        Labels
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: { elevation: 2, sx: { mt: 1, width: anchorEl?.clientWidth } },
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <Autocomplete
              open
              multiple
              onClose={(
                _: ChangeEvent<any>,
                reason: AutocompleteCloseReason
              ) => {
                if (reason === 'escape') {
                  handleClose();
                }
              }}
              value={pendingValue}
              onChange={(event, newValue, reason) => {
                if (
                  event.type === 'keydown' &&
                  (event as KeyboardEvent).key === 'Backspace' &&
                  reason === 'removeOption'
                ) {
                  return;
                }
                setPendingValue(newValue);
              }}
              disableCloseOnSelect
              PopperComponent={PopperComponent}
              renderTags={() => null}
              noOptionsText="Not found"
              renderOption={(props, option, { selected }) => (
                <MenuItem {...props}>
                  <ListItemText>{option.name}</ListItemText>
                  {selected && (
                    <CheckIcon
                      sx={{ fill: theme.palette.primary.main, ml: 2 }}
                    />
                  )}
                </MenuItem>
              )}
              options={[...labels].sort((a, b) => {
                // Display the selected labels first.
                let ai = value.indexOf(a);
                ai = ai === -1 ? value.length + labels.indexOf(a) : ai;
                let bi = value.indexOf(b);
                bi = bi === -1 ? value.length + labels.indexOf(b) : bi;
                return ai - bi;
              })}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <StyledInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  autoFocus
                  placeholder="Search"
                />
              )}
            />
          </div>
        </ClickAwayListener>
      </Popover>
    </Fragment>
  );
};

export default SelectButtonField;
