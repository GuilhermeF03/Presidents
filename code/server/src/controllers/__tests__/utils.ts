import type { CoreServices, GameServices } from '@/services/types';
import { createInjectedContext } from '@/trpc/trpc.ts';
import { TRPCError } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import type { Context } from 'hono';
import { deepEqual, instance, mock, when } from 'ts-mockito';
import type { ZodIssue } from 'zod';
import { createCaller } from '../rootRouter';

/**
 * Creates a mock context for testing TRPC procedures
 * @param services
 * @returns
 */
const mockContext = (services: CoreServices) => {
  const contextFactory = createInjectedContext(services, () => {
    return {
      injection: {
        services,
      },
    };
  });
  return contextFactory({} as FetchCreateContextFnOptions, {} as Context);
};

/**
 * Creates a mock caller for testing TRPC procedures
 * @param services
 * @returns
 */
export const mockCaller = (services: CoreServices) => {
  /**
   * Creates a mock context for testing TRPC procedures
   * @param services
   * @returns
   */ const context = mockContext(services);
  return createCaller(context);
};

/**
 * Creates a mock services object for testing TRPC procedures
 * @param handler - Function to handle the mock services
 * @returns
 */
export const mockServices = (handler: (serviceMocks: CoreServices) => CoreServices = m => m): CoreServices => {
  const services: CoreServices = {
    game: mock<GameServices>(),
  };

  const finalMocks = handler(services);

  for (const key of Object.keys(finalMocks) as (keyof CoreServices)[]) {
    finalMocks[key] = instance(finalMocks[key]);
  }

  return finalMocks;
};

/**
 * Utility function to expect a validation error
 * @param e
 * @param expectedIssues
 */
export const expectValidationError = (e: unknown, expectedIssues: Partial<ZodIssue>[]) => {
  expect(e).toBeInstanceOf(TRPCError);
  const error = e as TRPCError;
  expect(error.code).toBe('BAD_REQUEST');

  const data = JSON.parse(error.message) as ZodIssue[];
  expectedIssues.forEach((issue, index) => {
    expect(data[index]).toBeDefined();
    expect(data[index]).toMatchObject(issue);
  });
};
