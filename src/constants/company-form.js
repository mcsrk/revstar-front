import { Form, Select } from "antd";

const { Option } = Select;

export const phonePrefixRaw = [
	{ val: 1, tag: "+1" },
	{ val: 57, tag: "+57" },
];

export const phonePrefixOptions = (
	<Form.Item name="prefix" noStyle>
		<Select className="w-20">
			{phonePrefixRaw.map(({ val, tag }) => (
				<Option key={val} value={val}>
					{tag}
				</Option>
			))}
		</Select>
	</Form.Item>
);
