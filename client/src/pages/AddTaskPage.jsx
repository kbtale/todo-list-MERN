import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createTaskRequest } from "../api/tasks";
import { ArrowLeft, Rocket, Brain, Heart, Zap, Coffee, ArrowRight } from "lucide-react";

function AddTaskPage() {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      energyLevel: 3,
      priority: "medium",
      category: "life"
    }
  });

  const navigate = useNavigate();
  const currentEnergy = watch("energyLevel");
  const currentPriority = watch("priority");
  const currentCategory = watch("category");

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createTaskRequest({
        ...data,
        date: new Date().toISOString(),
      });
      navigate("/oracle");
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  });

  const categories = [
    { id: "deep-work", icon: <Brain size={18} />, label: "Deep-Work", color: "bg-[#FFD600]" },
    { id: "learning", icon: <Coffee size={18} />, label: "Learning", color: "bg-[#2979FF] text-white" },
    { id: "health", icon: <Heart size={18} />, label: "Health", color: "bg-[#FF4081] text-white" },
    { id: "quick-fix", icon: <Zap size={18} />, label: "Quick-Fix", color: "bg-[#00E676]" },
    { id: "life", icon: <Rocket size={18} />, label: "Life", color: "bg-black text-white" },
  ];

  return (
    <div className="min-h-screen bg-[#F0F0F0] flex flex-col items-center p-4 md:p-8 pb-32">
      <button 
        onClick={() => navigate(-1)}
        className="self-start mb-6 p-3 border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all rounded-xl"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="cartoon-card w-full max-w-2xl p-6 md:p-10 bg-white">
        <h1 className="text-3xl md:text-4xl font-black uppercase mb-8 tracking-tighter italic">
          New Task
        </h1>

        <form onSubmit={onSubmit} className="space-y-8">
          <div className="space-y-6">
            {/* Title */}
            <div className="flex flex-col">
              <label className="text-[10px] font-black uppercase text-gray-400 mb-0">Task Title</label>
              <input
                type="text"
                placeholder="What needs to be done?"
                className="text-xl md:text-2xl font-black border-b-4 border-black bg-transparent focus:outline-none focus:border-[#FF4081] p-0 m-0 leading-none h-auto transition-colors"
                {...register("title", { required: true })}
                autoFocus
              />
            </div>
            
            {/* Context */}
            <div className="flex flex-col">
              <label className="text-[10px] font-black uppercase text-gray-400 mb-0">Context</label>
              <textarea
                placeholder="Add some details..."
                rows="1"
                className="text-lg md:text-xl border-b-4 border-black bg-transparent focus:outline-none focus:border-[#2979FF] p-0 m-0 leading-none min-h-[1.5rem] transition-colors resize-none overflow-hidden"
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
                {...register("description")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="font-black uppercase text-sm flex justify-between">
                Energy Required <span>{currentEnergy}</span>
              </label>
              <div className="bg-black p-4 rounded-xl border-4 border-black flex items-center gap-4">
                <Zap className="text-[#FFD600]" size={20} fill="#FFD600" />
                <input
                  type="range"
                  min="1"
                  max="5"
                  className="w-full accent-[#FFD600] h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  {...register("energyLevel")}
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="font-black uppercase text-sm">Priority Level</label>
              <div className="flex justify-between gap-2">
                {["low", "medium", "high", "urgent"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setValue("priority", p)}
                    className={`flex-1 py-2 text-[10px] md:text-xs font-black uppercase border-4 border-black rounded-lg transition-all
                      ${currentPriority === p ? 'bg-[#FF4081] text-white -translate-y-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' : 'bg-white'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="font-black uppercase text-sm">Target Area</label>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setValue("category", cat.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-4 border-black rounded-xl font-black uppercase text-xs transition-all
                    ${currentCategory === cat.id ? `${cat.color} -translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]` : 'bg-white hover:bg-gray-50'}`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="cartoon-button w-full bg-black text-white text-2xl py-5 flex items-center justify-center gap-4 group mt-8"
          >
            CREATE TASK
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTaskPage;
