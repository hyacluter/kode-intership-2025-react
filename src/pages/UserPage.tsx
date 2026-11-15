import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserById } from '../api/users';
import type { User } from '../types/user';

const formatBirthday = (iso: string): string => {
  const d = new Date(iso);
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

const formatPhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11) {
    return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
  }
  return phone;
};

export const UserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchUserById(id)
      .then((u) => {
        if (!u) setError(true);
        else setUser(u);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Page>
        <TopBarPlaceholder />
        <Center>Загрузка...</Center>
      </Page>
    );
  }

  if (error || !user) {
    return (
      <Page>
        <BackBar onClick={() => navigate(-1)}>
          <Arrow>←</Arrow> Назад
        </BackBar>
        <Center>Пользователь не найден</Center>
      </Page>
    );
  }

  return (
    <Page>
      <BackBar onClick={() => navigate(-1)}>
        <Arrow>←</Arrow> Назад
      </BackBar>

      <Header>
        <BigAvatar src={user.avatarUrl} alt={user.firstName} />
        <h1>
          {user.firstName} {user.lastName}
        </h1>
        <Sub>
          {user.userTag} · {user.department}
        </Sub>
      </Header>

      <Details>
        <Row>
          <Icon>🎂</Icon>
          <span>{formatBirthday(user.birthday)}</span>
        </Row>
        <Row as="a" href={`tel:${user.phone}`}>
          <Icon>📞</Icon>
          <span>{formatPhone(user.phone)}</span>
        </Row>
      </Details>
    </Page>
  );
};

const Page = styled.div`
  min-height: 100vh;
  background: #fff;
  padding-bottom: 32px;
`;

const TopBarPlaceholder = styled.div`
  height: 64px;
`;

const BackBar = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 16px;
  font-size: 15px;
  color: #050510;
  cursor: pointer;
`;

const Arrow = styled.span`
  font-size: 18px;
`;

const Header = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px 24px 32px;

  h1 {
    font-size: 22px;
    margin: 16px 0 4px;
    color: #050510;
  }
`;

const BigAvatar = styled.img`
  width: 104px;
  height: 104px;
  border-radius: 50%;
  object-fit: cover;
  background: #e6e6e6;
`;

const Sub = styled.div`
  color: #97979b;
  font-size: 14px;
  text-transform: capitalize;
`;

const Details = styled.div`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  color: #050510;
  text-decoration: none;

  &[href] {
    cursor: pointer;
  }
`;

const Icon = styled.span`
  font-size: 18px;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  color: #97979b;
`;