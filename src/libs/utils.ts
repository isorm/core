import { Container } from "./DI";

export const dispatchDescriptor = (
  target: any,
  descriptor: PropertyDescriptor,
  dispatch: <T extends unknown[]>(
    
    ...data: T
  ) =>
    | { data: unknown[] }
    | Promise<{ data: unknown[] }>
    | void
    | Promise<void>,
) => {
  const method = descriptor.value;

  descriptor.value = async (...data: any[]) => {
    const instance = Container.resolve(target.constructor);

    const result = (await dispatch(data)) || data;

    return method.apply(instance, result);
  };
};

export default dispatchDescriptor;
