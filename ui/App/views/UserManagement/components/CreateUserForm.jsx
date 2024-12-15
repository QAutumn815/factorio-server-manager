import {useForm} from "react-hook-form";
import React from "react";
import user from "../../../../api/resources/user";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import Error from "../../../components/Error";

const CreateUserForm = ({updateUserList}) => {
    const roleValue = "admin";

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch
    } = useForm({
        values: {
            role: roleValue,
        }
    });
    const password = watch('password');

    const onSubmit = async (data) => {
        const res = await user.add(data);
        if (res) {
            updateUserList()
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <Label htmlFor="username" text="Username"/>
                <Input register={register('username', {required: true})}
                       type="text"
                       placeholder="Username"
                />
                <Error error={errors.username} message="Username is required"/>
            </div>
            <div className="mb-4">
                <Label htmlFor="role" text="Role"/>
                <Input register={register('role', {required: true})}
                       value={roleValue}
                       disabled={true}
                       placeholder="Role"
                />
                <Error error={errors.role} message="Role is required"/>
            </div>
            <div className="mb-4">
                <Label htmlFor="email" text="Email"/>
                <Input register={register('email', {required: true})}
                       type="email"
                       placeholder="Email"
                />
                <Error error={errors.email} message="Email is required"/>
            </div>
            <div className="mb-4">
                <Label htmlFor="password" text="Password"/>
                <Input register={register('password', {required: true})}
                       type="password"
                       placeholder="Password"
                />
                <Error error={errors.password} message="Password is required"/>
            </div>
            <div className="mb-4">
                <Label htmlFor="password_confirmation" text="Password Confirmation"/>
                <Input register={register('password_confirmation', {
                            required: true,
                            validate: conformation => conformation === password
                        })}

                       type="password"
                       placeholder="Password Confirmation"
                />
                <Error error={errors.password_confirmation}
                       message="Password Confirmation is required and must match the Password"/>
            </div>
            <Button isSubmit={true} type="success">Save</Button>
        </form>
    )
}

export default CreateUserForm;
