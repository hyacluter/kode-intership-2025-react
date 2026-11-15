import React from 'react';
import styled from 'styled-components';
import type { SortType } from '../types/filters';

interface Props {
  current: SortType;
  onSelect: (type: SortType) => void;
  onClose: () => void;
}

const OPTIONS: { key: SortType; label: string }[] = [
  { key: 'alphabet', label: 'По алфавиту' },
  { key: 'birthday', label: 'По дню рождения' },
];

export const SortModal: React.FC<Props> = ({ current, onSelect, onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <Sheet onClick={(e) => e.stopPropagation()}>
        <Title>Сортировка</Title>
        {OPTIONS.map((opt) => (
          <Option
            key={opt.key}
            onClick={() => {
              onSelect(opt.key);
              onClose();
            }}
            $active={current === opt.key}
          >
            <span>{opt.label}</span>
            <Radio $active={current === opt.key} />
          </Option>
        ))}
      </Sheet>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: flex-end;
  z-index: 100;

  @media (min-width: 600px) {
    align-items: center;
    justify-content: center;
  }
`;

const Sheet = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 20px 20px 0 0;
  padding: 20px 16px 28px;

  @media (min-width: 600px) {
    max-width: 380px;
    border-radius: 20px;
  }
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px;
  text-align: center;
  color: #050510;
`;

const Option = styled.button<{ $active: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  padding: 14px 4px;
  font-size: 15px;
  color: ${({ $active }) => ($active ? '#6534ff' : '#050510')};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  cursor: pointer;
`;

const Radio = styled.span<{ $active: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${({ $active }) => ($active ? '#6534ff' : '#c3c3c6')};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 50%;
    background: ${({ $active }) => ($active ? '#6534ff' : 'transparent')};
  }
`;