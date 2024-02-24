import { Draggable } from 'react-beautiful-dnd';
import Stack from '@mui/material/Stack';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Input } from '@ui/fields/input';
import IconButton from '@mui/material/IconButton';
import { useMemo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox } from '@ui/fields/checkbox';

interface IProps {
  id: string;
  index: number;
  length: number;
  onDelete: (i: number) => void;
}

export const Option = (props: IProps) => {
  const { id, index, length, onDelete } = props;
  const handleDelete = () => onDelete(index);
  const required = 'required';

  const alone = useMemo(() => length === 1, [length]);
  const handleStyle = { display: alone ? 'none' : undefined };
  const inputStyle = { marginLeft: alone ? 0 : undefined, width: '100%' };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Stack
          direction="row"
          alignItems="flex-start"
          spacing={2}
          flexGrow={1}
          marginBottom={2}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <IconButton sx={handleStyle} {...provided.dragHandleProps}>
            <DragIndicatorIcon />
          </IconButton>
          <Checkbox name={`questionOptions.${index}.correct`} />
          <Input
            name={`questionOptions.${index}.title`}
            rules={{ required: required }}
            style={inputStyle}
            minRows={3}
            multiline
            required
          />
          <IconButton color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      )}
    </Draggable>
  );
};
