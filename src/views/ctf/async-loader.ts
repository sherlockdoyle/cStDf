import { ref, watch, type Ref } from 'vue';

interface DataLoading {
  loading: true;
  error: null;
  data: null;
}
interface DataError {
  loading: false;
  error: Error;
  data: null;
}
interface DataSuccess<T> {
  loading: false;
  error: null;
  data: T;
}
type Data<T> = DataLoading | DataError | DataSuccess<T>;

export default function useAsyncLoader<T>(loader: () => Promise<T>, path: string): Ref<Data<T>> {
  const data = ref<Data<T>>({ loading: true, error: null, data: null }) as Ref<Data<T>>;
  watch(
    () => path,
    async () => {
      data.value = { loading: true, error: null, data: null };
      try {
        data.value = { loading: false, error: null, data: await loader() };
      } catch (e) {
        data.value = { loading: false, error: e instanceof Error ? e : new Error(String(e)), data: null };
      }
    },
    { immediate: true },
  );
  return data;
}
