const STORAGE_KEY = "savedJobs";

export function getSavedJobs(): number[] {
  const rawValue = localStorage.getItem(STORAGE_KEY);
  if (!rawValue) return [];

  try {
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "number") : [];
  } catch {
    return [];
  }
}

function writeSavedJobs(savedIds: number[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
}

export function isJobSaved(jobId: number): boolean {
  return getSavedJobs().includes(jobId);
}

export function toggleSavedJob(jobId: number): number[] {
  const savedIds = getSavedJobs();
  const next = savedIds.includes(jobId)
    ? savedIds.filter((id) => id !== jobId)
    : [...savedIds, jobId];

  writeSavedJobs(next);
  return next;
}

export function removeJob(jobId: number): number[] {
  const next = getSavedJobs().filter((id) => id !== jobId);
  writeSavedJobs(next);
  return next;
}

export function clearSavedJobs(): void {
  writeSavedJobs([]);
}
