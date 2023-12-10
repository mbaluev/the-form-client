import { Fragment } from 'react';

export const FirstLetters = (props: { name?: string | null }) => {
  const names = props.name?.replace(/\s\s+/g, ' ')?.split(' ');
  const firstWord = names?.[0]?.replace(/[^a-zA-Z0-9+]/g, '');
  const firstLetter = firstWord?.substring(0, 1);
  const secondWord = names?.[1]?.replace(/[^a-zA-Z0-9+]/g, '');
  const secondLetter = secondWord?.substring(0, 1);
  return (
    <Fragment>
      {firstLetter?.toUpperCase()}
      {secondLetter?.toUpperCase()}
    </Fragment>
  );
};

export const combineStrings = (value: (string | undefined | null)[]) => {
  let ret = '';
  for (const key in value) {
    if (value[key]) ret += value[key] + ' ';
  }
  ret = ret.trim();
  return ret;
};
