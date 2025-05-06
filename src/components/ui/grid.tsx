import { cn } from '@/lib/utils';
import { gridColumns } from '@/lib/responsive-utils';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const gapMap = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

const colMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
};

export function Grid({
  children,
  className,
  cols = 12,
  gap = 'md',
  ...props
}: GridProps) {
  return (
    <div
      className={cn(
        'grid',
        colMap[cols],
        gapMap[gap],
        'sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  start?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export function GridItem({
  children,
  className,
  span = 1,
  start,
  ...props
}: GridItemProps) {
  return (
    <div
      className={cn(
        `col-span-${span}`,
        start && `col-start-${start}`,
        'sm:col-span-6 md:col-span-8 lg:col-span-12',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 