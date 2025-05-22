
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { languages, useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function LanguageSwitcher() {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex items-center hover:text-charcoal fancy-hover-effect">
        <Globe size={18} className="mr-1" />
        <span className="hidden md:inline">{t('language')}</span>
        <span className="md:hidden">{languages[language as keyof typeof languages].flag}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        {Object.keys(languages).map((lang) => (
          <DropdownMenuItem
            key={lang}
            className={`flex items-center ${
              language === lang ? 'font-medium' : ''
            }`}
            onClick={() => changeLanguage(lang)}
          >
            <span className="mr-2">
              {languages[lang as keyof typeof languages].flag}
            </span>
            {languages[lang as keyof typeof languages].nativeName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
