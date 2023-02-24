import React from 'react';
import useProvider, { ForgotPasswordForm } from 'react-auth';

const ForgotPassword = () => {
	const { forgotPasswordProvider } = useProvider()

	forgotPasswordProvider({
		baseUrl: "http://localhost:8080/api/v1/auth/login",
		fields: [{ name: "email", type: "text", placeholder: "Enter Your Email" }]
	})

	const onSuccess = (data: any) => {
		console.log("On Success", data)
	}

	const onError = (error: any) => {
		console.log("On Success", error)
	}

	const onSubmit = (values: any) => {
		console.log("On Submit", values)

	}
	return (
		<div>
			<ForgotPasswordForm
				onSuccess={onSuccess}
				onError={onError}
				onSubmit={onSubmit} />
		</div>
	);
}

export default ForgotPassword;
