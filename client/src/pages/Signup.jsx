import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../utils/api';
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    CheckBadgeIcon,
    SparklesIcon,
    UserPlusIcon,
} from '@heroicons/react/24/outline';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const benefits = [
        'Generate a cold email sequence in seconds',
        'Create follow-ups and LinkedIn DMs instantly',
        'Keep your outreach consistent across leads',
    ];

    const stats = [
        { value: '1 signup', label: 'to unlock the workflow' },
        { value: '3 assets', label: 'generated per prospect' },
        { value: '24/7', label: 'available for every campaign' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/auth/register', { username: name, email, password });
            toast.success(data.message);

            navigate('/verify-otp', { state: { email } });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f8fc] text-slate-900 selection:bg-primary-100 selection:text-primary-950">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl" />
                <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#f7f8fc] to-transparent" />
            </div>

            <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:px-8">
                <div className="order-2 lg:order-1">
                    <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-950">
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back to home
                    </Link>

                    <div className="mt-8 max-w-xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/90 px-4 py-2 text-sm font-medium text-primary-700 shadow-sm shadow-primary-100/60">
                            <CheckBadgeIcon className="h-4 w-4" />
                            Create your MailGen AI account
                        </div>

                        <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
                            Start generating better outreach
                            <span className="block bg-linear-to-r from-primary-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
                                in one workflow.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600 sm:text-xl">
                            Set up your account once, then create cold emails, follow-ups, and LinkedIn messages without extra prompt work.
                        </p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-3">
                            {stats.map((item) => (
                                <div key={item.label} className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
                                    <div className="text-2xl font-black tracking-tight text-slate-950">{item.value}</div>
                                    <div className="mt-1 text-sm text-slate-500">{item.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 space-y-3">
                            {benefits.map((item) => (
                                <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
                                    <SparklesIcon className="h-4 w-4 text-primary-600" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="order-1 lg:order-2">
                    <div className="mx-auto max-w-md rounded-4xl border border-white/60 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">Sign up</p>
                                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Create your account</h2>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/15">
                                <UserPlusIcon className="h-5 w-5" />
                            </div>
                        </div>

                        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-100"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">Email address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-100"
                                    placeholder="you@company.com"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-100"
                                    placeholder="Create a password"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="group inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-slate-950/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? 'Creating account...' : 'Sign up'}
                                {!loading && <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                            </button>
                        </form>

                        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-primary-700 transition-colors hover:text-primary-600">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
