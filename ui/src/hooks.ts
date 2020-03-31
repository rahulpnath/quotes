import { QuotesStoreContext, StoreContext } from 'App';
import { useContext } from 'react';

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error('Store context has not been initialized');
  return store;
}

export function useQuotesStore() {
  const store = useContext(QuotesStoreContext);
  if (!store) throw new Error('Store context has not been initialized');
  return store;
}
