import { Button, Row } from "antd";

const TableTitle = ({ title, btnTitle, btnAction, icon = null }) => {
	return (
		<Row justify="space-between">
			<h1 className="text-xl  sm:text-2xl font-bold">{title}</h1>
			{btnTitle && btnAction && (
				<Button onClick={btnAction} icon={icon}>
					{btnTitle}
				</Button>
			)}
		</Row>
	);
};

export default TableTitle;
