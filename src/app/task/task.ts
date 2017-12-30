export interface Task {
    title: string;
    priority: string;
    business_unit: string;
    department: string;
    description: string;
    status: string;
    date_created: Date;
    date_due: Date;
    members_assigned: {};
    tags: {};
  }