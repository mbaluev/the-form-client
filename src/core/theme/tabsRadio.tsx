import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { ITabDTO } from '@theme/tabs';

interface IProps {
  active?: string;
  tabs: ITabDTO[];
  onChange?: (value: string) => void;
}

const FormControlLabelGrey = styled(FormControlLabel)(({ theme }) => ({
  '&.MuiFormControlLabel-root': {
    paddingRight: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.t1Grey['20'],
    marginLeft: 0,
    marginRight: 0,
    '& .MuiTypography-root': {
      fontWeight: 600,
    },
  },
}));

export const TabsRadio = (props: IProps) => {
  const { active, tabs, onChange } = props;
  const selected = active ?? tabs[0].key;
  const handleChange = (event: any, newValue: string) => {
    if (onChange) onChange(newValue);
  };
  return (
    <TabContext value={selected}>
      <RadioGroup row value={selected} onChange={handleChange} sx={{ gap: 2 }}>
        {tabs.map((tab) => (
          <FormControlLabelGrey
            key={tab.key}
            label={tab.label}
            value={tab.key}
            control={<Radio />}
          />
        ))}
      </RadioGroup>
      {tabs.map((tab) => (
        <TabPanel key={tab.key} value={tab.key}>
          {tab.component}
        </TabPanel>
      ))}
    </TabContext>
  );
};
