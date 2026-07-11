import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    CheckBadgeIcon,
    EnvelopeIcon,
    ShieldCheckIcon,
    SparklesIcon,
    KeyIcon,
} from '@heroicons/react/24/outline';

const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();

    const email = location.state?.email;
    const initialOtp = location.state?.otp || '';

    useEffect(() => {
        if (!email) {
            navigate('/signup');
        }
    }, [email, navigate]);

    useEffect(() => {
        if (initialOtp) {
            setOtp(initialOtp);
        }
    }, [initialOtp]);

    if (!email) return null;

    const highlights = [
        'One-time verification',
        'Secure account setup',
        'Quick access to your dashboard',
    ];

    const steps = [
        'Check your inbox for the 6-digit code.',
        'Enter it below to confirm your account.',
        'Jump into the dashboard and start generating.',
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/auth/verify-otp', { email, otp });
            login(data);
            toast.success('Email verified successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Verification failed');
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
                <div>
                    <Link to="/signup" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-950">
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back to signup
                    </Link>

                    <div className="mt-8 max-w-xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/90 px-4 py-2 text-sm font-medium text-primary-700 shadow-sm shadow-primary-100/60">
                            <ShieldCheckIcon className="h-4 w-4" />
                            Verify your email address
                        </div>

                        <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
                            Confirm your account and
                            <span className="block bg-linear-to-r from-primary-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
                                unlock the dashboard.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600 sm:text-xl">
                            We sent a 6-digit code to <span className="font-semibold text-slate-900">{email}</span>. Enter it once and you&apos;ll be ready to generate outreach.
                        </p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-3">
                            {highlights.map((item) => (
                                <div key={item} className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
                                    <div className="text-sm font-semibold text-slate-500">Secure</div>
                                    <div className="mt-2 text-base font-bold text-slate-950">{item}</div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 space-y-3">
                            {steps.map((item, index) => (
                                <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                                        {index + 1}
                                    </div>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mx-auto w-full max-w-md rounded-4xl border border-white/60 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">OTP verify</p>
                            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Enter your code</h2>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/15">
                            <KeyIcon className="h-5 w-5" />
                        </div>
                    </div>

                    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700 text-center">Enter 6-digit OTP</label>
                            <div className="relative">
                                <EnvelopeIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    required
                                    inputMode="numeric"
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                    className="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-12 py-4 text-center text-2xl tracking-[0.45em] text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-100"
                                    placeholder="000000"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || otp.length !== 6}
                            className="group inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-slate-950/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? 'Verifying...' : 'Verify Email'}
                            {!loading && <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                        </button>
                    </form>

                    <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-600">
                        <SparklesIcon className="mx-auto mb-2 h-5 w-5 text-primary-600" />
                        Didn&apos;t get the code? Check spam or request a fresh one from signup.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;