const useDeboundcing = (func: (args?: any) => any, timeout: number) => {
  let timerId: number | undefined;

  const debouncing = (args?: any) => {
    clearTimeout(timerId);
    const newFunc = args ? () => func(args) : func;
    timerId = window.setTimeout(newFunc, timeout);
  };

  return [debouncing];
};

export default useDeboundcing;
