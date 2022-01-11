
export const errorManager = {
  VALIDATION_ERROR: {
    responseCode: 'VALIDATION_ERROR',
    message: 'validation error',
    code: 400,
  },
  USER_NOT_FOUND: {
    responseCode: 'USER_NOT_FOUND',
    message: "We couldn't find the user. The user may have been deleted",
    code: 400,
  },
  UNAUTHORIZED: {
    responseCode: 'UNAUTHORIZED',
    message: 'You are unauthorized to perform this operation',
    code: 400,
  },
  NOT_FOUND: {
    responseCode: 'NOT_FOUND',
    message: 'API not found',
    code: 400,
  },
  UNKNOWN_ERROR: {
    responseCode: 'UNKNOWN_ERROR',
    message: 'Unknown error occured',
    code: 500,
  },
  LOW_BID: {
    responseCode: 'LOW_BID',
    message: 'Your bid must be higher than the current bid for the pet',
    code: 400,
  },
  OWNER_IS_BIDDER: {
    responseCode: 'OWNER_IS_BIDDER',
    message: 'You cannot add a bid for your own pet',
    code: 400,
  }
};

