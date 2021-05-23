import { useMemo } from 'react';

import { useLocation } from 'react-router';

export const useIsActualPage = (pathname: string): boolean => {

	const location = useLocation();

	const isActualPage: boolean = useMemo((): boolean => {
		return location.pathname === pathname;
	}, [location])

  return isActualPage;
};