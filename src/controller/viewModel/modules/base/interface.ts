export interface IBaseViewModel {
  isLoading: boolean;
  setLoading: (value: boolean) => void;

  isEdit: boolean;
  setEdit: (value: boolean) => void;

  isOpen: boolean;
  setOpen: (value: boolean) => void;
}
