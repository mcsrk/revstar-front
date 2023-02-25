import React from "react";

const LandingCardHeader = ({ heading, paragraph, linkName, linkUrl }) => {
	return (
		<div className="mb-10">
			<div className="flex justify-center">
				<img alt="" className="h-14 w-14" src="https://miro.medium.com/max/300/1*JY-JZfN8GW_OsJoVrI7wBg.png" />
			</div>
			<h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">{heading}</h2>
			{/* TODO: replace p tag with <Link></Link> from react router */}
			<p className="mt-2 text-center text-sm text-gray-600">
				{paragraph}
				<span to={linkUrl} className="font-medium text-cyan-600 hover:text-cyan-500 cursor-pointer">
					{linkName}
				</span>
			</p>
		</div>
	);
};

export default LandingCardHeader;
