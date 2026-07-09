import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../utils/api';
import {
    BoltIcon,
    CheckBadgeIcon,
    CheckIcon,
    ClipboardDocumentIcon,
    EnvelopeIcon,
    ArrowRightIcon,
    ClockIcon,
    PaperAirplaneIcon,
    SparklesIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [copied, setCopied] = useState('');
    const [history, setHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(true);
    const [activeHistoryId, setActiveHistoryId] = useState('');

    const stats = [
        { value: '3 outputs', label: 'per campaign' },
        { value: '1 prompt', label: 'to generate them' },
        { value: 'Seconds', label: 'to get a first draft' },
    ];

    const tips = [
        'Include industry, role, and pain point for better output.',
        'Mention the offer clearly so the tone feels tailored.',
        'Keep the prompt short, then refine after generation.',
    ];

    const loadHistory = async () => {
        setHistoryLoading(true);
        try {
            const { data } = await api.get('/ai/history');
            setHistory(data);
            if (data.length > 0 && !activeHistoryId) {
                const latest = data[0];
                setResult(latest);
                setActiveHistoryId(latest._id);
            }
        } catch (error) {
            toast.error('Failed to load history.');
        } finally {
            setHistoryLoading(false);
        }
    };

    useEffect(() => {
        loadHistory();
        // The dashboard should show saved generations immediately on entry.
    }, []);

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setLoading(true);
        try {
            const { data } = await api.post('/ai/generate-email', { prompt });
            setResult(data);
            setHistory((currentHistory) => [data, ...currentHistory.filter((item) => item._id !== data._id)]);
            setActiveHistoryId(data._id);
            toast.success('Successfully generated!');
        } catch (error) {
            toast.error('Failed to generate. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopied(''), 2000);
    };

    const openHistoryItem = (item) => {
        setResult(item);
        setActiveHistoryId(item._id);
    };

    const ResultCard = ({ title, content, type }) => (
        <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/60">
            <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-600">Generated</p>
                    <h3 className="mt-1 text-lg font-bold text-slate-950">{title}</h3>
                </div>
                <button
                    onClick={() => copyToClipboard(content, type)}
                    className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-500 transition-colors hover:text-primary-600"
                    title="Copy"
                >
                    {copied === type ? (
                        <CheckIcon className="h-5 w-5 text-emerald-500" />
                    ) : (
                        <ClipboardDocumentIcon className="h-5 w-5" />
                    )}
                </button>
            </div>
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">{content}</p>
        </div>
    );

    return (
        <div className="min-h-[calc(100vh-8rem)] space-y-6 text-slate-900">
            <section className="relative overflow-hidden rounded-4xl border border-white/70 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-primary-200/30 blur-3xl" />
                    <div className="absolute right-0 top-8 h-64 w-64 rounded-full bg-sky-200/30 blur-3xl" />
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700">
                            <SparklesIcon className="h-4 w-4" />
                            Outreach workspace
                        </div>
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                            <Link
                                to="/"
                                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-700"
                            >
                                Back to landing page
                            </Link>
                        </div>
                        <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                            Generate a cold email sequence
                            <span className="block bg-linear-to-r from-primary-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
                                in one focused prompt.
                            </span>
                        </h1>
                        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                            Turn target research into a subject line, cold email, LinkedIn DM, and follow-up without bouncing between tools.
                        </p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-3">
                            {stats.map((stat) => (
                                <div key={stat.label} className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
                                    <div className="text-2xl font-black tracking-tight text-slate-950">{stat.value}</div>
                                    <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-4xl border border-slate-200 bg-slate-950 p-5 text-white shadow-xl shadow-slate-950/10 sm:p-6">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Prompt guide</p>
                                <h2 className="mt-1 text-lg font-bold">Write prompts that convert</h2>
                            </div>
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                                <BoltIcon className="h-5 w-5 text-primary-300" />
                            </div>
                        </div>

                        <div className="mt-5 space-y-3">
                            {tips.map((tip, index) => (
                                <div key={tip} className="flex items-start gap-3 rounded-2xl bg-white/5 px-4 py-3">
                                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                                        {index + 1}
                                    </div>
                                    <p className="text-sm leading-6 text-slate-300">{tip}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                            <div className="flex items-center gap-2 text-white">
                                <UserGroupIcon className="h-4 w-4 text-primary-300" />
                                Best for sales teams and solo outbound operators.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="rounded-4xl border border-white/70 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8">
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">Saved history</p>
                        <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">Recent generations</h2>
                    </div>
                    <button
                        type="button"
                        onClick={loadHistory}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-primary-200 hover:text-primary-700"
                    >
                        <ClockIcon className="h-4 w-4" />
                        Refresh
                    </button>
                </div>

                <div className="mt-6">
                    {historyLoading ? (
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="h-28 animate-pulse rounded-3xl border border-slate-200 bg-slate-50" />
                            ))}
                        </div>
                    ) : history.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {history.map((item) => {
                                const isActive = activeHistoryId === item._id;
                                return (
                                    <button
                                        key={item._id}
                                        type="button"
                                        onClick={() => openHistoryItem(item)}
                                        className={`group rounded-3xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                                            isActive
                                                ? 'border-primary-300 bg-primary-50 shadow-lg shadow-primary-100/50'
                                                : 'border-slate-200 bg-slate-50 hover:border-primary-200'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-600">
                                                    {new Date(item.createdAt).toLocaleDateString(undefined, {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </div>
                                                <div className="mt-2 line-clamp-2 text-base font-bold text-slate-950">
                                                    {item.subject || 'Untitled generation'}
                                                </div>
                                            </div>
                                            <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-500 shadow-sm">
                                                Saved
                                            </span>
                                        </div>
                                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                                            {item.prompt}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-slate-500">
                            <ClockIcon className="mx-auto h-6 w-6 text-slate-400" />
                            <p className="mt-3 text-sm font-medium">No saved generations yet.</p>
                            <p className="mt-1 text-sm text-slate-500">Generate your first sequence and it will appear here automatically.</p>
                        </div>
                    )}
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
                <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                            <PaperAirplaneIcon className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">New campaign</p>
                            <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">Describe the prospect</h2>
                        </div>
                    </div>

                    <form onSubmit={handleGenerate} className="mt-6 flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-slate-700">Context / Prompt</label>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="min-h-72 w-full resize-none rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-100"
                            placeholder="e.g. Write a cold email to a marketing director at a SaaS company offering our AI-driven analytics tool that increases retention by 20%..."
                        />
                        <button
                            type="submit"
                            disabled={loading || !prompt.trim()}
                            className="group mt-4 inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-4 text-sm font-semibold text-white shadow-xl shadow-slate-950/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="mr-3 h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating...
                                </span>
                            ) : (
                                <>
                                    Generate output
                                    <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">AI results</p>
                            <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">Ready to send</h2>
                        </div>
                        <div className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
                            {result ? 'Generated sequence' : 'Waiting for prompt'}
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        {result ? (
                            <>
                                <ResultCard title="Subject Line" content={result.subject} type="subject" />
                                <ResultCard title="Cold Email" content={result.emailBody} type="email" />
                                <ResultCard title="LinkedIn DM" content={result.linkedInDM} type="linkedin" />
                                <ResultCard title="Follow-up Email" content={result.followUpEmail} type="followup" />
                            </>
                        ) : (
                            <div className="flex min-h-112 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center text-slate-500">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                                    <ClipboardDocumentIcon className="h-8 w-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">No output yet</h3>
                                <p className="mt-2 max-w-sm text-sm leading-7 text-slate-500">
                                    Submit a prompt on the left to generate the subject line, email body, follow-up, and LinkedIn DM.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;