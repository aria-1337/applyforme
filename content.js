// For v1 we will only handle easy applies - can do others later.

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

    // See if it has an easy apply
    let node = dataDiv.children[0];
    node = node.querySelectorAll('.job-card-list__footer-wrapper')[0];
    node = node.querySelectorAll('.job-card-container__apply-method')?.[0];
    if (node) {
        // this is an easy apply job
        console.log('This job is an easy apply job');
    }

    await sleep(1000);
}

async function moveToNextPage() {
    await sleep(100);
    const navContainer = document.getElementsByClassName('jobs-search-pagination jobs-search-results-list__pagination pv4')[0];
    const children = navContainer.childNodes;
    for (child of children) {
        if (child.nodeName == 'BUTTON' && child.ariaLabel === 'View next page') {
            child.click();
        }
    }
}


(async () => {
    while(true) {
        await sleep(5000);
        const jobs = await getJobs();
        for (job of jobs) {
            await processJob(job);
        }
        await moveToNextPage();
        break;
    }
})();
