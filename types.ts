export interface Asset {
  id: string;
  category: string;
  value: number;
  color: string;
  allocation: number; // Percentage 0-100
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetYear: number;
  icon: 'house' | 'retirement' | 'education' | 'vacation';
}

export interface ProjectionPoint {
  year: number;
  conservative: number;
  moderate: number;
  aggressive: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isLoading?: boolean;
}
