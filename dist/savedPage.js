import { jobs } from "./data.js";
import { renderSavedJobs } from "./render.js";
import { clearSavedJobs, getSavedJobs, removeJob } from "./saved.js";
const container = document.getElementById("saved-list");
const savedCount = document.getElementById("savedCount");
const clearButton = document.getElementById("clearSavedBtn");
if (container && savedCount && clearButton) {
    const refreshSaved = () => {
        const savedIds = getSavedJobs();
        renderSavedJobs(container, jobs, savedIds);
        savedCount.textContent = String(savedIds.length);
    };
    document.addEventListener("click", (event) => {
        const target = event.target;
        const jobId = target.getAttribute("data-id");
        if (target.classList.contains("remove-btn") && jobId) {
            removeJob(Number(jobId));
            refreshSaved();
        }
    });
    clearButton.addEventListener("click", () => {
        clearSavedJobs();
        refreshSaved();
    });
    refreshSaved();
}
