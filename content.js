const sleep = ms => new Promise(res => setTimeout(res, ms));

async function getJobContainer() {
    const jobContainer = document.getElementsByClassName('scaffold-layout__list-container')?.[0];
    await sleep(100);
    if (!jobContainer) {
        return await getJobContainer();
    }
    return jobContainer;
}

(async () => {
    while(true) {
        const jobContainer = await getJobContainer();
        await sleep(1000);
        console.log(jobContainer);
    }
})();
