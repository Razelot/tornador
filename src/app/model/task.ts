import { BusinessUnit } from "../model/businessUnit";
import { Priority } from "../model/priority";
import { Department } from "../model/department";

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
    attachment_URL: string[];
  }