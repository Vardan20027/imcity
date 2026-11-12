let handler = null;

export const listenMapPick = next => {
  handler = next;
  return () => {
    if (handler === next) {
      handler = null;
    }
  };
};

export const confirmMapPick = address => {
  if (handler) {
    handler(address);
  }
};
