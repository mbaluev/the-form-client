function CreateStoragePH(Storage: Storage) {
  return {
    set: (_obj: Record<string, any>, key: string, value: any): boolean => {
      const sValue = Storage.getItem(key);
      if (typeof value === 'object') {
        if (sValue) {
          try {
            const oldValue = JSON.parse(sValue);
            Storage.setItem(key, JSON.stringify({ ...oldValue, ...value }));
          } catch (err) {
            Storage.setItem(key, JSON.stringify(value));
          }
        } else {
          Storage.setItem(key, JSON.stringify(value));
        }
      } else if (typeof value === 'function') {
        return false;
      } else {
        Storage.setItem(key, value);
      }
      return true;
    },
    get: (obj: Record<string, any>, key: string) => {
      switch (key) {
        case 'state':
          return obj[key]();
        case 'methods':
          return obj[key];
        default:
          const value: string | null = Storage.getItem(key);
          try {
            return JSON.parse(value as string);
          } catch (err) {
            return value;
          }
      }
    },
  };
}

const DefaultProps = (Storage: Storage) => {
  return {
    state: () => {
      const length = Storage.length;
      const result: Record<string, any> = {};
      for (let i = 0; i < length; i++) {
        const key: string | null = Storage.key(i);
        if (key) {
          const value = Storage.getItem(key);
          if (value) {
            try {
              result[key] = JSON.parse(value);
            } catch (err) {
              result[key] = value;
            }
          }
        }
      }
      return result;
    },
    methods: {
      clear: () => {
        Storage.clear();
      },
      dropProp: (key: string) => {
        Storage.removeItem(key);
      },
    },
  };
};

let SStorage: Record<string, any>;
let LStorage: Record<string, any>;

if (typeof window !== 'undefined') {
  SStorage = new Proxy(
    DefaultProps(window.sessionStorage),
    CreateStoragePH(window.sessionStorage)
  );
  LStorage = new Proxy(
    DefaultProps(window.localStorage),
    CreateStoragePH(window.localStorage)
  );
}

export { SStorage, LStorage };
