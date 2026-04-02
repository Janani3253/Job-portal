export interface Job {
  id: number;
  title: string;
  company: string;
  salary: string;
  location: string;
  role: string;
}

export interface JobFilters {
  searchText: string;
  company: string;
  role: string;
}
