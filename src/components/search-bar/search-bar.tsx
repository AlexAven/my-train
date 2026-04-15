'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import styles from './search-bar.module.css';

const SearchBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchQuery = searchParams.get('search');

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term.trim()) {
      params.set('search', term.trim());
    } else {
      params.delete('search');
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <>
      <input
        className={styles.search}
        type="search"
        placeholder="Поиск по имени..."
        defaultValue={searchQuery ?? ''}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {searchQuery && <p className={styles.result}>Найдено по запросу «{searchQuery}»:</p>}
    </>
  );
};

export default SearchBar;
