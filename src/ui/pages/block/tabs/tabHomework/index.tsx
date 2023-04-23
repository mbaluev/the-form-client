import React, { useEffect } from 'react';
import { classNames } from '@utils/classNames';
import { Form, FormSection } from '@components/form';
import { Accordion } from '@components/accordion';
import { Alert } from '@components/alert';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@components/button';
import DownloadIcon from '@mui/icons-material/Download';
import { useViewModel } from '@hooks/useViewModel';
import { IBlockUserViewModel } from '@viewModel/modules/block/user/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { Loader } from '@components/loader';
import { ITaskUserViewModel } from '@viewModel/modules/task/user/interface';
import './index.scss';
import { observer } from 'mobx-react';

export const TabHomework = observer(() => {
  const { data: block } = useViewModel<IBlockUserViewModel>(
    VIEW_MODEL.BlockUser
  );
  const { getList, isListLoading, list, download } =
    useViewModel<ITaskUserViewModel>(VIEW_MODEL.TaskUser);

  useEffect(() => {
    if (block) getList();
  }, [block]);

  if (isListLoading) return <Loader loading={true} />;

  const cls = classNames('tab-homework');
  const clsAccordion = classNames('tab-homework__accordion');
  return (
    <Form className={cls}>
      <FormSection cols={2}>
        {list?.map((task, index) => {
          const downloadHandler = async () => {
            if (task.document) {
              await download(task.document.file.id, task.document.file.name);
            }
          };
          return (
            <Accordion
              className={clsAccordion}
              key={index}
              title={task.document?.name}
              footerButtons={[
                <Button
                  size="medium"
                  variant="text"
                  color="blue"
                  startIcon={<DownloadIcon />}
                  onClick={downloadHandler}
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
              expanded={task.expanded}
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
              {task.document?.description}
            </Accordion>
          );
        })}
      </FormSection>
    </Form>
  );
});
