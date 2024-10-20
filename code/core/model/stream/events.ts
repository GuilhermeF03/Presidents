export type StreamData<T = unknown> = {
  event: string;
  data: T;
};

export type LeaveGameEvent = StreamData<{
  playerId: string;
  gameId: string;
}>;
