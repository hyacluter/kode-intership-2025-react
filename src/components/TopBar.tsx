import React from 'react';
import styled from 'styled-components';
import { DEPARTMENTS } from '../constants/departments';

interface Props {
  search: string;
  onSearch: (value: string) => void;
  activeTab: string;
  onTabChange: (key: string) => void;
  onSortClick: () => void;
}

export const TopBar: React.FC<Props> = ({
  search,
  onSearch,
  activeTab,
  onTabChange,
  onSortClick,
}) => {
  return (
    <Wrapper>
      <SearchRow>
        <SearchBox>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.35-4.35"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Поиск"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </SearchBox>
        <SortButton onClick={onSortClick} aria-label="Сортировка">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M7 12h10M10 18h4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </SortButton>
      </SearchRow>

      <Tabs>
        {DEPARTMENTS.map((d) => (
          <Tab
            key={d.key}
            $active={activeTab === d.key}
            onClick={() => onTabChange(d.key)}
          >
            {d.title}
          </Tab>
        ))}
      </Tabs>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: #ffffff;
  padding: 12px 16px 0;
  box-shadow: 0 1px 0 #e6e6e6;
`;

const SearchRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

const SearchBox = styled.label`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f2f2f2;
  border-radius: 12px;
  padding: 8px 12px;
  color: #7a7a7a;

  input {
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    font-size: 14px;
    color: #111;
  }
`;

const SortButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background: #f2f2f2;
  color: #111;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #e6e6e6;
  }
`;

const Tabs = styled.nav`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  padding: 6px 14px;
  font-size: 13px;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  background: ${({ $active }) => ($active ? '#6534ff' : '#f2f2f2')};
  color: ${({ $active }) => ($active ? '#fff' : '#7a7a7a')};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  transition: all 0.15s;
`;