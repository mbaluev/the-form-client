import React from 'react';
import NumberFormat from 'react-number-format';
import { useLocale } from '@hooks/useLocale';

interface IProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const FormatNumber = React.forwardRef<NumberFormat<string>, IProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;
    const { fDecimalSeparator, fThousandSeparator } = useLocale();

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        isNumericString={true}
        decimalSeparator={fDecimalSeparator}
        thousandSeparator={fThousandSeparator}
      />
    );
  }
);
