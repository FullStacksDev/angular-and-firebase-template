import type { Signal } from '@angular/core';
import { noop, type Observable, type Unsubscribable } from 'rxjs';

// This reproduces the same types from @ngrx/signals (which aren't exported)
type RxMethodInput<Input> = Input | Observable<Input> | Signal<Input>;
type RxMethod<Input> = ((input: RxMethodInput<Input>) => Unsubscribable) & Unsubscribable;

export const buildRxMethodSpy = <Input>(name: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const rxMethodFn = (input: RxMethodInput<Input>) => {
    return {
      unsubscribe: noop,
    };
  };
  rxMethodFn.unsubscribe = noop;
  const spy = jasmine.createSpy<RxMethod<Input>>(name, rxMethodFn) as unknown as jasmine.Spy<
    RxMethod<Input>
  > &
    Unsubscribable;
  spy.unsubscribe = noop;
  return spy;
};
