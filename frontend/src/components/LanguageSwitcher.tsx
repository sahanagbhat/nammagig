import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Languages } from 'lucide-react';

export const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <button
            onClick={() => setLanguage(language === 'en' ? 'kn' : 'en')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-primary-900 hover:bg-white/30 transition-all text-sm font-medium"
            title="Switch Language"
        >
            <Languages className="w-4 h-4" />
            <span>{language === 'en' ? 'ಕನ್ನಡ' : 'English'}</span>
        </button>
    );
};
