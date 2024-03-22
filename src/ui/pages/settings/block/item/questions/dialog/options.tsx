import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useFieldArray, useFormContext } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import { IQuestionDTO, IQuestionOptionDTO } from '@model/entities/question';
import { DEFAULT_QUESTION_OPTION } from '@model/entities/question/default';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { Option } from '@ui/pages/settings/block/item/questions/dialog/option';

export const Options = () => {
  const { control } = useFormContext<IQuestionDTO>();
  const { fields, append, move, remove } = useFieldArray({
    control: control,
    name: 'questionOptions',
  });
  const handleAdd = () => append(DEFAULT_QUESTION_OPTION);
  const handleDelete = (i: number) => remove(i);
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    move(result.source.index, result.destination.index);
  };

  return (
    <Stack>
      {fields && fields.length > 0 && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="block-question-options">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {fields.map((item: IQuestionOptionDTO, index: number, arr) => (
                  <Option
                    key={item.id}
                    id={item.id}
                    index={index}
                    length={arr.length}
                    onDelete={handleDelete}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
      <Button onClick={handleAdd} startIcon={<AddIcon />} sx={{ width: 'fit-content' }}>
        Add option
      </Button>
    </Stack>
  );
};
