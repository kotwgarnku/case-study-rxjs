import { Observable } from './observable';

// TODO: refactor
describe('Observable', () => {
  it('should be synchronous', () => {
    let subscribed = false;
    let nexted: string;
    let completed: boolean;
    const source = new Observable<string>((observer) => {
      subscribed = true;
      observer.next('wee');
      expect(nexted).toEqual('wee');
      observer.complete();
      expect(completed).toBe(true);
    });

    expect(subscribed).toBe(false);

    let mutatedByNext = false;
    let mutatedByComplete = false;

    source.subscribe({
      next: (x: string) => {
        nexted = x;
        mutatedByNext = true;
      },
      complete: () => {
        completed = true;
        mutatedByComplete = true;
      },
    });

    expect(mutatedByNext).toBe(true);
    expect(mutatedByComplete).toBe(true);
  });

  it('should work when subscribe is called with no arguments', () => {
    const source = new Observable<string>((subscriber) => {
      subscriber.next('foo');
      subscriber.complete();
    });

    source.subscribe();
  });

  it('should ignore next messages after unsubscription', (done) => {
    let times = 0;

    const subscription = new Observable<number>((observer) => {
      let i = 0;
      const id = setInterval(() => {
        observer.next(i++);
      }, 0);

      return () => {
        clearInterval(id);
        expect(times).toEqual(2);
        done();
      };
    }).subscribe({
      next() {
        times += 1;
        if (times === 2) {
          subscription.unsubscribe();
        }
      },
    });
  });

  it('should ignore error messages after unsubscription', (done) => {
    let times = 0;
    let errorCalled = false;

    const subscription = new Observable<number>((observer) => {
      let i = 0;
      const id = setInterval(() => {
        observer.next(i++);
        if (i === 3) {
          observer.error(new Error());
        }
      }, 0);

      return () => {
        clearInterval(id);
        expect(times).toEqual(2);
        expect(errorCalled).toBe(false);
        done();
      };
    }).subscribe({
      next() {
        times += 1;
        if (times === 2) {
          subscription.unsubscribe();
        }
      },
      error() {
        errorCalled = true;
      },
    });
  });

  it('should ignore complete messages after unsubscription', (done) => {
    let times = 0;
    let completeCalled = false;

    const subscription = new Observable<number>((observer) => {
      let i = 0;
      const id = setInterval(() => {
        observer.next(i++);
        if (i === 3) {
          observer.complete();
        }
      }, 0);

      return () => {
        clearInterval(id);
        expect(times).toEqual(2);
        expect(completeCalled).toBe(false);
        done();
      };
    }).subscribe({
      next() {
        times += 1;
        if (times === 2) {
          subscription.unsubscribe();
        }
      },
      error: null,
      complete() {
        completeCalled = true;
      },
    });
  });

  describe('when called with an anonymous observer', () => {
    it(
      'should accept an anonymous observer with just a next function and call the next function in the context' +
        ' of the anonymous observer',
      (done) => {
        //intentionally not using lambda to avoid typescript's this context capture
        const o = {
          myValue: 'foo',
          next(x: any) {
            expect(this.myValue).toEqual('foo');
            expect(x).toEqual(1);
            done();
          },
        };

        new Observable(function(observer) {
          observer.next(1);
        }).subscribe(o);
      }
    );

    it(
      'should accept an anonymous observer with just an error function and call the error function in the context' +
        ' of the anonymous observer',
      (done) => {
        //intentionally not using lambda to avoid typescript's this context capture
        const o = {
          myValue: 'foo',
          error(err: any) {
            expect(this.myValue).toEqual('foo');
            expect(err).toEqual('bad');
            done();
          },
        };

        new Observable(function() {
          throw 'bad';
        }).subscribe(o);
      }
    );

    it(
      'should accept an anonymous observer with just a complete function and call the complete function in the' +
        ' context of the anonymous observer',
      (done) => {
        //intentionally not using lambda to avoid typescript's this context capture
        const o = {
          myValue: 'foo',
          complete: function complete() {
            expect(this.myValue).toEqual('foo');
            done();
          },
        };

        new Observable(function(observer) {
          observer.complete();
        }).subscribe(o);
      }
    );
  });

  it('should accept an anonymous observer with no functions at all', () => {
    const harnessFn = () => {
      new Observable().subscribe({} as any);
    };
    expect(harnessFn).not.toThrow();
  });
});
