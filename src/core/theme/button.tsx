import { forwardRef, Ref, useEffect, useRef, useState } from 'react';
import { Box, Button as MuiButton } from '@mui/material';
import { Tooltip } from '@theme/tooltip';
import { ButtonProps } from '@mui/material';
import { useWindowSize } from '@hooks/useWindowSize';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
    const { children, ...otherProps } = props;
    const [ellipsis, setEllipsis] = useState<boolean>(false);
    const buttonTextRef = useRef(null);
    const isChildrenText = typeof children === 'string';
    const childrenText = children as string;

    const isEllipsis = (event: any) => {
      return event ? event.offsetWidth < event.scrollWidth : false;
    };
    const windowSize = useWindowSize();
    useEffect(() => {
      if (isEllipsis(buttonTextRef.current)) {
        setEllipsis(true);
      } else {
        setEllipsis(false);
      }
    }, [windowSize.width, isEllipsis]);

    return otherProps.disabled ? (
      <MuiButton ref={ref} {...otherProps}>
        <Box
          ref={buttonTextRef}
          sx={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {children}
        </Box>
      </MuiButton>
    ) : (
      <Tooltip title={ellipsis && isChildrenText ? childrenText : false}>
        <MuiButton ref={ref} {...otherProps}>
          <Box
            ref={buttonTextRef}
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {children}
          </Box>
        </MuiButton>
      </Tooltip>
    );
  }
);
