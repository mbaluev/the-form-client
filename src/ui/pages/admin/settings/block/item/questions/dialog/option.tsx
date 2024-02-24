import { Draggable } from 'react-beautiful-dnd';
import Stack from '@mui/material/Stack';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Input } from '@ui/fields/input';
import IconButton from '@mui/material/IconButton';
import { useMemo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox } from '@ui/fields/checkbox';
import { useTheme } from '@mui/material';

interface IProps {
  id: string;
  index: number;
  length: number;
  onDelete: (i: number) => void;
}

export const Option = (props: IProps) => {
  const { id, index, length, onDelete } = props;
  const handleDelete = () => onDelete(index);
  const theme = useTheme();

  const alone = useMemo(() => length === 1, [length]);

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
          <IconButton sx={{ display: alone ? 'none' : undefined }} {...provided.dragHandleProps}>
            <DragIndicatorIcon />
          </IconButton>
          <Input
            name={`questionOptions.${index}.title`}
            sx={{ marginLeft: alone ? '0px !important' : `${theme.spacing(2)} !important` }}
            minRows={3}
            multiline
            required
            fullWidth
          />
          <Stack>
            <IconButton color="error" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
            <Checkbox
              name={`questionOptions.${index}.correct`}
              sx={{ marginLeft: `${theme.spacing(2)} !important` }}
            />
          </Stack>
        </Stack>
      )}
    </Draggable>
  );
};
