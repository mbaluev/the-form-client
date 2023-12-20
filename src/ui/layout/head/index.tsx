import Head from 'next/head';
import { ReactNode } from 'react';

interface IProps {
  description?: string | undefined;
  title?: string | undefined;
  type?: string | undefined;
  url?: string | undefined;
  img?: string | undefined;
  children?: ReactNode;
}

export const CustomHead = (props: IProps) => {
  const {
    title = 'The Form school',
    description = 'Online school of analytics',
    type = 'website',
    url = process.env.FRONTEND_URL,
    img = '/favicon/favicon.svg',
  } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description " content={description} />
      {type && <meta property="og:type" content={type} />}
      {url && <meta property="og:url" content={url} />}
      {img && <meta property="og:image" content={img} />}
      <meta property="og:site_name" content="TotalOne" />
      <meta property="og:locale" content="en_US" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
    </Head>
  );
};
