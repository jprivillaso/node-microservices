const { getNext } = require('./services/orders');

const timeInterval = 30000;
const sleep = async ms => new Promise(resolve => setTimeout(() => resolve(), ms));

const main = async () => {

  while (true) {

    const job = await getNext();

    try {

      if (job && job.length > 0) {

        // Simulate processing
        await sleep(timeInterval);
        console.log(job[0]);

      } else {
        console.log(`No orders to process. Idle ${timeInterval}ms ...`);
        await sleep(timeInterval);
      }

    } catch (error) {
      console.error('Error getting next job');
      await sleep(timeInterval);
    }

  }

}

main();
