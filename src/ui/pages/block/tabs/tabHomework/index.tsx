import React from 'react';
import { classNames } from '@utils/classNames';
import { Form, FormSection } from '@components/form';
import { Accordion } from '@components/accordion';
import { Alert } from '@components/alert';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@components/button';
import DownloadIcon from '@mui/icons-material/Download';
import './index.scss';

const MOCK_TASKS = [
  {
    name: 'Task 1',
    description: 'Attach your homework',
    expanded: true,
  },
  {
    name: 'Task 2',
    description: 'Attach your homework',
    expanded: true,
  },
];

export const TabHomework = () => {
  const cls = classNames('tab-homework');
  const clsAccordion = classNames('tab-homework__accordion');
  return (
    <Form className={cls}>
      <FormSection cols={2}>
        {MOCK_TASKS.map((t, index) => {
          return (
            <Accordion
              className={clsAccordion}
              key={index}
              title={t.name}
              footerButtons={[
                <Button
                  size="medium"
                  variant="text"
                  color="blue"
                  startIcon={<DownloadIcon />}
                  children="Download"
                />,
                <Button
                  color="blue"
                  variant="text"
                  size="medium"
                  children="Send"
                  startIcon={<SendIcon />}
                  disabled={index > 0}
                />,
              ]}
              expanded={t.expanded}
            >
              <Alert
                type="info"
                title="Homework has sent"
                shadow={false}
                variant="outlined"
              />
              <Alert
                type="success"
                title="Homework passed"
                shadow={false}
                variant="outlined"
              />
              <Alert
                type="error"
                title="Homework has mistakes"
                shadow={false}
                variant="outlined"
              />
              {t.description}
            </Accordion>
          );
        })}
      </FormSection>
    </Form>
  );
};
