import { createAction } from 'redux-actions';
import ActionTypes from './constants';

const [
  setBlockData,
  setLatestBlock,
  setRawBlockData,
  setDisplay,
  setRawTxnData,
  updateStatus,
] = [
  ActionTypes.SET_BLOCK_DATA,
  ActionTypes.SET_LATEST_BLOCK,
  ActionTypes.SET_RAW_BLOCK_DATA,
  ActionTypes.SET_DISPLAY,
  ActionTypes.SET_RAW_TXN_DATA,
  ActionTypes.UPDATE_STATUS
].map(action => createAction(action));


const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        // get stream reader
        const reader = response.body.getReader();
        return new ReadableStream({
          start(controller) {
            // define function to pump data from stream
            const pump = () => reader.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }
              // Enqueue value
              controller.enqueue(value);
              // keep pumping
              pump();
            });
            return pump();
          },
        });
      })
      // transform stream into a response
      .then(stream => new Response(stream))
      // parse to json
      .then(response => response.json())
      // set data
      .then(responseJson => resolve(responseJson))
      // set error
      .catch(err => reject(err));
  })
}


const getBlockData = () => ((dispatch, getState) => {
  // only fetch if empty
  const state = getState()
  if (state.data.status.blocks === "empty") {
    // Initialize fetching state
    dispatch(updateStatus({ label: "blocks", status: "fetching" }));
    // current time?
    const timeInMilliseconds = Date.now();
    const url = `https://blockchain.info/blocks/${timeInMilliseconds}?format=json&cors=true`
    // fetch
    fetchData(url)
      .then(responseJson => {
        dispatch(setBlockData(responseJson.blocks))
        dispatch(updateStatus({ label: "blocks", status: "done" }));
      })
      .catch(err => dispatch(updateStatus({ label: "blocks", status: "error" })));
  }
});


const getLatestBlock = () => (dispatch, getState) => {
  // change status
  dispatch(updateStatus({ label: 'latestBlock', status: 'fetching' }));
  let url = 'https://blockchain.info/latestblock?cors=true'
  // fetch
  fetchData(url)
    .then(responseJson => {
      dispatch(setLatestBlock(responseJson))
      dispatch(updateStatus({ label: "latestBlock", status: "done" }));
    })
    // set error
    .catch(err => dispatch(updateStatus({ label: 'latestBlock', status: 'error' })));
}


const getSingleBlockData = hash => ((dispatch, getState) => {
  // set display
  dispatch(setDisplay({ label: 'blockHash', value: hash }))
  // check if already fetched
  let state = getState();
  if (state.data.rawBlocks.filter(block => block.hash === hash).length === 0) {
    // if not
    // change status
    dispatch(updateStatus({ label: 'singleBlock', status: 'fetching' }));
    let url = `https://blockchain.info/rawblock/${hash}?cors=true`
    // fetch data
    fetchData(url)
      .then(responseJson => {
        // set data
        dispatch(setRawBlockData(responseJson))
        // update status
        dispatch(updateStatus({ label: 'singleBlock', status: 'done' }));
      })
      // set error
      .catch(err => dispatch(updateStatus({ label: 'singleBlock', status: 'error' })));
  }
})


const getTxnData = hash => ((dispatch, getState) => {
  // set display
  dispatch(setDisplay({ label: 'txnHash', value: hash }))
  // check if already fetched
  let state = getState();
  if (state.data.rawTxns.filter(tx => tx.hash === hash).length === 0) {
    // change status
    dispatch(updateStatus({ label: 'singleTxn', status: 'fetching' }));
    let url = `https://blockchain.info/rawtx/${hash}?cors=true`;
    // fetch data
    fetchData(url)
      .then(responseJson => {
        // set data
        dispatch(setRawTxnData(responseJson))
        // update status
        dispatch(updateStatus({ label: 'singleTxn', status: 'done' }));
      })
      // set error
      .catch(err => dispatch(updateStatus({ label: 'singleTxn', status: 'error' })));
  }
})


export {
  getBlockData,
  getLatestBlock,
  getSingleBlockData,
  getTxnData,
  setDisplay,
}
