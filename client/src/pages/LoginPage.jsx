import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { logIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        const success = await logIn(data);
        if (success) navigate('/oracle');
    });

    return (
        <div className="min-h-screen bg-[#2979FF] flex items-center justify-center p-6 font-bold">
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="cartoon-card w-full max-w-md p-10 bg-white"
            >
                <div className="flex items-center gap-4 mb-8">
                    <LogIn size={40} strokeWidth={3} />
                    <h1 className="text-4xl font-black uppercase tracking-tighter">Login</h1>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="uppercase text-sm">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={20} />
                            <input 
                                type="email"
                                {...register('email', { required: true })}
                                className="w-full pl-12 pr-4 py-4 border-4 border-black rounded-xl focus:outline-none focus:bg-[#FFD600] transition-colors"
                                placeholder="Email"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="uppercase text-sm">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={20} />
                            <input 
                                type="password"
                                {...register('password', { required: true })}
                                className="w-full pl-12 pr-4 py-4 border-4 border-black rounded-xl focus:outline-none focus:bg-[#FFD600] transition-colors"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="cartoon-button w-full bg-black text-white py-5 text-xl flex items-center justify-center gap-3 group"
                    >
                        LOGIN
                        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-black/40 uppercase text-xs mb-2">New here?</p>
                    <Link to="/register" className="text-lg border-b-4 border-black hover:bg-black hover:text-white transition-all p-1">
                        CREATE ACCOUNT
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;