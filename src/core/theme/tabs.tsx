import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Fragment, ReactElement } from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { ProgressBase } from '@ui/layout/card/progress';
import { SeparatorBase } from '@ui/layout/card/separator';

export interface ITabDTO {
  key: string;
  label: string | ReactElement;
  component: ReactElement;
  sxPanel?: SxProps<Theme>;
}

interface IProps {
  active?: string;
  tabs: ITabDTO[];
  onChange?: (value: string) => void;
  padding?: boolean;
  hideTabs?: boolean;
  loading?: boolean;
}

export const Tabs = (props: IProps) => {
  const { active, tabs, onChange, padding, hideTabs, loading } = props;
  const selected = active ?? tabs[0].key;
  const handleChange = (_: any, newValue: string) => {
    if (onChange) onChange(newValue);
  };
  return (
    <TabContext value={selected}>
      {!hideTabs && (
        <Fragment>
          <TabList
            onChange={handleChange}
            sx={{
              pl: padding ? 3 : undefined,
              pr: padding ? 3 : undefined,
            }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.key}
                label={tab.label}
                value={tab.key}
                sx={{ textTransform: 'capitalize', mr: 3 }}
              />
            ))}
          </TabList>
          {loading ? <ProgressBase sx={{ mt: '-2px' }} /> : <SeparatorBase sx={{ mt: '-2px' }} />}
        </Fragment>
      )}
      {tabs.map((tab) => (
        <TabPanel key={tab.key} value={tab.key} sx={tab.sxPanel}>
          {tab.component}
        </TabPanel>
      ))}
    </TabContext>
  );
};
