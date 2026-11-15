import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/user';

interface Props {
  user: User;
  sortType: 'alphabet' | 'birthday';
}

const formatBirthday = (iso: string): string => {
  const d = new Date(iso);
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
  ];
  return `${d.getDate()} ${months[d.getMonth()]}`;
};

export const UserCard: React.FC<Props> = ({ user, sortType }) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/user/${user.id}`)}>
      <Avatar src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
      <Info>
        <Name>
          {user.firstName} {user.lastName}
          <Tag>{user.userTag}</Tag>
        </Name>
        <Position>{user.department}</Position>
      </Info>
      {sortType === 'birthday' && <Birthday>{formatBirthday(user.birthday)}</Birthday>}
    </Card>
  );
};

const Card = styled.article`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #f9f9f9;
  }
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: #e6e6e6;
  flex-shrink: 0;
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
`;

const Name = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #050510;
  display: flex;
  gap: 6px;
  align-items: baseline;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  font-size: 13px;
  color: #97979b;
  font-weight: 400;
`;

const Position = styled.div`
  font-size: 13px;
  color: #55555c;
  margin-top: 2px;
  text-transform: capitalize;
`;

const Birthday = styled.div`
  font-size: 12px;
  color: #97979b;
  flex-shrink: 0;
`;