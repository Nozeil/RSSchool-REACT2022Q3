export const mockStorage = () => {
  const localStorageMock = function () {
    let storage: { [k: string]: string } = {};

    return {
      setItem(key: string, value: string) {
        storage[key] = value;
      },
      getItem(key: string) {
        return storage[key] || null;
      },
      removeItem(key: string) {
        delete storage[key];
      },
      clear() {
        storage = {};
      },
      getStorage() {
        return storage;
      },
    };
  };

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock(),
  });
};
