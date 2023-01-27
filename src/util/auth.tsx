import React, { FC, ComponentType } from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../component/Loading';

// eslint-disable-next-line @typescript-eslint/ban-types
export function authWrapper<P extends object>(component: ComponentType<P>): FC<P> {
  return withAuthenticationRequired(component, {
    onRedirecting: () => <Loading />
  });
}
