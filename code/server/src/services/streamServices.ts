import type { TRPCError } from '@trpc/server';
import { type Observer, observable } from '@trpc/server/observable';

const streams: Dict<Observer<any, TRPCError>> = {};

// Services to send
const _streamServices = () => {
  const getStream = (userId: string) => {
    const stream = streams[userId];
    if (!stream) throw new Error('Stream not found');
    return stream;
  };
  const registerStream = <T>(userId: string) => {
    const stream = streams[userId];
    if (stream) stream.complete();

    return observable<T>(observer => {
      streams[userId] = observer;
      return () => {
        console.log('Stream disconnected');
        delete streams[userId];
      };
    });
  };
  const sendEvent = <T>(userId: string, event: T) => {
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
  return { registerStream, sendEvent, sendError, sendComplete };
};
export type StreamServices = ReturnType<typeof _streamServices>;
export const streamServices = _streamServices();
