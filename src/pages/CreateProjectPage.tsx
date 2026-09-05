import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Plus,
  Cpu,
  Layers,
  Users,
  Clock,
  Coins,
  ShieldAlert,
  Code2,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';
import { projectCreationSchema, ProjectCreationFormSchema } from '../lib/schemas';
import { useProjectStore } from '../store/projectStore';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { GlassCard } from '../components/common/GlassCard';
import { Button } from '../components/common/Button';

export const CreateProjectPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [customInterest, setCustomInterest] = useState('');
  const [customSkill, setCustomSkill] = useState('');
  const [customTech, setCustomTech] = useState('');

  const navigate = useNavigate();
  const { generateIdeas, isGeneratingIdeas, error, clearError } = useProjectStore();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ProjectCreationFormSchema>({
    resolver: zodResolver(projectCreationSchema),
    defaultValues: {
      interests: ['Generative AI', 'Healthcare'],
      skills: ['TypeScript', 'Python', 'React'],
      experience: 'Intermediate',
      preferredDomain: 'Artificial Intelligence & Machine Learning',
      teamSize: 2,
      availableTimeWeeks: 8,
      budgetResources: '100% Free-tier and open source only',
      constraints: 'Must have client-side PII privacy and zero cloud hardware dependency',
      preferredTechnologies: ['React', 'FastAPI', 'Gemini API', 'PostgreSQL'],
    },
    mode: 'onChange',
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const formValues = watch();

  const stepTitles = [
    { step: 1, label: 'Interests', icon: Sparkles },
    { step: 2, label: 'Skills', icon: Code2 },
    { step: 3, label: 'Experience', icon: Cpu },
    { step: 4, label: 'Domain', icon: Layers },
    { step: 5, label: 'Team Size', icon: Users },
    { step: 6, label: 'Timeline', icon: Clock },
    { step: 7, label: 'Budget', icon: Coins },
    { step: 8, label: 'Constraints', icon: ShieldAlert },
    { step: 9, label: 'Tech Stack', icon: Code2 },
    { step: 10, label: 'Generate', icon: Lightbulb },
  ];

  const suggestedInterests = [
    'Generative AI',
    'Computer Vision',
    'Medical Informatics',
    'Smart Contracts & DeFi',
    'Zero-Knowledge Proofs',
    'IoT & Microcontrollers',
    'Autonomous Robotics',
    'Cloud FinOps & Cost Optimization',
    'Network Intrusion Detection',
    'CleanTech & Solar Grids',
  ];

  const suggestedSkills = [
    'Python',
    'TypeScript',
    'JavaScript',
    'React',
    'Node.js',
    'Go',
    'Rust',
    'C++',
    'FastAPI',
    'Docker',
    'PostgreSQL',
    'PyTorch',
    'Solidity',
  ];

  const suggestedDomains = [
    'Artificial Intelligence & Machine Learning',
    'Cybersecurity & Privacy',
    'IoT & Smart Systems',
    'Web3 & FinTech',
    'Healthcare & BioTech',
    'Cloud & DevOps Engineering',
  ];

  const suggestedTechs = [
    'Gemini API',
    'React 19',
    'FastAPI',
    'Next.js',
    'PostgreSQL',
    'Redis',
    'Docker',
    'Tailwind CSS',
    'Supabase',
    'MediaPipe',
  ];

  const validateCurrentStep = async () => {
    switch (currentStep) {
      case 1:
        return await trigger('interests');
      case 2:
        return await trigger('skills');
      case 3:
        return await trigger('experience');
      case 4:
        return await trigger('preferredDomain');
      case 5:
        return await trigger('teamSize');
      case 6:
        return await trigger('availableTimeWeeks');
      case 7:
        return await trigger('budgetResources');
      case 8:
        return await trigger('constraints');
      case 9:
        return await trigger('preferredTechnologies');
      default:
        return true;
    }
  };

  const handleNext = async () => {
    clearError();
    const ok = await validateCurrentStep();
    if (ok && currentStep < 10) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data: ProjectCreationFormSchema) => {
    clearError();
    const ideas = await generateIdeas(data);
    if (ideas && ideas.length > 0) {
      navigate('/ideas');
    }
  };

  // Tag helper utilities
  const toggleArrayItem = (field: 'interests' | 'skills' | 'preferredTechnologies', item: string) => {
    const list = formValues[field] || [];
    if (list.includes(item)) {
      if (list.length > 1) {
        setValue(
          field,
          list.filter((x) => x !== item)
        );
      }
    } else {
      setValue(field, [...list, item]);
    }
  };

  const addCustomItem = (
    field: 'interests' | 'skills' | 'preferredTechnologies',
    value: string,
    clearFn: (s: string) => void
  ) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const list = formValues[field] || [];
    if (!list.includes(trimmed)) {
      setValue(field, [...list, trimmed]);
    }
    clearFn('');
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Title */}
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI CAPSTONE PROJECT SYNTHESIZER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Create Your Final-Year Project
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Follow the 10-step wizard. We calibrate project scope to your exact team size, timeline, and capabilities.
          </p>
        </div>

        {/* Step Progress Bar (01 -> 10) */}
        <div className="glass-panel p-4 rounded-2xl border-white/[0.08] overflow-x-auto">
          <div className="flex items-center justify-between min-w-[650px] gap-2">
            {stepTitles.map((s, idx) => {
              const isPast = currentStep > s.step;
              const isCurrent = currentStep === s.step;

              return (
                <div key={s.step} className="flex items-center gap-2 flex-1">
                  <button
                    type="button"
                    onClick={async () => {
                      if (s.step < currentStep) setCurrentStep(s.step);
                      else if (await validateCurrentStep()) setCurrentStep(s.step);
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-blue-600 text-white font-bold shadow-[0_0_12px_rgba(37,99,235,0.4)]'
                        : isPast
                        ? 'bg-blue-500/10 text-cyan-300 border border-blue-500/20'
                        : 'text-slate-500 bg-white/[0.02]'
                    }`}
                  >
                    <span>{String(s.step).padStart(2, '0')}</span>
                    <span className="hidden sm:inline text-[11px] font-sans font-normal">
                      {s.label}
                    </span>
                    {isPast && <Check className="w-3 h-3 text-cyan-400 ml-0.5" />}
                  </button>

                  {idx < stepTitles.length - 1 && (
                    <div
                      className={`h-[1px] flex-1 transition-colors ${
                        isPast ? 'bg-cyan-500/40' : 'bg-white/[0.08]'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={clearError}
              className="text-xs text-red-400 hover:text-white underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <GlassCard className="p-6 sm:p-10 rounded-3xl border border-white/[0.09] bg-[#060914]/85 shadow-[0_10px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(59,130,246,0.08)] min-h-[380px] flex flex-col justify-between">
            {/* Step 1: Interests */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="pb-3 border-b border-white/[0.06]">
                  <span className="text-xs font-mono text-cyan-400">STEP 01 OF 10</span>
                  <h2 className="text-xl font-bold text-white mt-1">
                    What areas of computing or science interest you most?
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Select one or more topics. Your project will be shaped around your genuine passions.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestedInterests.map((interest) => {
                    const isSelected = formValues.interests?.includes(interest);
                    return (
                      <button
                        type="button"
                        key={interest}
                        onClick={() => toggleArrayItem('interests', interest)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-400/40 font-semibold'
                            : 'bg-slate-900 border border-white/[0.08] text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-200" />}
                        <span>{interest}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom tag add */}
                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={customInterest}
                    onChange={(e) => setCustomInterest(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCustomItem('interests', customInterest, setCustomInterest);
                      }
                    }}
                    placeholder="Add custom interest (e.g. Quantum Algorithms)..."
                    className="flex-1 max-w-sm px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => addCustomItem('interests', customInterest, setCustomInterest)}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </Button>
                </div>

                {errors.interests && (
                  <p className="text-xs text-red-400">{errors.interests.message}</p>
                )}
              </div>
            )}

            {/* Step 2: Skills */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="pb-3 border-b border-white/[0.06]">
                  <span className="text-xs font-mono text-cyan-400">STEP 02 OF 10</span>
                  <h2 className="text-xl font-bold text-white mt-1">
                    What programming languages and tools do you already know?
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    We ensure you don't pick a project in a language nobody on your team can write.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestedSkills.map((skill) => {
                    const isSelected = formValues.skills?.includes(skill);
                    return (
                      <button
                        type="button"
                        key={skill}
                        onClick={() => toggleArrayItem('skills', skill)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-400/40 font-semibold'
                            : 'bg-slate-900 border border-white/[0.08] text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-200" />}
                        <span>{skill}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCustomItem('skills', customSkill, setCustomSkill);
                      }
                    }}
                    placeholder="Add custom skill (e.g. Flutter, Kotlin)..."
                    className="flex-1 max-w-sm px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => addCustomItem('skills', customSkill, setCustomSkill)}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </Button>
                </div>

                {errors.skills && (
                  <p className="text-xs text-red-400">{errors.skills.message}</p>
                )}
              </div>
            )}

            {/* Step 3: Experience */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="pb-3 border-b border-white/[0.06]">
                  <span className="text-xs font-mono text-cyan-400">STEP 03 OF 10</span>
                  <h2 className="text-xl font-bold text-white mt-1">
                    What is your team's overall technical experience level?
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Calibrates architectural complexity and algorithmic depth.
                  </p>
                </div>

                <Controller
                  name="experience"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      {[
                        {
                          level: 'Beginner',
                          title: 'Beginner-Friendly',
                          desc: 'Focus on clean software architecture, standard CRUD, clear REST APIs, and dependable deliverables.',
                        },
                        {
                          level: 'Intermediate',
                          title: 'Intermediate',
                          desc: 'Combines multi-tier systems, asynchronous workers, normalized databases, and cloud service integration.',
                        },
                        {
                          level: 'Advanced',
                          title: 'Advanced',
                          desc: 'Cutting-edge models, distributed consensus, low-level telemetry, AST parsers, or zero-knowledge cryptography.',
                        },
                      ].map((item) => (
                        <div
                          key={item.level}
                          onClick={() => field.onChange(item.level)}
                          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                            field.value === item.level
                              ? 'bg-blue-600/15 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.2)]'
                              : 'bg-slate-900/60 border-white/[0.08] hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-bold text-white">{item.title}</h3>
                            {field.value === item.level && (
                              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                            )}
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </div>
            )}

            {/* Step 4: Preferred Domain */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="pb-3 border-b border-white/[0.06]">
                  <span className="text-xs font-mono text-cyan-400">STEP 04 OF 10</span>
                  <h2 className="text-xl font-bold text-white mt-1">
                    Select your primary engineering department domain
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Aligns with university department specializations and research tracks.
                  </p>
                </div>

                <Controller
                  name="preferredDomain"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {suggestedDomains.map((dom) => (
                        <div
                          key={dom}
                          onClick={() => field.onChange(dom)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            field.value === dom
                              ? 'bg-blue-600/15 border-blue-500 text-white font-semibold'
                              : 'bg-slate-900/60 border-white/[0.08] text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span className="text-xs sm:text-sm">{dom}</span>
                          {field.value === dom && <Check className="w-4 h-4 text-cyan-400" />}
                        </div>
                      ))}
                    </div>
                  )}
                />
              </div>
            )}

            {/* Step 5: Team Size */}
            {currentStep === 5 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="pb-3 border-b border-white/[0.06]">
                  <span className="text-xs font-mono text-cyan-400">STEP 05 OF 10</span>
                  <h2 className="text-xl font-bold text-white mt-1">
                    How many students are in your project group?
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Scope is dynamically calculated to ensure enough individual contributions for every team member.
                  </p>
                </div>

                <Controller
                  name="teamSize"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                      {[
                        { size: 1, label: 'Solo Student', desc: 'Single developer ownership' },
                        { size: 2, label: 'Pair (2 Students)', desc: 'Balanced frontend & backend' },
                        { size: 3, label: 'Trio (3 Students)', desc: 'UI, backend & AI/Data' },
                        { size: 4, label: 'Team (4 Students)', desc: 'Full-scale capstone group' },
                      ].map((t) => (
                        <div
                          key={t.size}
                          onClick={() => field.onChange(t.size)}
                          className={`p-5 rounded-2xl border text-center transition-all cursor-pointer ${
                            field.value === t.size
                              ? 'bg-blue-600/15 border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.2)]'
                              : 'bg-slate-900/60 border-white/[0.08] hover:border-slate-700'
                          }`}
                        >
                          <div className="text-2xl font-extrabold text-white mb-1">{t.size}</div>
                          <div className="text-xs font-semibold text-slate-200">{t.label}</div>
                          <div className="text-[11px] text-slate-400 mt-1">{t.desc}</div>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </div>
            )}

            {/* Step 6: Available Time */}
            {currentStep === 6 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="pb-3 border-b border-white/[0.06]">
                  <span className="text-xs font-mono text-cyan-400">STEP 06 OF 10</span>
                  <h2 className="text-xl font-bold text-white mt-1">
                    How much time do you have before your final submission?
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    We adapt the weekly milestone breakdown strictly to your semester timeline.
                  </p>
                </div>

                <Controller
                  name="availableTimeWeeks"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                      {[
                        { weeks: 4, label: '4 Weeks', desc: 'Rapid sprint / Fast track' },
                        { weeks: 8, label: '8 Weeks', desc: 'Standard semester module' },
                        { weeks: 12, label: '12 Weeks', desc: 'Full semester capstone' },
                        { weeks: 16, label: '16 Weeks', desc: 'Year-long / Dual semester' },
                      ].map((w) => (
                        <div
                          key={w.weeks}
                          onClick={() => field.onChange(w.weeks)}
                          className={`p-5 rounded-2xl border text-center transition-all cursor-pointer ${
                            field.value === w.weeks
                              ? 'bg-blue-600/15 border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.2)]'
                              : 'bg-slate-900/60 border-white/[0.08] hover:border-slate-700'
                          }`}
                        >
                          <div className="text-2xl font-extrabold text-cyan-400 mb-1">{w.weeks}w</div>
                          <div className="text-xs font-semibold text-slate-200">{w.label}</div>
                          <div className="text-[11px] text-slate-400 mt-1">{w.desc}</div>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </div>
            )}

            {/* Step 7: Budget / Resources */}
            {currentStep === 7 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="pb-3 border-b border-white/[0.06]">
                  <span className="text-xs font-mono text-cyan-400">STEP 07 OF 10</span>
                  <h2 className="text-xl font-bold text-white mt-1">
                    What is your budget and hardware availability?
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Never get surprised by unexpected cloud bills or expensive proprietary software.
                  </p>
                </div>

                <Controller
                  name="budgetResources"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2.5 pt-2">
                      {[
                        '100% Free-tier and open source only (Zero cloud spend)',
                        'Low budget (Under $30 for ESP32 sensors or test domain)',
                        'University lab GPU access (Can train local PyTorch models)',
                        'Commercial cloud credit grant (AWS / Google Cloud credits available)',
                      ].map((opt) => (
                        <div
                          key={opt}
                          onClick={() => field.onChange(opt)}
                          className={`p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                            field.value === opt
                              ? 'bg-blue-600/15 border-blue-500 text-white font-semibold'
                              : 'bg-slate-900/60 border-white/[0.08] text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span>{opt}</span>
                          {field.value === opt && <Check className="w-4 h-4 text-cyan-400" />}
                        </div>
                      ))}
                    </div>
                  )}
                />
              </div>
            )}

            {/* Step 8: Constraints */}
            {currentStep === 8 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="pb-3 border-b border-white/[0.06]">
                  <span className="text-xs font-mono text-cyan-400">STEP 08 OF 10</span>
                  <h2 className="text-xl font-bold text-white mt-1">
                    Are there specific academic or departmental constraints?
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Example: University guide requires IEEE paper reference, or department forbids mock datasets.
                  </p>
                </div>

                <Controller
                  name="constraints"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2.5 pt-2">
                      {[
                        'Must have client-side PII privacy and zero cloud hardware dependency',
                        'Must work offline / on local intranet without constant internet',
                        'Must include comparative performance benchmarks against baseline algorithms',
                        'No special constraints (Standard open web application)',
                      ].map((con) => (
                        <div
                          key={con}
                          onClick={() => field.onChange(con)}
                          className={`p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                            field.value === con
                              ? 'bg-blue-600/15 border-blue-500 text-white font-semibold'
                              : 'bg-slate-900/60 border-white/[0.08] text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span>{con}</span>
                          {field.value === con && <Check className="w-4 h-4 text-cyan-400" />}
                        </div>
                      ))}
                    </div>
                  )}
                />
              </div>
            )}

            {/* Step 9: Preferred Technologies */}
            {currentStep === 9 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="pb-3 border-b border-white/[0.06]">
                  <span className="text-xs font-mono text-cyan-400">STEP 09 OF 10</span>
                  <h2 className="text-xl font-bold text-white mt-1">
                    Any specific technologies or APIs you are eager to integrate?
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    We will weave these into the architecture diagrams and implementation blueprints.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestedTechs.map((tech) => {
                    const isSelected = formValues.preferredTechnologies?.includes(tech);
                    return (
                      <button
                        type="button"
                        key={tech}
                        onClick={() => toggleArrayItem('preferredTechnologies', tech)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-400/40 font-semibold'
                            : 'bg-slate-900 border border-white/[0.08] text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-200" />}
                        <span>{tech}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={customTech}
                    onChange={(e) => setCustomTech(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCustomItem('preferredTechnologies', customTech, setCustomTech);
                      }
                    }}
                    placeholder="Add custom tech (e.g. InfluxDB, WebRTC)..."
                    className="flex-1 max-w-sm px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => addCustomItem('preferredTechnologies', customTech, setCustomTech)}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </Button>
                </div>
              </div>
            )}

            {/* Step 10: Review & Generate */}
            {currentStep === 10 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="pb-3 border-b border-white/[0.06]">
                  <span className="text-xs font-mono text-cyan-400">STEP 10 OF 10</span>
                  <h2 className="text-xl font-bold text-white mt-1">
                    Review Profile & Synthesize Projects
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Our AI models will now generate 3–5 personalized, academically rigorous capstone proposals.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.06] space-y-1">
                    <span className="text-slate-400 font-mono uppercase block text-[10px]">
                      Selected Domain & Experience
                    </span>
                    <p className="font-semibold text-white">{formValues.preferredDomain}</p>
                    <p className="text-cyan-300">{formValues.experience} Level</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.06] space-y-1">
                    <span className="text-slate-400 font-mono uppercase block text-[10px]">
                      Team & Timeline
                    </span>
                    <p className="font-semibold text-white">{formValues.teamSize} Student(s)</p>
                    <p className="text-cyan-300">{formValues.availableTimeWeeks} Weeks Duration</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.06] space-y-1 sm:col-span-2">
                    <span className="text-slate-400 font-mono uppercase block text-[10px]">
                      Verified Skills & Preferred Tech
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {formValues.skills.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 text-[11px] font-mono">
                          {s}
                        </span>
                      ))}
                      {formValues.preferredTechnologies.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 text-[11px] font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs text-slate-300 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Ready to generate. Projects will include verified problem statements, novelty rationale, MVP boundaries, and risk mitigations.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Footer Controls */}
            <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handlePrev}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Previous
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 10 ? (
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={handleNext}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  <span>Continue</span>
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isGeneratingIdeas}
                  leftIcon={<Sparkles className="w-4 h-4 text-cyan-300" />}
                >
                  <span>Generate Personalized Ideas</span>
                </Button>
              )}
            </div>
          </GlassCard>
        </form>
      </div>
    </DashboardLayout>
  );
};
