// src/services/noteService.ts
import axios from 'axios';
import type { Note, NewNoteData } from '../types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  totalNotes: number;
  page: number;
  perPage: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await instance.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search: search.trim() || undefined,
    },
  });
  return response.data;
};

export const createNote = async (data: NewNoteData): Promise<Note> => {
  const response = await instance.post<Note>('/notes', data);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await instance.delete<Note>(`/notes/${id}`);
  return response.data;
};