import React, { useState } from 'react';
import { TECHNICAL_BOOKS, BookRecord } from '@/features/portfolio/portfolioData';
import { BookOpen, ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';

interface BookshelfReaderPanelProps {
  initialBookId?: string;
}

export const BookshelfReaderPanel: React.FC<BookshelfReaderPanelProps> = ({
  initialBookId = 'book.programming',
}) => {
  const [selectedBookId, setSelectedBookId] = useState<string>(initialBookId);
  const [pageIndex, setPageIndex] = useState<number>(0);

  const activeBook: BookRecord =
    TECHNICAL_BOOKS.find((b) => b.id === selectedBookId) || TECHNICAL_BOOKS[0];

  const handleSelectBook = (id: string) => {
    setSelectedBookId(id);
    setPageIndex(0);
  };

  const currentPage = activeBook.pages[pageIndex] || activeBook.pages[0];
  const totalPages = activeBook.pages.length;

  return (
    <div className="flex flex-col h-[520px] bg-stone-950 rounded-2xl border border-amber-600/30 overflow-hidden shadow-2xl font-serif text-stone-200">
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-stone-900 border-b border-stone-800 font-sans">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
            Dong's Technical Library // 6 Volumes
          </span>
        </div>
        <div className="text-xs font-mono text-stone-400">
          Page {pageIndex + 1} of {totalPages}
        </div>
      </div>

      {/* 2. Main Open Book Viewport */}
      <div className="flex-1 p-6 md:p-8 bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div>
              <div className="text-[11px] font-sans uppercase font-bold text-amber-400/90 tracking-widest">
                {activeBook.category}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-amber-100 mt-0.5">
                {activeBook.title}
              </h3>
              <div className="text-xs text-stone-400 italic mt-0.5">
                {activeBook.subtitle}
              </div>
            </div>
            <Bookmark
              className="w-5 h-5 shrink-0"
              style={{ color: activeBook.color }}
            />
          </div>

          {/* Page Content */}
          <div className="py-2 space-y-3">
            <h4 className="font-sans font-bold text-sm text-stone-200 uppercase tracking-wide">
              § {currentPage.title}
            </h4>
            <p className="text-sm md:text-base text-stone-300 leading-relaxed indent-4">
              {currentPage.content}
            </p>
          </div>
        </div>

        {/* Page Turn Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-800 font-sans">
          <button
            type="button"
            disabled={pageIndex === 0}
            onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:pointer-events-none text-xs text-stone-200 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Page</span>
          </button>

          <span className="text-xs font-mono text-stone-400">
            — {pageIndex + 1} / {totalPages} —
          </span>

          <button
            type="button"
            disabled={pageIndex >= totalPages - 1}
            onClick={() => setPageIndex((p) => Math.min(totalPages - 1, p + 1))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:pointer-events-none text-xs text-stone-200 transition-colors"
          >
            <span>Next Page</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Bottom Book Spine Selector */}
      <div className="px-4 py-2 bg-stone-900/90 border-t border-stone-800 flex gap-2 overflow-x-auto font-sans select-none">
        {TECHNICAL_BOOKS.map((book) => {
          const isSelected = book.id === selectedBookId;
          return (
            <button
              key={book.id}
              type="button"
              onClick={() => handleSelectBook(book.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-amber-500/20 text-amber-200 border-amber-400/50 shadow-md'
                  : 'bg-stone-800/60 text-stone-400 hover:text-white border-transparent'
              }`}
            >
              <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: book.color }} />
              {book.title.split('&')[0].trim()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
