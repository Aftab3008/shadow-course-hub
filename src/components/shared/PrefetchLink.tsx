import { useQueryClient } from "@tanstack/react-query";
import { Link, LinkProps } from "react-router-dom";
import { ReactNode } from "react";

interface PrefetchLinkProps extends Omit<LinkProps, "to"> {
  children: ReactNode;
  to: string;
  prefetchQuery?: {
    queryKey: unknown[];
    queryFn: () => Promise<unknown>;
  };
}

/**
 * PrefetchLink - Link component that prefetches data on hover for instant navigation
 * Improves perceived performance by loading data before user clicks
 */
export function PrefetchLink({
  children,
  prefetchQuery,
  to,
  ...props
}: PrefetchLinkProps) {
  const queryClient = useQueryClient();

  const handleMouseEnter = () => {
    if (prefetchQuery) {
      queryClient.prefetchQuery(prefetchQuery);
    }
  };

  return (
    <Link to={to} {...props} onMouseEnter={handleMouseEnter}>
      {children}
    </Link>
  );
}

export default PrefetchLink;
