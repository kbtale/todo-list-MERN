import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const RegisterPage = () => {
    const { register, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        const success = await signIn(data);
        if (success) navigate('/oracle');
    });

    return (
        <div className="min-h-screen bg-[#FF4081] flex items-center justify-center p-6 font-bold">
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="cartoon-card w-full max-w-md p-10 bg-white"
            >
                <div className="flex items-center gap-4 mb-8">
                    <UserPlus size={40} strokeWidth={3} />
                    <h1 className="text-4xl font-black uppercase tracking-tighter">Register</h1>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="uppercase text-sm">Username</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={20} />
                            <input 
                                type="text"
                                {...register('username', { required: true })}
                                className="w-full pl-12 pr-4 py-4 border-4 border-black rounded-xl focus:outline-none focus:bg-[#FFD600] transition-colors"
                                placeholder="Username"
                            />
                        </div>
                    </div>

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
                        REGISTER
                        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-black/40 uppercase text-xs mb-2">Already have an account?</p>
                    <Link to="/login" className="text-lg border-b-4 border-black hover:bg-black hover:text-white transition-all p-1">
                        LOGIN
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterPage;