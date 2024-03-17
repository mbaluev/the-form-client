import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';

interface IProps {
  style?: object;
}

export const IconUsers = (props: IProps) => {
  const { style } = props;
  return <BarChartRoundedIcon color="primary" style={style} />;
};
