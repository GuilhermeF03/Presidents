import type { StreamEvent } from '@core/model/stream/events.ts';
import type { TRPCError } from '@trpc/server';
import { type Observer, observable } from '@trpc/server/observable';
import type { StreamServices } from '@services//types.ts';

const streams: Dict<Observer<StreamEvent, TRPCError>> = {};

// Get the stream for a user
function getStream(userId: string) {
  const stream = streams[userId];
  if (!stream) {
    throw new Error('Stream not found');
  }
  return stream;
}

// Register a stream for a user
function registerStream(userId: string) {
  const stream = streams[userId];
  if (stream) {
    stream.complete();
  }

  return observable<StreamEvent>(observer => {
    streams[userId] = observer;
    return () => {
      console.log('Stream disconnected');
      delete streams[userId];
    };
  });
}

// Services to send events to the stream
const sendEvent = <T extends StreamEvent>(userId: string, event: T) => {
  const stream = getStream(userId);
  stream.next(event);
};

// Services to send errors to the stream
const sendError = (userId: string, error: TRPCError) => {
  const stream = getStream(userId);
  stream.error(error);
};

// Services to complete the stream
const sendComplete = (userId: string) => {
  const stream = getStream(userId);
  stream.complete();
};

export const streamServices : StreamServices = {
  getStream,
  registerStream,
  sendEvent,
  sendError,
  sendComplete,
}