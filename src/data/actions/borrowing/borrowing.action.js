export const SAVE_BORROWING = "SAVE_BOROWING";
export const UPDATE_BORROWING = "UPDATE_BORROWING";

export function saveBorrowing(borrowItem) {
  return {
    type: SAVE_BORROWING,
    borrowItem: borrowItem
  };
}


