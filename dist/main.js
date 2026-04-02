import { jobs } from "./data.js";
import { filterJobs } from "./filter.js";
import { renderJobs, renderSavedJobs } from "./render.js";
import { clearSavedJobs, getSavedJobs, removeJob, toggleSavedJob } from "./saved.js";
function getRequiredElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Missing required DOM element: #${id}`);
    }
    return element;
}
const searchInput = getRequiredElement("searchInput");
const companyFilter = getRequiredElement("companyFilter");
const roleFilter = getRequiredElement("roleFilter");
const jobsContainer = getRequiredElement("job-list");
const savedContainer = getRequiredElement("saved-list");
const resultsCount = getRequiredElement("resultsCount");
const savedCount = getRequiredElement("savedCount");
const clearSavedBtn = getRequiredElement("clearSavedBtn");
function buildOptions(selectEl, label, values) {
    const uniqueSorted = [...new Set(values)].sort((a, b) => a.localeCompare(b));
    selectEl.innerHTML = `<option value="">All ${label}</option>`;
    uniqueSorted.forEach((value) => {
        selectEl.insertAdjacentHTML("beforeend", `<option value="${value}">${value}</option>`);
    });
}
buildOptions(companyFilter, "Companies", jobs.map((job) => job.company));
buildOptions(roleFilter, "Roles", jobs.map((job) => job.role));
function getFilters() {
    return {
        searchText: searchInput.value,
        company: companyFilter.value,
        role: roleFilter.value
    };
}
function syncUI() {
    const filteredJobs = filterJobs(jobs, getFilters());
    const savedIds = getSavedJobs();
    renderJobs(jobsContainer, filteredJobs, savedIds);
    renderSavedJobs(savedContainer, jobs, savedIds);
    resultsCount.textContent = String(filteredJobs.length);
    savedCount.textContent = String(savedIds.length);
}
searchInput.addEventListener("input", syncUI);
companyFilter.addEventListener("change", syncUI);
roleFilter.addEventListener("change", syncUI);
document.addEventListener("click", (event) => {
    const target = event.target;
    const idAttribute = target.getAttribute("data-id");
    if (target.classList.contains("save-btn") && idAttribute) {
        toggleSavedJob(Number(idAttribute));
        syncUI();
    }
    if (target.classList.contains("remove-btn") && idAttribute) {
        removeJob(Number(idAttribute));
        syncUI();
    }
});
clearSavedBtn.addEventListener("click", () => {
    clearSavedJobs();
    syncUI();
});
syncUI();
