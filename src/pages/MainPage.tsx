import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { TopBar } from '../components/TopBar';
import { SortModal } from '../components/SortModal';
import { UserCard } from '../components/UserCard';
import { fetchUsers } from '../api/users';
import type { User } from '../types/user';
import type { SortType } from '../types/filters';
import { filterUsers, sortUsers, groupByBirthdayYear } from '../utils/sortAndFilter';
import { useSessionState } from '../hooks/useSessionState';

export const MainPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useSessionState<string>('search', '');
  const [activeTab, setActiveTab] = useSessionState<string>('tab', 'all');
  const [sortType, setSortType] = useSessionState<SortType>('sort', 'alphabet');
  const [sortModalOpen, setSortModalOpen] = useState(false);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers('all');
      setUsers(data);
    } catch {
      setError('Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const visibleUsers = useMemo(() => {
    const byTab =
      activeTab === 'all'
        ? users
        : users.filter((u) => u.department === activeTab);

    const filtered = filterUsers(byTab, search);
    return sortUsers(filtered, sortType);
  }, [users, activeTab, search, sortType]);

  const grouped = useMemo(() => {
    if (sortType === 'birthday') return groupByBirthdayYear(visibleUsers);
    return [{ users: visibleUsers }];
  }, [visibleUsers, sortType]);

  if (loading) {
    return (
      <Container>
        <StatusBox>
          <Spinner />
          <p>Загрузка...</p>
        </StatusBox>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <StatusBox>
          <h2>Какой-то сверхразум все сломал</h2>
          <p>{error}</p>
          <RetryButton onClick={loadUsers}>Повторить</RetryButton>
        </StatusBox>
      </Container>
    );
  }

  return (
    <Container>
      <TopBar
        search={search}
        onSearch={setSearch}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSortClick={() => setSortModalOpen(true)}
      />

      <List>
        {visibleUsers.length === 0 ? (
          <Empty>
            <h3>Мы никого не нашли</h3>
            <p>Попробуй скорректировать запрос</p>
          </Empty>
        ) : (
          grouped.map((group, idx) => (
            <React.Fragment key={group.year ?? `group-${idx}`}>
              {group.year && <YearBlock>{group.year}</YearBlock>}
              {group.users.map((u) => (
                <UserCard key={u.id} user={u} sortType={sortType} />
              ))}
            </React.Fragment>
          ))
        )}
      </List>

      {sortModalOpen && (
        <SortModal
          current={sortType}
          onSelect={setSortType}
          onClose={() => setSortModalOpen(false)}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: #fff;
`;

const List = styled.div`
  padding-bottom: 24px;
`;

const YearBlock = styled.div`
  padding: 12px 16px 4px;
  font-size: 13px;
  color: #97979b;
  font-weight: 500;
`;

const Empty = styled.div`
  padding: 60px 24px;
  text-align: center;
  color: #050510;

  h3 {
    font-size: 18px;
    margin: 0 0 8px;
  }
  p {
    color: #97979b;
    font-size: 14px;
    margin: 0;
  }
`;

const StatusBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  text-align: center;
  color: #050510;
`;

const Spinner = styled.div`
  width: 36px;
  height: 36px;
  border: 3px solid #e6e6e6;
  border-top-color: #6534ff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 16px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const RetryButton = styled.button`
  margin-top: 16px;
  padding: 10px 24px;
  border: none;
  border-radius: 12px;
  background: #6534ff;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
`;