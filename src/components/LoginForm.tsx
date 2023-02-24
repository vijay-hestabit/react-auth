import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from './Button';
import TextInput from './TextInput';
import axios from 'axios';
import { apiEffectError, apiEffectSuccess } from '../errorHandler';
import { ToastContainer } from "react-toastify";


interface LoginFormProps {
	onSuccess: (params: any) => void,
	onError: (params: any) => void,
	onSubmit?: (params: any) => void
}

interface fieldsInterface {
	name: string,
	type: string,
	placeholder: string,
	rules: {
		required: string | boolean,
		minLength?: {
			value: number,
			message: string
		}
		maxLength?: {
			value: number,
			message: string
		},
		disabled?: boolean,
		setValueAs: (value: any) => any;
		shouldUnregister?: boolean;
		onChange?: (event: any) => void;
		onBlur?: (event: any) => void;
		validate?: (value: any, formValues: any) => any
	},
}

const LoginForm = (props: LoginFormProps) => {
	const [data, setData] = useState({}) as any

	const {
		handleSubmit,
		register,
		reset,
		control,
		formState: { isSubmitting, errors },
	} = useForm({ mode: 'onChange' });

	useEffect(() => {
		let value = JSON.parse(localStorage.getItem("login_with_email_provider") || '{}') as any
		setData(value)
	}, [])

	const onSubmit = (values: any) => {
		axios.post(data?.baseUrl, values)
			.then((response: any) => {
				apiEffectSuccess(response.data)
				let rm = {}
				data.fields.forEach((i: any) => {
					rm[i.name] = ""
				})
				reset(rm)
				props.onSuccess(response.data)
			}).catch((err) => {
				apiEffectError(err.response.data)
				props.onError(err.response.data)
			})
	}

	return (
		<div>
			<div>
				<form onSubmit={handleSubmit((values) => props.onSubmit ? props.onSubmit(values) : onSubmit(values))}>
					{
						data?.fields?.map((i: fieldsInterface, index: number) => {
							return (
								<div key={index}>
									<Controller
										name={i.name}
										control={control}
										render={(field) => (
											<TextInput
												{...field}
												type={i.type}
												placeholder={i.placeholder}
												errors={errors}
												{...register(`${i.name}`)}
											/>
										)}
										rules={{ required: `${i.name} is required.` }}
									/>
								</div>
							)
						})
					}

					<Button
						disabled={isSubmitting}
						className="btn btn-secondary"
						type="submit"
					>
						<span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
					</Button>
				</form>
			</div>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				style={{ zIndex: 9999999 }}
			/>
		</div>
	);
};

export default LoginForm;