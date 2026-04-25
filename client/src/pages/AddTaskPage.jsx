import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Target, BookOpen, Brain, Heart, ArrowRight } from 'lucide-react';

const AddTaskPage = () => {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      priority: 'medium',
      energyLevel: 3,
      category: 'life'
    }
  });
  const navigate = useNavigate();

  const energyLevel = watch('energyLevel');
  const category = watch('category');
  const priority = watch('priority');

  const onSubmit = async (data) => {
    try {
      await axios.post('/api/tasks', data);
      navigate('/oracle');
    } catch (error) {
      console.error(error);
    }
  };

  const categories = [
    { id: 'deep-work', icon: <Brain />, color: 'bg-blue-400' },
    { id: 'learning', icon: <BookOpen />, color: 'bg-green-400' },
    { id: 'health', icon: <Heart />, color: 'bg-red-400' },
    { id: 'quick-fix', icon: <Sparkles />, color: 'bg-yellow-400' },
    { id: 'life', icon: <Target />, color: 'bg-purple-400' },
  ];

  const priorities = ['low', 'medium', 'high', 'urgent'];

  return (
    <div className="min-h-screen bg-[#2979FF] p-6 flex flex-col items-center justify-center font-bold">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="cartoon-card w-full max-w-3xl p-12 bg-white"
      >
        <h1 className="text-5xl font-black uppercase mb-12 tracking-tighter italic">
          The Ritual
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          {/* Natural Language Sentence */}
          <div className="text-3xl md:text-4xl leading-relaxed font-black uppercase">
            I NEED TO 
            <input 
              {...register('title', { required: true })}
              placeholder="DO SOMETHING..."
              className="mx-2 border-b-8 border-black focus:outline-none placeholder:text-black/10 w-full md:w-auto min-w-[200px]"
            />
            <br />
            WHICH IS 
            <select 
              {...register('description')}
              className="mx-2 border-b-8 border-black focus:outline-none bg-transparent cursor-pointer"
            >
              <option value="A NECESSARY BURDEN">A NECESSARY BURDEN</option>
              <option value="A STEP TOWARD GROWTH">A STEP TOWARD GROWTH</option>
              <option value="A QUICK VICTORY">A QUICK VICTORY</option>
              <option value="A DEEP CHALLENGE">A DEEP CHALLENGE</option>
            </select>
          </div>

          <hr className="border-4 border-black" />

          {/* Energy Sliders */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <label className="block text-xl mb-4">ENERGY REQUIRED</label>
              <div className="flex items-center gap-4 bg-black text-white p-4 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <Zap className={`${energyLevel >= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-white'}`} />
                <input 
                  type="range" min="1" max="5" 
                  {...register('energyLevel')}
                  className="flex-1 accent-white h-2 rounded-lg cursor-pointer"
                />
                <span className="text-2xl w-8">{energyLevel}</span>
              </div>
            </div>

            <div>
              <label className="block text-xl mb-4">PRIORITY LEVEL</label>
              <div className="flex gap-2">
                {priorities.map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setValue('priority', p)}
                    className={`flex-1 py-2 border-4 border-black rounded-lg uppercase transition-all ${priority === p ? 'bg-pink-500 text-white translate-y-1 shadow-none' : 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xl mb-4">CATEGORY</label>
            <div className="flex flex-wrap gap-4">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setValue('category', cat.id)}
                  className={`flex items-center gap-2 px-6 py-3 border-4 border-black rounded-full uppercase transition-all ${category === cat.id ? `${cat.color} translate-y-1 shadow-none` : 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}
                >
                  {cat.icon}
                  {cat.id}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="cartoon-button w-full bg-black text-white text-3xl py-6 flex items-center justify-center gap-4 group"
          >
            COMMIT TO THE PATH
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddTaskPage;
