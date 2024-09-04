export type ClassItemProps = {
    index: number;
    classData: {
      name: string;
      date: string;
      staffName: string;
      staffImage: string;
      action?: string;
      countdown?: string;
      daysLeft?: number;
      isLive?: boolean;
      isActive?: boolean;
    };
  };