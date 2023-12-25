import { ReactElement, ReactNode } from 'react';
import { Panel } from '@ui/layout/page/panel';

interface IProps {
  children?: ReactNode;
  title?: ReactElement;
  filter?: ReactElement;
  quickFilter?: ReactElement;
}

export const PageContent = (props: IProps) => {
  const { children } = props;
  /*
  {(title || quickFilter) && (
    <Box id="__title" width="100%">
      <Container maxWidth="xl">
        <Stack direction="row" spacing={3} justifyContent="space-between">
          {title &&
            (typeof title === 'string' ? (
              <Typography
                fontSize="1.3rem"
                lineHeight="37px"
                fontWeight={600}
                flexGrow={1}
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {title}
              </Typography>
            ) : (
              title
            ))}
          {quickFilter && <Stack flexGrow={0}>{quickFilter}</Stack>}
        </Stack>
      </Container>
    </Box>
  )}
  */
  return (
    <Panel className="__page_content" height="100%">
      {children}
    </Panel>
  );
};
