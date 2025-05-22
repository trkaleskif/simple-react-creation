
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  isLoading: false,
  error: null
};

// Create async thunk for fetching cart items
export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (_, { rejectWithValue }) => {
    try {
      // Simulating API call with mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock cart items
      const items: CartItem[] = [
        {
          id: '1',
          name: 'Wall Object Lips 30cm',
          price: 3800,
          quantity: 1,
          image: '/placeholder.svg',
          description: 'Wall decoration object'
        }
      ];
      
      return items;
    } catch (error) {
      return rejectWithValue('Failed to fetch cart items');
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{id: string, quantity: number}>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  openCart,
  closeCart,
  toggleCart
} = cartSlice.actions;

export default cartSlice.reducer;
