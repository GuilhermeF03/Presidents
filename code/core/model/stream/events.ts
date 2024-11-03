export type StreamEvent<T = unknown> = {
  event: string;
  data: T;
};

export type LeaveGameEvent = StreamEvent<{
  playerId: string;
  gameId: string;
}>;
