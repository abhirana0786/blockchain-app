import ActionTypes from './constants';

export const INITIAL_APP_STATE = {
    // data
    latestBlock: {},
    blocks: [],
    rawBlocks: [],
    txns: [],
    rawTxns: [],
    // ui
    display: {
      blockHash: "",
      txnHash: "",
      txnPage: 0,
    },
    status: {
      latestBlock: "empty",
      blocks: "empty",
      txns: "empty",
      singleBlock: "empty",
      singleTxn: "empty"
    }
};

/* update status */
// action = { label, status }
export const statusUpdater = (state, action) => ({
  ...state,
  status: {
    ...state.status,
    [action.payload.label]: action.payload.status
  }
});

/* set latest block */
export const latestBlockUpdater = (state, action) => ({
  ...state,
  latestBlock: action.payload,
})

/* set block data */
export const blockDataUpdater = (state, action) => ({
  ...state,
  blocks: action.payload,
})

/* set raw block data */
export const rawBlockDataUpdater = (state, action) => {
  let newRawBlocks = state.rawBlocks;
  newRawBlocks.push(action.payload);
  return ({
    ...state,
    rawBlocks: newRawBlocks
  })
}

/* set display data */
// action = { label, value }
export const displayDataUpdater = (state, action) => ({
  ...state,
  display: {
    ...state.display,
    [action.payload.label]: action.payload.value
  }
})

/* set Txn data */
export const rawTxnUpdater = (state, action) => {
  let newRawTxns = state.rawTxns;
  newRawTxns.push(action.payload);
  return ({
    ...state,
    rawTxns: newRawTxns
  })
}

export default {
  [ActionTypes.SET_BLOCK_DATA]: blockDataUpdater,
  [ActionTypes.SET_LATEST_BLOCK]: latestBlockUpdater,
  [ActionTypes.SET_RAW_BLOCK_DATA]: rawBlockDataUpdater,
  [ActionTypes.SET_DISPLAY]: displayDataUpdater,
  [ActionTypes.SET_RAW_TXN_DATA]: rawTxnUpdater,
  [ActionTypes.UPDATE_STATUS]: statusUpdater,
};