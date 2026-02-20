import React, { useState } from 'react';
import {
    LayoutDashboard,
    ReceiptIndianRupee,
    BarChart3,
    Lightbulb,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isSplitterMode = location.pathname.startsWith('/splitter');
    const isInsights = location.pathname.includes('/insights');

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const colorVariants = {
        indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', activeBg: 'bg-indigo-100', activeText: 'text-indigo-600', pill: 'bg-indigo-600' },
        green: { bg: 'bg-green-50', text: 'text-green-700', activeBg: 'bg-green-100', activeText: 'text-green-600', pill: 'bg-green-600' },
        blue: { bg: 'bg-blue-50', text: 'text-blue-700', activeBg: 'bg-blue-100', activeText: 'text-blue-600', pill: 'bg-blue-600' },
        amber: { bg: 'bg-amber-50', text: 'text-amber-700', activeBg: 'bg-amber-100', activeText: 'text-amber-600', pill: 'bg-amber-600' },
        rose: { bg: 'bg-rose-50', text: 'text-rose-700', activeBg: 'bg-rose-100', activeText: 'text-rose-600', pill: 'bg-rose-600' }
    };

    const navItems = isSplitterMode ? [
        { id: 'splitter', label: 'Groups', icon: LayoutDashboard, color: 'indigo', path: '/splitter' },
        { id: 'insights', label: 'Analysis', icon: BarChart3, color: 'blue', path: '/splitter/insights' },
    ] : [
        { id: 'dashboard', label: 'Monitor', icon: LayoutDashboard, color: 'green', badge: 'Live', path: '/' },
        { id: 'expenses', label: 'Ledger', icon: ReceiptIndianRupee, color: 'green', badge: '', path: '/' },
        { id: 'analytics', label: 'Analysis', icon: BarChart3, color: 'blue', badge: '', path: '/' },
        { id: 'insights', label: 'Insight', icon: Lightbulb, color: 'amber', badge: 'AI', path: '/' },
    ];

    const sidebarVariants = {
        expanded: { width: '256px', transition: { type: 'spring', stiffness: 300, damping: 30 } },
        collapsed: { width: '80px', transition: { type: 'spring', stiffness: 300, damping: 30 } }
    };

    return (
        <>
            {/* Mobile Trigger */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-[45] p-2.5 bg-white border border-slate-200 rounded-xl shadow-lg hover:bg-slate-50 transition-all active:scale-90 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
            >
                <Menu className="h-6 w-6 text-slate-700" />
            </button>

            {/* Backdrop for mobile */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileOpen(false)}
                        className="lg:hidden fixed inset-0 bg-slate-950/40 z-50"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Container */}
            <motion.aside
                variants={sidebarVariants}
                animate={isCollapsed ? 'collapsed' : 'expanded'}
                className={cn(
                    "fixed lg:sticky top-0 h-screen z-[60] flex flex-col transition-all duration-300 ease-out lg:translate-x-0 border-r",
                    isMobileOpen ? 'translate-x-0' : '-translate-x-full',
                    "bg-white border-slate-200 shadow-2xl lg:shadow-none w-[280px] lg:w-auto"
                )}
            >
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200">
                    {!isCollapsed && (
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold tracking-tight text-slate-900">FinPulse</span>
                                <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Enterprise</span>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden lg:flex p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isSplitterMode ? 'splitter' : 'main'}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {navItems.map((item) => {
                                const isActive = isSplitterMode
                                    ? (item.id === 'insights' ? isInsights : (item.id === 'splitter' && !isInsights))
                                    : activeTab === item.id;
                                const colors = colorVariants[item.color] || colorVariants.indigo;

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            if (item.path) navigate(item.path);
                                            setActiveTab(item.id);
                                            setIsMobileOpen(false);
                                        }}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative focus:outline-none group",
                                            isActive ? colors.text : "text-slate-600 hover:text-slate-900"
                                        )}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-pill"
                                                className={cn("absolute inset-0 rounded-lg", colors.bg)}
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}

                                        {isActive && (
                                            <motion.div
                                                layoutId="active-indicator"
                                                className={cn("absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r z-10", colors.pill)}
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}

                                        <div className={cn(
                                            "w-8 h-8 flex items-center justify-center rounded-md flex-shrink-0 transition-all duration-300 relative z-10",
                                            isActive ? colors.activeBg : "bg-slate-100 group-hover:bg-slate-200"
                                        )}>
                                            <item.icon className={cn("h-5 w-5", isActive ? colors.activeText : "text-slate-500")} />
                                        </div>

                                        {!isCollapsed && (
                                            <div className="flex w-full items-center justify-between relative z-10 transition-transform group-hover:translate-x-1 duration-300">
                                                <span className="font-semibold">{item.label}</span>
                                                {item.badge && (
                                                    <span className={cn(
                                                        "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full",
                                                        isActive ? "bg-white text-green-700" : "bg-green-100 text-green-700"
                                                    )}>
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>

                    {isSplitterMode && (
                        <div className="px-3 py-4 text-center">
                            {!isCollapsed && <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2 opacity-50">Splitter Workspace</p>}
                        </div>
                    )}
                </nav>

                {/* Footer */}
                <div className="p-4 mx-3 mb-3 rounded-xl bg-slate-50 border border-slate-200">

                    {/* Splitter Toggle */}
                    <div className="flex items-center justify-between mb-4">
                        {!isCollapsed && (
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Smart Splitter</span>
                        )}
                        <button
                            onClick={() => {
                                if (isSplitterMode) {
                                    navigate('/');
                                } else {
                                    navigate('/splitter');
                                }
                            }}
                            className={cn(
                                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                                isSplitterMode ? 'bg-indigo-600' : 'bg-slate-300'
                            )}
                        >
                            <span
                                className={cn(
                                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                    isSplitterMode ? 'translate-x-6' : 'translate-x-1'
                                )}
                            />
                        </button>
                    </div>

                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                    >
                        <div className="w-8 h-8 flex items-center justify-center rounded-md bg-rose-50">
                            <LogOut className="h-4 w-4" />
                        </div>
                        {!isCollapsed && <span>Sign Out</span>}
                    </button>

                    {!isCollapsed && (
                        <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                                <div className={cn("w-2 h-2 rounded-full", isSplitterMode ? "bg-indigo-600" : "bg-green-600")}></div>
                                <span className="text-slate-500 font-medium">System Operational</span>
                            </div>
                            <span className="text-slate-400 font-mono">v2.5.0</span>
                        </div>
                    )}
                </div>
            </motion.aside>
        </>
    );
};

export default Sidebar;
