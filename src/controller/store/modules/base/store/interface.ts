export default interface IBaseStore {
  isLoading: boolean;
  isEdit: boolean;
  isOpen: boolean;
  error?: string;

  setLoading: (value: boolean) => void;
  setEdit: (value: boolean) => void;
  setOpen: (value: boolean) => void;
  setError: (value?: string) => void;
}
