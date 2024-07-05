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

async function processJob(outerContainer) {
    // First we need to drill down into the actual data div to interact with it.
    const holderDiv = outerContainer.children[0];
    const dataDiv = holderDiv.children[0];
    // select it (we need to scroll into view beforehand.)
    dataDiv.scrollIntoView();
    dataDiv.click();

    await sleep(1000);
}


(async () => {
    while(true) {
        await sleep(5000);
        const jobs = await getJobs();
        for (job of jobs) {
            await processJob(job);
        }
        break;
    }
})();
