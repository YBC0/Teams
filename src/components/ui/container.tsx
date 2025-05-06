import { cn } from '@/lib/utils';
import { containerMaxWidths } from '@/lib/responsive-utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof containerMaxWidths;
  fluid?: boolean;
}

export function Container({
  children,
  className,
  size = 'xl',
  fluid = false,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        !fluid && `max-w-[${containerMaxWidths[size]}]`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 