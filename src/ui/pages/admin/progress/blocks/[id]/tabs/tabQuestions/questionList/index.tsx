import React, { useEffect, useMemo, useState } from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { DefaultRenderer } from '@ui/layout/grid/renderers/defaultRenderer';
import { TextFieldControl } from '@components/fields';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@components/iconButton';
import CloseIcon from '@mui/icons-material/Close';
import { GridWithData } from '@ui/layout/grid/gridWithData';
import { QuestionRenderer } from '@ui/pages/admin/progress/blocks/[id]/tabs/tabQuestions/questionList/questionRendrer';
import { CellClickedEvent } from 'ag-grid-community';
import { AlertQuestions } from '@ui/components/alert/alertQuestions';
import { IBlockAdminViewModel } from '@viewModel/modules/entities/block/admin/interface';
import { IQuestionAdminViewModel } from '@viewModel/modules/entities/question/admin/interface';
import RefreshIcon from '@mui/icons-material/Refresh';

export const QuestionList = observer(() => {
  const { data: userBlock } = useViewModel<IBlockAdminViewModel>(VIEW_MODEL.BlockAdmin);
  const {
    isListLoading,
    listFiltered: questions,
    hasListFiltered: hasQuestions,
    filter,
    setFilter,
    isModalOpen,
    getData,
    data: questionData,
    getList,
  } = useViewModel<IQuestionAdminViewModel>(VIEW_MODEL.QuestionAdmin);

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
      cellClass: 'ag-first-cell ag-last-cell',
    },
  ];

  const onClick = async (params: CellClickedEvent) => {
    if (!preventClick) await getData(params.data.id, undefined, true);
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
    <IconButton onClick={() => getList()}>
      <RefreshIcon />
    </IconButton>,
  ];

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [filter, isModalOpen, preventClick, questionData]);

  return (
    <React.Fragment>
      <AlertQuestions userBlock={userBlock} />
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
