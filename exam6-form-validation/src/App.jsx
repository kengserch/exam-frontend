import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './App.css';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    username: yup.string().min(6, 'Username must be at least 6 characters').required('Username is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Must contain at least one number')
        .matches(/[@$!%*?&]/, 'Must contain at least one special character')
        .required('Password is required'),
    confirmpassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

function App() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const onSubmit = (data) => alert(JSON.stringify(data));

    return (
        <>
           <div className="fixed inset-0 flex justify-center items-center z-0">
            <div className="w-[25rem] h-auto p-4 bg-zinc-800 rounded-xl z-10 flex flex-col">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex px-4 flex-col gap-3 justify-center mt-6">
                        <h1 className="text-center text-white font-bold">REGISTER</h1>
                        <div className="w-full max-w-sm min-w-[200px]">
                            <label className="block mb-2 text-base text-white">Email</label>
                            <input
                                type="text"
                                placeholder="Email..."
                                {...register("email")}
                                onBlur={() => trigger("email")}
                                className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2"
                            />
                            <p className="text-red-500 text-sm">{errors.email?.message}</p>
                        </div>
                        <div className="w-full max-w-sm min-w-[200px]">
                            <label className="block mb-2 text-base text-white">Username</label>
                            <input
                                type="text"
                                placeholder="Username..."
                                {...register("username")}
                                onBlur={() => trigger("username")}
                                className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2"
                            />
                            <p className="text-red-500 text-sm">{errors.username?.message}</p>
                        </div>
                        <div className="w-full max-w-sm min-w-[200px]">
                            <label className="block mb-2 text-base text-white">Password</label>
                            <input
                                type="password"
                                placeholder="Password..."
                                {...register("password")}
                                onBlur={() => trigger("password")}
                                className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2"
                            />
                            <p className="text-red-500 text-sm">{errors.password?.message}</p>
                        </div>
                        <div className="w-full max-w-sm min-w-[200px]">
                            <label className="block mb-2 text-base text-white">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm Password..."
                                {...register("confirmpassword")}
                                onBlur={() => trigger("confirmpassword")}
                                className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2"
                            />
                            <p className="text-red-500 text-sm">{errors.confirmpassword?.message}</p>
                        </div>
                    </div>
                    <div className="flex p-4 justify-center mt-4">
                        <button className="py-2 w-full bg-lime-300 rounded-3xl">
                            <h1 className="text-black font-bold">Register</h1>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default App;
