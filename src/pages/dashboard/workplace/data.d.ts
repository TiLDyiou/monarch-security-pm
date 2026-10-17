export type ProfileCard = {
  id: string;
  icon: string;
  title: string;
  description: string;
  member: string;
  updatedAt: string;
};

export type GoalType = {
  key: string;
  title: string;
  description: string;
  parValue: number;
  years: number;
  futureValue: number;
  availableCapital: number;
  achieved: boolean;
  status: string;
};
