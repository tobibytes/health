import React from 'react';
import Markdown from 'react-markdown';

interface MarkdownNoteViewerProps {
  content: string;
}

export function MarkdownNoteViewer({ content }: MarkdownNoteViewerProps) {
  return (
    <div className="prose max-w-none">
      <Markdown>{content}</Markdown>
    </div>
  );
}