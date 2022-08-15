export default function PresenterCatcher(isVuex = true) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    if (descriptor === undefined) {
      // @ts-ignore
      descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    }

    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
      try {
        // @ts-ignore
        this.onChangeState(
          isVuex
            ? {
                isLoading: true,
                isError: false
              }
            : {
                // @ts-ignore
                ...this.state,
                isLoading: true,
                isError: false
              }
        );
        const result = originalMethod.apply(this, args);
        // Check if method is asynchronous
        if (result && result instanceof Promise) {
          // Return promise
          return result
            .then(() => {
              // @ts-ignore
              this.onChangeState({ isLoading: false });
            })
            .catch((error: any) => {
              _handleError(this, error, isVuex);
            });
        }

        return result;
      } catch (error: any) {
        _handleError(this, error, isVuex);
      }
    };
    return descriptor;
  };
}

function _handleError(ctx: any, error: Error, isVuex: boolean) {
  ctx.onChangeState(isVuex
    ? {
        isError: true,
        isLoading: false
      }
    : {
        ...ctx.state,
        isLoading: false,
        isError: true
      });

  console.error('[Presenter catcher]', error);
}
