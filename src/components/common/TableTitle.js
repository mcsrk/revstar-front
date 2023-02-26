import { Button, Row } from "antd";

const TableTitle = ({ title, btnTitle, btnAction, icon = null }) => {
	return (
		<Row justify="space-between" className="align-top">
			<div className="text-xl sm:text-2xl font-bold">{title}</div>
			{btnTitle && btnAction && (
				<Button type="primary" onClick={btnAction} icon={icon}>
					{btnTitle}
				</Button>
			)}
		</Row>
	);
};

export default TableTitle;
