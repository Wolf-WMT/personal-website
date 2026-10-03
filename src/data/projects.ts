export type ProjectCategory = 'SECURITY' | 'PYTHON' | 'LINUX' | 'WEB' | 'OTHER';
export type ProjectStatus = 'ACTIVE' | 'ARCHIVED' | 'IN PROGRESS';

export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  isPlaceholder: boolean;
}

export const projectCategories: ('ALL' | ProjectCategory)[] = [
  'ALL', 'SECURITY', 'PYTHON', 'LINUX', 'WEB', 'OTHER',
];

// Architecture is ready for adding real projects.
// Add your completed projects to this array when available.
export const projects: Project[] = [];
