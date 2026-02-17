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
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const navItems = [
        { id: 'dashboard', label: 'Monitor', icon: LayoutDashboard, color: 'green', badge: 'Live' },
        { id: 'expenses', label: 'Ledger', icon: ReceiptIndianRupee, color: 'green', badge: '' },
        { id: 'analytics', label: 'Analysis', icon: BarChart3, color: 'blue', badge: '' },
        { id: 'insights', label: 'Insight', icon: Lightbulb, color: 'amber', badge: 'AI' },
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
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                setIsMobileOpen(false);
                            }}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 relative focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2",
                                activeTab === item.id
                                    ? "bg-green-50 text-green-700"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            )}
                        >
                            {activeTab === item.id && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r bg-green-600" />
                            )}

                            <div className={cn(
                                "w-8 h-8 flex items-center justify-center rounded-md flex-shrink-0",
                                activeTab === item.id
                                    ? "bg-green-100 text-green-600"
                                    : "bg-slate-100 text-slate-500"
                            )}>
                                <item.icon className="h-5 w-5" />
                            </div>

                            {!isCollapsed && (
                                <div className="flex w-full items-center justify-between">
                                    <span>{item.label}</span>
                                    {item.badge && (
                                        <span className={cn(
                                            "text-xs font-medium px-2 py-0.5 rounded-full",
                                            activeTab === item.id
                                                ? "bg-white text-green-700"
                                                : "bg-green-100 text-green-700"
                                        )}>
                                            {item.badge}
                                        </span>
                                    )}
                                </div>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 mx-3 mb-3 rounded-xl bg-slate-50 border border-slate-200">
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
                                <div className="w-2 h-2 rounded-full bg-green-600"></div>
                                <span className="text-slate-500 font-medium">System Operational</span>
                            </div>
                            <span className="text-slate-400 font-mono">v2.4.0</span>
                        </div>
                    )}
                </div>
            </motion.aside>
        </>
    );
};

export default Sidebar;
