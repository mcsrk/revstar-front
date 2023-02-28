import { Row, Skeleton, Space } from "antd";

const InventorySkeleton = () => {
	return (
		<Space direction="vertical" className="w-full">
			<Row justify="space-between">
				<Skeleton.Button active />
				<Skeleton.Button active />
			</Row>

			<Row justify="space-between">
				<Skeleton.Input active />
				<Skeleton.Input active />
			</Row>

			<Skeleton active className="mt-2" />
		</Space>
	);
};

export default InventorySkeleton;
