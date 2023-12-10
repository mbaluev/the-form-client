import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { useLocaleStore } from '@store/modules/common/locale/useLocaleStore';
import { forwardRef } from 'react';

interface IProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  min?: number;
  max?: number;
  decimalScale?: number;
}

export const NumberFormat = forwardRef<NumericFormatProps, IProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, min, max, decimalScale = 0, ...other } = props;
    const { fDecimalSeparator, fThousandSeparator } = useLocaleStore();

    return (
      <NumericFormat
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
        decimalSeparator={fDecimalSeparator}
        thousandSeparator={fThousandSeparator}
        decimalScale={decimalScale}
        fixedDecimalScale
        isAllowed={(values) => {
          let isAllowed = true;
          const { floatValue } = values;
          if (floatValue === undefined) {
            isAllowed = false;
          } else {
            if (max !== undefined && floatValue > max) isAllowed = false;
            if (min !== undefined && floatValue < min) isAllowed = false;
          }
          return isAllowed;
        }}
      />
    );
  }
);
