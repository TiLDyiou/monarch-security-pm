import { client, goals } from '../mock/client';
import type { GoalType, ProfileCard } from './data.d';

// These stand in for the template's `request('/api/...')` calls

export async function queryProjectNotice(): Promise<{ data: ProfileCard[] }> {
  const { husband, wife, children } = client;
  return Promise.resolve({
    data: [
      {
        id: 'husband',
        icon: 'husband',
        title: `${husband.name} · ${husband.birthYear}`,
        description: husband.job,
        member: 'Có BHXH, BHYT',
        updatedAt: `${new Date().getFullYear() - husband.birthYear} tuổi`,
      },
      {
        id: 'wife',
        icon: 'wife',
        title: `${wife.name} · ${wife.birthYear}`,
        description: wife.job,
        member: 'Có BHXH, BHYT',
        updatedAt: `${new Date().getFullYear() - wife.birthYear} tuổi`,
      },
      ...children.map((c, i) => ({
        id: `child-${i}`,
        icon: 'child',
        title: `${c.name} · ${c.birthYear}`,
        description: `Đang học tại ${c.school}`,
        member: 'Con',
        updatedAt: `${new Date().getFullYear() - c.birthYear} tuổi`,
      })),
      {
        id: 'home',
        icon: 'home',
        title: 'Nơi ở hiện tại',
        description: client.residence,
        member: 'Chưa có nhà riêng',
        updatedAt: 'Quận 2',
      },
      {
        id: 'insurance',
        icon: 'insurance',
        title: 'Bảo hiểm & gia đình',
        description: `${client.insurance}. ${client.parents}.`,
        member: 'Chưa có BHNT',
        updatedAt: '',
      },
    ],
  });
}

export async function queryActivities(): Promise<{ data: GoalType[] }> {
  return Promise.resolve({ data: goals });
}
