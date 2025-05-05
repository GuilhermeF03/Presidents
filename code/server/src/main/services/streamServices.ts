import type { StreamData } from '@core/model/stream/events.ts';
import type { TRPCError } from '@trpc/server';
import { type Observer, observable } from '@trpc/server/observable';

const streams: Dict<Observer<StreamData, TRPCError>> = {};

// Services to send
const _streamServices = () => {
  const getStream = (userId: string) => {
    const stream = streams[userId];
    if (!stream) {
      throw new Error('Stream not found');
    }
    return stream;
  };
  const registerStream = (userId: string) => {
    const stream = streams[userId];
    if (stream) {
      stream.complete();
    }

    return observable<StreamData>(observer => {
      streams[userId] = observer;
      return () => {
        console.log('Stream disconnected');
        delete streams[userId];
      };
    });
  };
  const sendEvent = <T extends StreamData>(userId: string, event: T) => {
    const stream = getStream(userId);
    stream.next(event);
  };
  const sendError = (userId: string, error: TRPCError) => {
    const stream = getStream(userId);
    stream.error(error);
  };
  const sendComplete = (userId: string) => {
    const stream = getStream(userId);
    stream.complete();
  };
  return { getStream, registerStream, sendEvent, sendError, sendComplete };
};
export type StreamServices = ReturnType<typeof _streamServices>;
export const streamServices = _streamServices();
