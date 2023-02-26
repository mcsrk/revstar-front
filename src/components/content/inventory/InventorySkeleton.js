import { Skeleton } from "antd";
import React from "react";

const InventorySkeleton = () => {
	return (
		<>
			<Skeleton.Button active />
			<br />
			<br />
			<Skeleton.Input active />
			<br />
			<Skeleton active />
		</>
	);
};

export default InventorySkeleton;
