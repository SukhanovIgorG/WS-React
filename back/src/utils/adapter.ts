type Entity = { id: string };

type AdapterResult<T> = {
  add: (item: T) => T;
  findAll: () => T[];
  findById: (id: string) => T | undefined;
  findByFields: (fields: Partial<T>) => T[];
  removeById: (id: string) => T[]; // TODO: проверить что возвращается после удаления с реального сервера
  updateById: (id: string, diff: Partial<T>) => T | undefined;
};

export function createAdapter<T extends Entity>(initialData: T[]): AdapterResult<T> {
  let data: T[] = initialData;

  const add = (item: T): T => {
    data = [...data, item];
    return item;
  };

  const findAll = (): T[] => {
    return data;
  };

  const findById = (id: string): T | undefined => {
    return data.find(item => item.id === id);
  };

  const findByFields = (fields: Partial<T>): T[] => {
    const arrKeys = Object.keys(fields);
    const res = data.filter(item => {
      return arrKeys.every(key => item.hasOwnProperty(key) && item[key] === fields[key]);
    });
    return res
  };

  const removeById = (id: string): T[] => {
    data = data.filter(item => item.id !== id);
    return data;
  };

  const updateById = (id: string, diff: Partial<T>): T | undefined => {
    data = data.map(item =>
      item.id === id ? { ...item, ...diff } : item
    );
    let updated = data.find(item => item.id === id);
    return updated;
  };

  return {
    add,
    findAll,
    findById,
    removeById,
    updateById,
    findByFields,
  };
}
