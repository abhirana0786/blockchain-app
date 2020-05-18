// All action types
const ActionTypes = Object.keys({
  ERROR_FETCHING_DATA: null,
  SET_BLOCK_DATA: null,
  SET_LATEST_BLOCK: null,
  SET_RAW_BLOCK_DATA: null,
  SET_DISPLAY: null,
  SET_RAW_TXN_DATA: null,
  UPDATE_STATUS: null
}).reduce((acc, el) => ({ ...acc, [el]: el }), {});

export default ActionTypes;
