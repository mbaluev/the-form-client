import { Fragment } from 'react';
import { useTheme } from '@mui/material';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Typography from '@mui/material/Typography';

export const LabelHighlight = (props: { name: string; text?: string }) => {
  const { text = '', name } = props;
  const theme = useTheme();
  const matches = match(name, text, { insideWords: true });
  const parts = parse(name, matches);
  return (
    <Fragment>
      {parts.map((part, index) => (
        <Typography
          key={index}
          component="span"
          fontWeight={part.highlight ? 'bold' : undefined}
          color={part.highlight ? theme.palette.primary.main : undefined}
        >
          {part.text}
        </Typography>
      ))}
    </Fragment>
  );
};
