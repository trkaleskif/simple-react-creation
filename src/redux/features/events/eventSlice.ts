
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api/axios';

interface Event {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  content?: string;
}

interface EventState {
  events: Event[];
  currentEvent: Event | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: EventState = {
  events: [],
  currentEvent: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      // Simulated API call - replace with actual endpoint
      // const response = await api.get('/events');
      
      // Mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return [
        {
          id: "big5-saudi-2025",
          title: "BIG5 Saudi 2025: event report.",
          date: "15/03/2025",
          category: "EVENTS",
          excerpt: "We have just returned from Riyadh, where the 13th edition of Big 5 Construct Saudi, the largest construction exhibition in the Kingdom and in the entire Middle East region, took place.",
          image: "https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
        {
          id: "bau-2025",
          title: "BAU 2025: How did it go?",
          date: "21/01/2025",
          category: "EVENTS",
          excerpt: "BAU 2025, the world's leading trade fair for architecture, materials, and systems, was a tremendous success for Fimet.",
          image: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
      ];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch events');
    }
  }
);

export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (id: string, { rejectWithValue }) => {
    try {
      // Simulated API call - replace with actual endpoint
      // const response = await api.get(`/events/${id}`);
      
      // Mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        id,
        title: "BIG5 Saudi 2025: event report.",
        date: "15/03/2025",
        category: "EVENTS",
        excerpt: "We have just returned from Riyadh, where the 13th edition of Big 5 Construct Saudi, the largest construction exhibition in the Kingdom and in the entire Middle East region, took place.",
        image: "https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        content: "We have just returned from Riyadh, where the 13th edition of Big 5 Construct Saudi, the largest construction exhibition in the Kingdom and in the entire Middle East region, took place. The event was a tremendous success for Fimet, with hundreds of visitors to our booth showing interest in our new product lines. The exhibition provided an excellent opportunity to connect with industry professionals and showcase our innovative solutions for modern architecture.",
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch event');
    }
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearEventError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchEventById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearEventError } = eventSlice.actions;
export default eventSlice.reducer;
