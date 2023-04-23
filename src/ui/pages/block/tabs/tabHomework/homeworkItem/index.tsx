import React from 'react';
import { classNames } from '@utils/classNames';
import { Accordion } from '@components/accordion';
import { Button } from '@components/button';
import DownloadIcon from '@mui/icons-material/Download';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { ITaskUserViewModel } from '@viewModel/modules/task/user/interface';
import { observer } from 'mobx-react';
import { ITaskUserDTO } from '@model/task';
import SendIcon from '@mui/icons-material/Send';
import { FormField } from '@components/form';
import { Attachment } from '@components/attachment';
import './index.scss';

// interface IHomeworkItemAlert {
//   type?: VariantType;
//   title: string;
// }
// const HomeworkItemAlert = (props: IHomeworkItemAlert) => {
//   const { type, title } = props;
//   return (
//     <Alert
//       type={type}
//       title={title}
//       variant="outlined"
//       shadow={false}
//       border={false}
//     />
//   );
// };

interface IProps {
  task: ITaskUserDTO;
}
export const HomeworkItem = observer((props: IProps) => {
  const { task } = props;
  const { download } = useViewModel<ITaskUserViewModel>(VIEW_MODEL.TaskUser);

  const downloadHandler = () => {
    if (task.document) {
      download(task.document.file.id, task.document.file.name);
    }
  };

  const clsAccordion = classNames('homework-item');
  return (
    <Accordion
      className={clsAccordion}
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
        />,
      ]}
      expanded={task.expanded}
    >
      <FormField title={task.document?.description}>
        {task.taskAnswers?.map((taskAnswer) => {
          if (taskAnswer.type === 'file') {
            return (
              <FormField key={taskAnswer.id} title={taskAnswer.title}>
                <Attachment
                // loading={isModalLoading}
                // onUpload={uploadHandler}
                // onDownload={downloadHandler}
                // error={Boolean(getModalError(pathFileId))}
                // helperText={getModalError(pathFileId)?.message}
                />
              </FormField>
            );
          } else {
            return null;
          }
        })}
      </FormField>
    </Accordion>
  );
});
