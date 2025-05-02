import React from 'react';
import { useRouter } from 'next/router';
import { MarkdownNoteViewer } from '../../../../components/professional/MarkdownNoteViewer';

export default function NoteDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Note Details</h1>
      {id && <MarkdownNoteViewer content={`# Note ${id}\nThis is the content of note ${id}.`} />}
    </div>
  );
}