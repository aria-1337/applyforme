const sleep = ms => new Promise(res => setTimeout(res, ms));

// @getJobContainer()
// Entry point - gets the UL containing al LI with each individual job item on the left hand scroll bar.
// returns-> all the children in the container.
async function getJobs() {
    const jobContainer = document.getElementsByClassName('scaffold-layout__list-container')?.[0];
    await sleep(100);
    if (!jobContainer) {
        return await getJobs();
    }
    const jobs = [];
    const children = jobContainer.childNodes;
    for (child of children) {
        if (child.nodeName == 'LI') {
            jobs.push(child);
        }
    }
    return jobs;
}


(async () => {
    while(true) {
        const jobs = await getJobs();
        console.log(jobs);
        break;
    }
})();
