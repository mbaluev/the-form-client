import { PatternFormat as PatternsFormat, PatternFormatProps } from 'react-number-format';
import { forwardRef } from 'react';

interface IProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  format: string;
  mask: string;
}

export const PatternFormat = forwardRef<PatternFormatProps, IProps>(
  function PatternFormatCustom(props, ref) {
    const { onChange, format, mask, ...other } = props;

    return (
      <PatternsFormat
        getInputRef={ref}
        onValueChange={(values: any) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        format={format}
        mask={mask}
        {...other}
      />
    );
  }
);
