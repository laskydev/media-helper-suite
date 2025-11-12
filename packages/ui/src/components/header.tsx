import * as React from 'react';
import { cn } from '../lib/utils';

const Header = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn('sticky top-0 z-50 w-full border-b bg-white shadow-sm', className)}
      {...props}
    />
  )
);
Header.displayName = 'Header';

const HeaderContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('container mx-auto flex h-16 items-center justify-between px-4', className)}
      {...props}
    />
  )
);
HeaderContainer.displayName = 'HeaderContainer';

const HeaderLogo = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-2', className)} {...props} />
  )
);
HeaderLogo.displayName = 'HeaderLogo';

const HeaderNav = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} className={cn('hidden md:flex items-center gap-6', className)} {...props} />
  )
);
HeaderNav.displayName = 'HeaderNav';

const HeaderActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-4', className)} {...props} />
  )
);
HeaderActions.displayName = 'HeaderActions';

export { Header, HeaderContainer, HeaderLogo, HeaderNav, HeaderActions };
