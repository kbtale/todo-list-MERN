import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createTaskRequest } from "../api/tasks";
import { Rocket, Brain, Heart, Zap, Coffee, ArrowRight } from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

function AddTaskPage() {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
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
    { id: "deep-work", icon: <Brain size={18} />, label: "DEEP-WORK", color: "yellow" },
    { id: "learning", icon: <Coffee size={18} />, label: "LEARNING", color: "blue" },
    { id: "health", icon: <Heart size={18} />, label: "HEALTH", color: "pink" },
    { id: "quick-fix", icon: <Zap size={18} />, label: "QUICK-FIX", color: "green" },
    { id: "life", icon: <Rocket size={18} />, label: "LIFE", color: "black" },
  ];

  return (
    <>
      <Card className="w-full max-w-2xl p-6 md:p-10 mb-8 mt-4">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">
            New Task
          </h1>
          <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mt-1 italic">
            Injecting new energy into the system
          </p>
        </header>

        <form onSubmit={onSubmit} className="space-y-10">
          <div className="space-y-6">
            <Input 
              label="Task Title"
              placeholder="What needs to be done?"
              error={errors.title ? "Title is required" : ""}
              className="text-xl md:text-2xl"
              {...register("title", { required: true })}
            />
            
            <div className="flex flex-col gap-1 w-full">
              <label className="text-[10px] font-black uppercase text-black/40 pl-1 italic">
                Context
              </label>
              <textarea
                placeholder="Add some details..."
                rows="1"
                className="cartoon-input bg-white text-black border-4 border-black focus:bg-yellow-50 text-lg md:text-xl p-0 m-0 leading-tight min-h-[1.5rem] transition-colors resize-none overflow-hidden px-4 py-3"
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
                {...register("description")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="font-black uppercase text-[10px] tracking-widest text-black/40 pl-1 flex justify-between italic">
                Energy Required <span>{currentEnergy}</span>
              </label>
              <div className="bg-black p-5 rounded-2xl border-4 border-black flex items-center gap-4">
                <Zap className="text-[#FFD600]" size={20} fill="#FFD600" />
                <input
                  type="range"
                  min="1"
                  max="5"
                  className="w-full accent-[#FFD600] h-2 bg-gray-700 rounded-full appearance-none cursor-pointer"
                  {...register("energyLevel")}
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="font-black uppercase text-[10px] tracking-widest text-black/40 pl-1 italic">Priority Level</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["low", "medium", "high", "urgent"].map((p) => (
                  <Button
                    key={p}
                    type="button"
                    variant={currentPriority === p ? 'pink' : 'white'}
                    size="xs"
                    className="w-full font-black px-1"
                    onClick={() => setValue("priority", p)}
                  >
                    {p}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="font-black uppercase text-[10px] tracking-widest text-black/40 pl-1 italic">Target Area</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  type="button"
                  size="sm"
                  variant={currentCategory === cat.id ? cat.color : 'white'}
                  className="flex items-center gap-2 justify-start px-3"
                  onClick={() => setValue("category", cat.id)}
                >
                  <span className="shrink-0">{cat.icon}</span>
                  <span className="truncate">{cat.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <Button 
            type="submit"
            variant="black"
            size="lg"
            className="w-full py-6 flex items-center justify-center gap-4 group mt-8 italic text-2xl"
          >
            CREATE TASK
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Button>
        </form>
      </Card>
    </>
  );
}

export default AddTaskPage;
