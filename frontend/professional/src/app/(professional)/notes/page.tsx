"use client";
import React from 'react';
import { MarkdownNoteViewer } from '../../../components/professional/MarkdownNoteViewer';
import { NewNoteForm } from '../../../components/professional/NewNoteForm';

export default function NotesPage() {
  return (
    <div className="p-6 space-y-6 md:p-8">
      <h1 className="text-2xl font-semibold text-center md:text-left">Notes</h1>
      <NewNoteForm />
      <MarkdownNoteViewer content={"# Example Note\nThis is a sample note."} />
    </div>
  );
}