import React from 'react';
import { Navigate, Outlet, useLoaderData } from 'react-router-dom';
export const PrivateRoute = ({ redirectPath, children, allowedRoles }) => {
	const data = useLoaderData();
	const role = data?.result?.role;
	if (role && allowedRoles.includes(role)) {
		return children ? <>{children}</> : <Outlet />;
	}

	return <Navigate to={redirectPath} />;
};
