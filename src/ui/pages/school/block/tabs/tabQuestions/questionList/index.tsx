import React, { useEffect, useMemo, useState } from 'react';
import { Alert } from '@components/alert';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { IQuestionUserViewModel } from '@viewModel/modules/entities/question/user/interface';
import { IBlockUserViewModel } from '@viewModel/modules/entities/block/user/interface';
import { DefaultRenderer } from '@ui/layout/grid/renderers/defaultRenderer';
import { TextFieldControl } from '@components/fields';
import { Box, InputAdornment } from '@mui/material';
import { IconButton } from '@components/iconButton';
import CloseIcon from '@mui/icons-material/Close';
import { GridWithData } from '@ui/layout/grid/gridWithData';
import { QuestionRenderer } from '@ui/pages/school/block/tabs/tabQuestions/questionList/questionRendrer';
import { CellClickedEvent } from 'ag-grid-community';

interface IPassedProps {
  complete?: number;
  total?: number;
}
const AlertPassed = (props: IPassedProps) => {
  const { complete, total } = props;
  return (
    <Alert
      type="success"
      title={`Test passed (${complete}/${total})`}
      variant="outlined"
      shadow={false}
      border={false}
    />
  );
};

interface IFailedProps {
  complete?: number;
  total?: number;
}
const AlertFailed = (props: IFailedProps) => {
  const { complete, total } = props;
  const title =
    complete && total
      ? `Test failed (${complete}/${total}). Please try again`
      : `Test failed. Please try again`;
  return (
    <Alert
      type="error"
      title={title}
      variant="outlined"
      shadow={false}
      border={false}
    />
  );
};

export const QuestionList = observer(() => {
  const { data: block } = useViewModel<IBlockUserViewModel>(
    VIEW_MODEL.BlockUser
  );
  const {
    isListLoading,
    listFiltered: questions,
    hasListFiltered: hasQuestions,
    filter,
    setFilter,
    isModalOpen,
    getData,
    data: questionData,
  } = useViewModel<IQuestionUserViewModel>(VIEW_MODEL.QuestionUser);

  const [preventClick, setPreventClick] = useState(false);

  const defaultColDef = useMemo(
    () => ({
      sortable: false,
      resizable: false,
      suppressMenu: true,
      cellRenderer: DefaultRenderer,
    }),
    []
  );
  const columnDefs = [
    {
      cellRenderer: QuestionRenderer,
    },
  ];

  const onClick = async (params: CellClickedEvent) => {
    if (!preventClick) await getData(params.data.id);
    setPreventClick(false);
  };
  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  const searchClearHandler = () => {
    setFilter(undefined);
  };

  const itemsLeft: JSX.Element[] = [
    <TextFieldControl
      name="testSearch"
      placeholder="Search"
      value={filter}
      onChange={searchChangeHandler}
      style={{ flex: '1 1 auto' }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end" onClick={searchClearHandler}>
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />,
  ];

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [filter, isModalOpen, preventClick, questionData]);

  return (
    <React.Fragment>
      {block?.completeQuestions === true && (
        <Box style={{ padding: '0 20px 20px' }}>
          <AlertPassed />
        </Box>
      )}
      {block?.completeQuestions === false && (
        <Box style={{ padding: '0 20px 20px' }}>
          <AlertFailed />
        </Box>
      )}
      <GridWithData
        propsAG={{
          rowData: questions,
          rowHeight: 40,
          columnDefs,
          defaultColDef,
        }}
        propsGrid={{
          onClick,
          sizeToFit: true,
          totalItems: questions?.length,
          toolbar: { itemsLeft },
          className: 'ag-grid_no-header',
          isLoading: isListLoading,
          hasRows: hasQuestions,
          noDataMessage: 'No data found',
          autoSizeColumns: ['actions'],
          selectedIds: questionData ? [questionData.id] : undefined,
        }}
      />
    </React.Fragment>
  );
});