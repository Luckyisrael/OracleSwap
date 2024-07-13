import AsyncStorage from '@react-native-async-storage/async-storage';
import bs58 from 'bs58';
import { create } from 'zustand';

interface StoreState {
  address: string | null;
  setAddress: (address: string) => void;
  loadAddress: () => void;
}

const useStore = create<StoreState>((set) => ({
  address: null,
  setAddress: async (address: string) => {
    const base58Address = bs58.encode(Buffer.from(address, 'base64'));
    set({ address: base58Address });
    await AsyncStorage.setItem('address', base58Address);
  },
  loadAddress: async () => {
    const address = await AsyncStorage.getItem('address');
    if (address) {
      set({ address });
    }
  },
}));

interface Transaction {
  fromAsset: string;
  toAsset: string;
  amount: number;
  received: number;
  date: Date;
}

interface TransactionStoreState {
  publicKey: string | null;
  setPublicKey: (key: string | null) => void;
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
}

const useTransactionStore = create<TransactionStoreState>((set) => ({
  publicKey: null,
  setPublicKey: (key) => set({ publicKey: key }),
  transactions: [],
  addTransaction: (tx) =>
    set((state) => ({
      transactions: [...state.transactions, { ...tx, date: new Date() }],
    })),
}));

export {
  useStore,
  useTransactionStore
}

