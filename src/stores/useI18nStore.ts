import { create } from 'zustand';
import { Language, TranslationDictionary } from '@/i18n/types';
import { en } from '@/i18n/en';
import { vi } from '@/i18n/vi';

interface I18nStoreState {
  language: Language;
  t: TranslationDictionary;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const dictionaries: Record<Language, TranslationDictionary> = {
  en,
  vi,
};

const getInitialLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('THE_ROOM_LANGUAGE');
    if (saved === 'en' || saved === 'vi') return saved;
    // Auto detect from browser
    if (navigator.language.startsWith('vi')) return 'vi';
  }
  return 'en';
};

const initialLang = getInitialLanguage();

export const useI18nStore = create<I18nStoreState>((set) => ({
  language: initialLang,
  t: dictionaries[initialLang],

  setLanguage: (lang) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('THE_ROOM_LANGUAGE', lang);
    }
    set({
      language: lang,
      t: dictionaries[lang],
    });
  },

  toggleLanguage: () => {
    set((state) => {
      const nextLang = state.language === 'en' ? 'vi' : 'en';
      if (typeof window !== 'undefined') {
        localStorage.setItem('THE_ROOM_LANGUAGE', nextLang);
      }
      return {
        language: nextLang,
        t: dictionaries[nextLang],
      };
    });
  },
}));
