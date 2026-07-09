import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    ArrowRightIcon,
    BoltIcon,
    ChartBarIcon,
    CheckBadgeIcon,
    DocumentTextIcon,
    SparklesIcon,
    SignalIcon,
} from '@heroicons/react/24/outline';

const LandingPage = () => {
    const { user } = useAuth();

    const features = [
        {
            name: 'Lightning Fast Generation',
            description: 'Generate cold emails in seconds with our AI-powered platform.',
            icon: BoltIcon,
        },
        {
            name: 'Omni-Channel Outreach',
            description: 'Get an email, a follow-up, and a LinkedIn DM perfectly synced for your prospect ',
            icon: DocumentTextIcon,
        },
        {
            name: 'Higher Conversion Rates',
            description: 'Increase your email response rates with our proven templates and strategies.',
            icon: ChartBarIcon,
        }
    ];

    const stats = [
        { value: '3x', label: 'faster outreach' },
        { value: '24/7', label: 'AI generation' },
        { value: '1 flow', label: 'email to DM' },
    ];

    const steps = [
        'Drop in your prospect and offer context.',
        'Generate a tailored cold email sequence in seconds.',
        'Send a matching follow-up and LinkedIn DM.',
    ];

    const proofPoints = [
        'Personalized openers',
        'Follow-up ready',
        'Built for outbound teams',
    ];
  return (
    <div className='min-h-screen bg-[#f7f8fc] font-sans text-slate-900 selection:bg-primary-100 selection:text-primary-950'>
            <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-white/75 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link to="/" className="group flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/20 transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-105">
                            <SparklesIcon className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-lg font-black tracking-tight text-slate-950">MailGen AI</div>
                            <div className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">Outbound copilot</div>
                        </div>
                    </Link>
                    <div className="flex items-center gap-3">
                        {user ? (
                            <Link
                                to="/dashboard"
                                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="hidden rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-950 sm:inline-flex"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/signup"
                                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <main className="pt-28">
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.16),_transparent_36%),radial-gradient(circle_at_80%_20%,_rgba(14,165,233,0.14),_transparent_28%),linear-gradient(to_bottom,_#ffffff,_#f7f8fc_45%,_#f7f8fc)]" />
                    <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-28">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/90 px-4 py-2 text-sm font-medium text-primary-700 shadow-sm shadow-primary-100/60">
                                <CheckBadgeIcon className="h-4 w-4" />
                                AI-generated outreach that feels human
                            </div>
                            <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                                Write cold emails that
                                <span className="block bg-linear-to-r from-primary-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
                                    actually get replies.
                                </span>
                            </h1>
                            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                                Stop drafting from scratch. Turn prospect context into a personalized email, follow-up, and LinkedIn DM in one flow.
                            </p>

                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <Link
                                    to={user ? '/dashboard' : '/signup'}
                                    className="group inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-4 text-base font-semibold text-white shadow-xl shadow-slate-950/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
                                >
                                    Start generating for free
                                    <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-4 text-sm font-medium text-slate-600 shadow-sm">
                                    <SignalIcon className="h-4 w-4 text-primary-600" />
                                    No setup. No prompt engineering.
                                </div>
                            </div>

                            <div className="mt-10 grid gap-4 sm:grid-cols-3">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
                                        <div className="text-2xl font-black tracking-tight text-slate-950">{stat.value}</div>
                                        <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -left-10 top-10 h-24 w-24 rounded-full bg-primary-400/20 blur-3xl" />
                            <div className="absolute -right-6 bottom-12 h-28 w-28 rounded-full bg-sky-400/20 blur-3xl" />
                            <div className="relative rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                    <div>
                                        <div className="text-sm font-semibold text-slate-500">Sequence preview</div>
                                        <div className="text-lg font-bold text-slate-950">Acme prospect outreach</div>
                                    </div>
                                    <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                        Ready in 15 sec
                                    </div>
                                </div>

                                <div className="mt-5 space-y-4">
                                    <div className="rounded-2xl bg-slate-950 p-4 text-white shadow-lg shadow-slate-900/10">
                                        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
                                            <BoltIcon className="h-4 w-4 text-primary-300" />
                                            Cold Email
                                        </div>
                                        <p className="text-sm leading-7 text-slate-100">
                                            Saw your team&apos;s push into enterprise ops. I put together a concise idea to help reduce manual prospecting without changing your current workflow...
                                        </p>
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                                                <DocumentTextIcon className="h-4 w-4 text-primary-600" />
                                                Follow-up
                                            </div>
                                            <p className="text-sm leading-6 text-slate-600">
                                                Short, polite, and written to keep momentum without sounding automated.
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                                                <ChartBarIcon className="h-4 w-4 text-primary-600" />
                                                LinkedIn DM
                                            </div>
                                            <p className="text-sm leading-6 text-slate-600">
                                                A tighter version that matches the channel and keeps the ask low-friction.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {proofPoints.map((point) => (
                                        <span key={point} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                                            {point}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-y border-white/70 bg-white/60 py-20 backdrop-blur">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-600">Why teams use it</p>
                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                Everything you need to close more deals
                            </h2>
                            <p className="mt-4 text-lg leading-8 text-slate-600">
                                The interface is designed to feel fast, focused, and easy to trust when you&apos;re moving from lead research to sending.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            {features.map((feature) => (
                                <div key={feature.name} className="group rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/10 transition-transform duration-200 group-hover:scale-105">
                                        <feature.icon className="h-7 w-7" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-950">{feature.name}</h3>
                                    <p className="mt-3 text-base leading-7 text-slate-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 grid gap-4 md:grid-cols-3">
                            {steps.map((step, index) => (
                                <div key={step} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                    <div className="text-sm font-semibold text-primary-600">0{index + 1}</div>
                                    <p className="mt-3 text-base leading-7 text-slate-700">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="relative isolate overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.28),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.22),_transparent_30%)]" />
                    <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-300">Ready to scale</p>
                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                            Turn prospect research into send-ready outreach.
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-slate-300">
                            Generate better first touches, faster follow-ups, and a cleaner outbound workflow without adding extra tools.
                        </p>
                        <div className="mt-10 flex justify-center">
                            <Link
                                to="/signup"
                                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-slate-950 shadow-lg shadow-black/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100"
                            >
                                Create free account
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-white/80 bg-white/80 py-10">
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 text-center sm:px-6 lg:px-8">
                    <span className="text-lg font-black tracking-tight text-slate-950">MailGen AI</span>
                    <p className="text-sm text-slate-500">© {new Date().getFullYear()} MailGen AI. All rights reserved.</p>
                </div>
            </footer>
    </div>
  );
};

export default LandingPage
