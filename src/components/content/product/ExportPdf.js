import React, { useState } from "react";
import { Button, Divider, Dropdown, Form, Input, Row, theme } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";

// Router
import { useParams } from "react-router-dom";

// Services
import { sendInventoryPdfToEmail } from "services/productService";

// Utils
import { openNotification } from "utils/utils";

// Constants
const { useToken } = theme;

const ExportPdf = ({ inventoryId }) => {
	const params = useParams();
	const { company_nit } = params;

	const [form] = Form.useForm();

	// Styles for antd Dropdown
	const { token } = useToken();
	const contentStyle = {
		backgroundColor: token.colorBgElevated,
		borderRadius: token.borderRadiusLG,
		boxShadow: token.boxShadowSecondary,
	};
	const menuStyle = {
		boxShadow: "none",
	};

	const [pdfLoading, setPdfLoading] = useState(false);

	const handleSendPdf = async (company_nit, inventoryId, body) => {
		setPdfLoading(true);
		try {
			await sendInventoryPdfToEmail(company_nit, inventoryId, body);

			openNotification("info", "Pdf enviado", "Revisa tu correo " + body.email);
		} catch (e) {
			console.log("[ProductTable] - Error enviando pdf", e.response?.data?.message);
			openNotification("error", "Error enviando pdf.", e.response?.data?.message);
		} finally {
			setPdfLoading(false);
		}
	};

	const onFinish = () => {
		form
			.validateFields()
			.then(({ email }) => {
				handleSendPdf(company_nit, inventoryId, { email });
			})
			.catch((info) => {
				console.log("[ExportPdf] - Validate Failed:", info);
			});
	};

	const emailForm = (
		<Form form={form} className="p-4 pb-0 w-80" name="send-pdf">
			<Form.Item
				name="email"
				label="Email"
				rules={[
					{
						type: "email",
						required: true,
						message: "Correo inválido!",
					},
				]}
			>
				<Input />
			</Form.Item>
		</Form>
	);

	return (
		<>
			<Dropdown
				trigger={["click"]}
				overlay={emailForm} // did what i had to do to achieve
				dropdownRender={(menu) => (
					<div style={contentStyle}>
						{React.cloneElement(menu, {
							style: menuStyle,
						})}
						<Divider
							style={{
								margin: 0,
							}}
						/>
						<Row className="p-2">
							<Button onClick={onFinish} className="ml-auto" loading={pdfLoading} type="primary">
								Enviar
							</Button>
						</Row>
					</div>
				)}
			>
				<Button
					onClick={(e) => e.preventDefault()}
					loading={pdfLoading}
					className="mb-2"
					ghost
					type="primary"
					icon={<FilePdfOutlined />}
				>
					Enviar PDF
				</Button>
			</Dropdown>
		</>
	);
};

export default ExportPdf;
