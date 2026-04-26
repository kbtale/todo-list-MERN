import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors: formErrors } } = useForm();
    const { logIn, errors: backendErrors, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/oracle');
    }, [isAuthenticated, navigate]);

    const onSubmit = handleSubmit(async (data) => {
        await logIn(data);
    });

    return (
        <div className="min-h-screen bg-[#2979FF] flex items-center justify-center p-6 font-bold">
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="cartoon-card w-full max-w-md p-8 md:p-10 bg-white border-4 border-black"
            >
                <div className="flex items-center gap-4 mb-8">
                    <LogIn size={40} strokeWidth={3} />
                    <h1 className="text-4xl font-black uppercase tracking-tighter">Login</h1>
                </div>

                <AnimatePresence>
                    {backendErrors.map((error, i) => (
                        <motion.div
                            key={i}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-red-500 text-white p-3 mb-4 rounded-xl border-4 border-black flex items-center gap-2 overflow-hidden text-sm font-black"
                        >
                            <AlertCircle size={18} />
                            {error}
                        </motion.div>
                    ))}
                </AnimatePresence>

                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="uppercase text-xs font-black">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={20} />
                            <input 
                                type="email"
                                {...register('email', { required: "Email is required" })}
                                className="w-full pl-12 pr-4 py-4 border-4 border-black rounded-xl focus:outline-none focus:bg-[#FFD600] transition-colors"
                                placeholder="name@domain.com"
                            />
                        </div>
                        {formErrors.email && <p className="text-red-600 text-xs mt-1 uppercase">{formErrors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="uppercase text-xs font-black">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={20} />
                            <input 
                                type="password"
                                {...register('password', { required: "Password is required" })}
                                className="w-full pl-12 pr-4 py-4 border-4 border-black rounded-xl focus:outline-none focus:bg-[#FFD600] transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                        {formErrors.password && <p className="text-red-600 text-xs mt-1 uppercase">{formErrors.password.message}</p>}
                    </div>

                    <button 
                        type="submit"
                        className="cartoon-button w-full bg-black text-white py-5 text-xl flex items-center justify-center gap-3 group border-4 border-black"
                    >
                        LOGIN
                        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </form>

                <div className="mt-8 text-center pt-8 border-t-4 border-black border-dashed">
                    <p className="text-black/40 uppercase text-[10px] mb-2 font-black">Missing an account?</p>
                    <Link to="/register" className="text-lg font-black bg-white border-4 border-black hover:bg-black hover:text-white transition-all px-4 py-2 inline-block rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        REGISTER NOW
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;