import type { Job, JobFilters } from "./types.js";

export function filterJobs(jobList: Job[], filters: JobFilters): Job[] {
  const normalizedSearch = filters.searchText.trim().toLowerCase();

  return jobList.filter((job) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      [job.title, job.company, job.location, job.role]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);

    const matchesCompany = filters.company === "" || job.company === filters.company;
    const matchesRole = filters.role === "" || job.role === filters.role;

    return matchesSearch && matchesCompany && matchesRole;
  });
}
