import { Observable } from "./observable";

describe("subscribe", () => {
  it("should be synchronous", () => {
    let subscribed = false;
    let nexted: string;
    let completed: boolean;
    const source = new Observable<string>(observer => {
      subscribed = true;
      observer.next("wee");
      expect(nexted).toEqual("wee");
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
      }
    });

    expect(mutatedByNext).toBe(true);
    expect(mutatedByComplete).toBe(true);
  });

  it("should work when subscribe is called with no arguments", () => {
    const source = new Observable<string>(subscriber => {
      subscriber.next("foo");
      subscriber.complete();
    });

    source.subscribe();
  });

  // it("should not be unsubscribed when other empty subscription completes", () => {
  //   let unsubscribeCalled = false;
  //   const source = new Observable<number>(() => {
  //     return () => {
  //       unsubscribeCalled = true;
  //     };
  //   });

  //   source.subscribe();

  //   expect(unsubscribeCalled).to.be.false;

  //   Observable.empty().subscribe();

  //   expect(unsubscribeCalled).to.be.false;
  // });

  // it("should not be unsubscribed when other subscription with same observer completes", () => {
  //   let unsubscribeCalled = false;
  //   const source = new Observable<number>(() => {
  //     return () => {
  //       unsubscribeCalled = true;
  //     };
  //   });

  //   let observer = {
  //     next: function() {
  //       /*noop*/
  //     }
  //   };

  //   source.subscribe(observer);

  //   expect(unsubscribeCalled).to.be.false;

  //   Observable.empty().subscribe(observer);

  //   expect(unsubscribeCalled).to.be.false;
  // });

  // it("should run unsubscription logic when an error is sent asynchronously and subscribe is called with no arguments", done => {
  //   const sandbox = sinon.sandbox.create();
  //   const fakeTimer = sandbox.useFakeTimers();

  //   let unsubscribeCalled = false;
  //   const source = new Observable<number>(observer => {
  //     const id = setInterval(() => {
  //       observer.error(0);
  //     }, 1);
  //     return () => {
  //       clearInterval(id);
  //       unsubscribeCalled = true;
  //     };
  //   });

  //   source.subscribe({
  //     error(err) {
  //       /* noop: expected error */
  //     }
  //   });

  //   setTimeout(() => {
  //     let err;
  //     let errHappened = false;
  //     try {
  //       expect(unsubscribeCalled).to.be.true;
  //     } catch (e) {
  //       err = e;
  //       errHappened = true;
  //     } finally {
  //       if (!errHappened) {
  //         done();
  //       } else {
  //         done(err);
  //       }
  //     }
  //   }, 100);

  //   fakeTimer.tick(110);
  //   sandbox.restore();
  // });

  // it("should return a Subscription that calls the unsubscribe function returned by the subscriber", () => {
  //   let unsubscribeCalled = false;

  //   const source = new Observable<number>(() => {
  //     return () => {
  //       unsubscribeCalled = true;
  //     };
  //   });

  //   const sub = source.subscribe(() => {
  //     //noop
  //   });
  //   expect(sub instanceof Rx.Subscription).to.be.true;
  //   expect(unsubscribeCalled).to.be.false;
  //   expect(sub.unsubscribe).to.be.a("function");

  //   sub.unsubscribe();
  //   expect(unsubscribeCalled).to.be.true;
  // });

  // it("should ignore next messages after unsubscription", done => {
  //   let times = 0;

  //   const subscription = new Observable<number>(observer => {
  //     let i = 0;
  //     const id = setInterval(() => {
  //       observer.next(i++);
  //     });

  //     return () => {
  //       clearInterval(id);
  //       expect(times).to.equal(2);
  //       done();
  //     };
  //   })
  //     .do(() => (times += 1))
  //     .subscribe(function() {
  //       if (times === 2) {
  //         subscription.unsubscribe();
  //       }
  //     });
  // });

  // it("should ignore error messages after unsubscription", done => {
  //   let times = 0;
  //   let errorCalled = false;

  //   const subscription = new Observable<number>(observer => {
  //     let i = 0;
  //     const id = setInterval(() => {
  //       observer.next(i++);
  //       if (i === 3) {
  //         observer.error(new Error());
  //       }
  //     });

  //     return () => {
  //       clearInterval(id);
  //       expect(times).to.equal(2);
  //       expect(errorCalled).to.be.false;
  //       done();
  //     };
  //   })
  //     .do(() => (times += 1))
  //     .subscribe(
  //       function() {
  //         if (times === 2) {
  //           subscription.unsubscribe();
  //         }
  //       },
  //       function() {
  //         errorCalled = true;
  //       }
  //     );
  // });

  // it("should ignore complete messages after unsubscription", done => {
  //   let times = 0;
  //   let completeCalled = false;

  //   const subscription = new Observable<number>(observer => {
  //     let i = 0;
  //     const id = setInterval(() => {
  //       observer.next(i++);
  //       if (i === 3) {
  //         observer.complete();
  //       }
  //     });

  //     return () => {
  //       clearInterval(id);
  //       expect(times).to.equal(2);
  //       expect(completeCalled).to.be.false;
  //       done();
  //     };
  //   })
  //     .do(() => (times += 1))
  //     .subscribe(
  //       function() {
  //         if (times === 2) {
  //           subscription.unsubscribe();
  //         }
  //       },
  //       null,
  //       function() {
  //         completeCalled = true;
  //       }
  //     );
  // });

  // describe("when called with an anonymous observer", () => {
  //   it(
  //     "should accept an anonymous observer with just a next function and call the next function in the context" +
  //       " of the anonymous observer",
  //     done => {
  //       //intentionally not using lambda to avoid typescript's this context capture
  //       const o = {
  //         myValue: "foo",
  //         next(x: any) {
  //           expect(this.myValue).to.equal("foo");
  //           expect(x).to.equal(1);
  //           done();
  //         }
  //       };

  //       Observable.of(1).subscribe(o);
  //     }
  //   );

  //   it(
  //     "should accept an anonymous observer with just an error function and call the error function in the context" +
  //       " of the anonymous observer",
  //     done => {
  //       //intentionally not using lambda to avoid typescript's this context capture
  //       const o = {
  //         myValue: "foo",
  //         error(err: any) {
  //           expect(this.myValue).to.equal("foo");
  //           expect(err).to.equal("bad");
  //           done();
  //         }
  //       };

  //       Observable.throwError("bad").subscribe(o);
  //     }
  //   );

  //   it(
  //     "should accept an anonymous observer with just a complete function and call the complete function in the" +
  //       " context of the anonymous observer",
  //     done => {
  //       //intentionally not using lambda to avoid typescript's this context capture
  //       const o = {
  //         myValue: "foo",
  //         complete: function complete() {
  //           expect(this.myValue).to.equal("foo");
  //           done();
  //         }
  //       };

  //       Observable.empty().subscribe(o);
  //     }
  //   );

  //   it("should accept an anonymous observer with no functions at all", () => {
  //     expect(() => {
  //       Observable.empty().subscribe(<any>{});
  //     }).not.to.throw();
  //   });

  //   it("should ignore next messages after unsubscription", done => {
  //     let times = 0;

  //     const subscription = new Observable<number>(observer => {
  //       let i = 0;
  //       const id = setInterval(() => {
  //         observer.next(i++);
  //       });

  //       return () => {
  //         clearInterval(id);
  //         expect(times).to.equal(2);
  //         done();
  //       };
  //     })
  //       .do(() => (times += 1))
  //       .subscribe({
  //         next() {
  //           if (times === 2) {
  //             subscription.unsubscribe();
  //           }
  //         }
  //       });
  //   });

  //   it("should ignore error messages after unsubscription", done => {
  //     let times = 0;
  //     let errorCalled = false;

  //     const subscription = new Observable<number>(observer => {
  //       let i = 0;
  //       const id = setInterval(() => {
  //         observer.next(i++);
  //         if (i === 3) {
  //           observer.error(new Error());
  //         }
  //       });
  //       return () => {
  //         clearInterval(id);
  //         expect(times).to.equal(2);
  //         expect(errorCalled).to.be.false;
  //         done();
  //       };
  //     })
  //       .do(() => (times += 1))
  //       .subscribe({
  //         next() {
  //           if (times === 2) {
  //             subscription.unsubscribe();
  //           }
  //         },
  //         error() {
  //           errorCalled = true;
  //         }
  //       });
  //   });

  //   it("should ignore complete messages after unsubscription", done => {
  //     let times = 0;
  //     let completeCalled = false;

  //     const subscription = new Observable<number>(observer => {
  //       let i = 0;
  //       const id = setInterval(() => {
  //         observer.next(i++);
  //         if (i === 3) {
  //           observer.complete();
  //         }
  //       });

  //       return () => {
  //         clearInterval(id);
  //         expect(times).to.equal(2);
  //         expect(completeCalled).to.be.false;
  //         done();
  //       };
  //     })
  //       .do(() => (times += 1))
  //       .subscribe({
  //         next() {
  //           if (times === 2) {
  //             subscription.unsubscribe();
  //           }
  //         },
  //         complete() {
  //           completeCalled = true;
  //         }
  //       });
  //   });
  // });

  // describe("config.useDeprecatedSynchronousErrorHandling", () => {
  //   it("should log when it is set and unset", () => {
  //     const _log = console.log;
  //     const logCalledWith: any[][] = [];
  //     console.log = (...args: any[]) => {
  //       logCalledWith.push(args);
  //     };

  //     const _warn = console.warn;
  //     const warnCalledWith: any[][] = [];
  //     console.warn = (...args: any[]) => {
  //       warnCalledWith.push(args);
  //     };

  //     Rx.config.useDeprecatedSynchronousErrorHandling = true;
  //     expect(warnCalledWith.length).to.equal(1);

  //     Rx.config.useDeprecatedSynchronousErrorHandling = false;
  //     expect(logCalledWith.length).to.equal(1);

  //     console.log = _log;
  //     console.warn = _warn;
  //   });
  // });

  // describe("if config.useDeprecatedSynchronousErrorHandling === true", () => {
  //   beforeEach(() => {
  //     const _warn = console.warn;
  //     console.warn = noop;
  //     Rx.config.useDeprecatedSynchronousErrorHandling = true;
  //     console.warn = _warn;
  //   });

  //   it("should throw synchronously", () => {
  //     expect(() => Observable.throwError(new Error()).subscribe()).to.throw();
  //   });

  //   it("should rethrow if sink has syncErrorThrowable = false", () => {
  //     const observable = new Observable(observer => {
  //       observer.next(1);
  //     });

  //     const sink = Rx.Subscriber.create(() => {
  //       throw "error!";
  //     });

  //     expect(() => {
  //       observable.subscribe(sink);
  //     }).to.throw("error!");
  //   });

  //   afterEach(() => {
  //     const _log = console.log;
  //     console.log = noop;
  //     Rx.config.useDeprecatedSynchronousErrorHandling = false;
  //     console.log = _log;
  //   });
  // });
});
