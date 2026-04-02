function createCardMarkup(job, isSaved, isSavedSection = false) {
    const companyInitial = job.company.charAt(0).toUpperCase();
    return `
    <article class="job-card">
      <div class="company-row">
        <div class="company-logo" aria-label="${job.company} placeholder logo">${companyInitial}</div>
        <div>
          <h3>${job.title}</h3>
          <p class="company-name">${job.company}</p>
        </div>
      </div>
      <p class="meta"><strong>Salary:</strong> ${job.salary}</p>
      <p class="meta"><strong>Location:</strong> ${job.location}</p>
      <div class="badges">
        <span class="badge">${job.role}</span>
      </div>
      <button
        class="${isSavedSection ? "remove-btn" : "save-btn"} ${isSaved ? "is-saved" : ""}"
        data-id="${job.id}"
        type="button"
      >
        ${isSavedSection ? "Remove" : isSaved ? "Saved" : "Save Job"}
      </button>
    </article>
  `;
}
export function renderJobs(container, jobList, savedIds) {
    if (jobList.length === 0) {
        container.innerHTML = `<p class="empty-state">No jobs match your current filters.</p>`;
        return;
    }
    container.innerHTML = jobList
        .map((job) => createCardMarkup(job, savedIds.includes(job.id)))
        .join("");
}
export function renderSavedJobs(container, allJobs, savedIds) {
    const savedJobs = allJobs.filter((job) => savedIds.includes(job.id));
    if (savedJobs.length === 0) {
        container.innerHTML = `<p class="empty-state">No saved jobs yet. Click "Save Job" on any listing.</p>`;
        return;
    }
    container.innerHTML = savedJobs
        .map((job) => createCardMarkup(job, true, true))
        .join("");
}
