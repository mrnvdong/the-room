import React, { useState } from 'react';
import { SAMPLE_PROJECTS, ProjectRecord } from '@/features/portfolio/portfolioData';
import { FolderGit2, ExternalLink, Github } from 'lucide-react';

export const ProjectWallPanel: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(SAMPLE_PROJECTS[0].id);
  const activeProj: ProjectRecord =
    SAMPLE_PROJECTS.find((p) => p.id === selectedProjectId) || SAMPLE_PROJECTS[0];

  return (
    <div className="flex flex-col h-[520px] bg-slate-950 rounded-2xl border border-sky-500/30 overflow-hidden shadow-2xl font-sans text-slate-100">
      {/* Titlebar */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-900 border-b border-white/10 select-none">
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-5 h-5 text-sky-400" />
          <span className="font-bold text-sm text-white tracking-wide">
            Project Wall Gallery // Physical Posters
          </span>
        </div>
        <span className="text-xs font-mono text-sky-400 font-semibold uppercase">
          {activeProj.category}
        </span>
      </div>

      <div role="note" className="border-b border-amber-400/20 bg-amber-500/10 px-5 py-2 text-center text-[11px] font-mono text-amber-200">
        DEMO DATA ONLY — These project examples and claims are not verified owner work.
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Project Posters List */}
        <div className="w-60 bg-slate-900/80 border-r border-white/10 p-3 space-y-2 select-none overflow-y-auto">
          <div className="text-[10px] font-bold uppercase text-slate-400 px-2 py-1">
            Wall Posters ({SAMPLE_PROJECTS.length})
          </div>
          {SAMPLE_PROJECTS.map((proj) => {
            const isSelected = proj.id === selectedProjectId;
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => setSelectedProjectId(proj.id)}
                className={`w-full p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-sky-500/20 border-sky-400 text-white ring-1 ring-sky-400 shadow-lg'
                    : 'bg-slate-800/40 border-white/5 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="font-bold text-xs truncate text-white">{proj.title}</div>
                <div className="text-[10px] text-sky-400 font-mono mt-0.5">{proj.category}</div>
              </button>
            );
          })}
        </div>

        {/* Right: Rich Project Deep Dive */}
        <div className="flex-1 p-6 bg-slate-950 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div className="pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{activeProj.title}</h3>
                {activeProj.featured && (
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold uppercase">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-xs text-sky-300 mt-1">{activeProj.summary}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">The Challenge</div>
                <p className="text-slate-300 leading-relaxed">{activeProj.problem}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold">The Architecture</div>
                <p className="text-slate-300 leading-relaxed">{activeProj.solution}</p>
              </div>
            </div>

            {/* Technologies */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Tech Stack</div>
              <div className="flex flex-wrap gap-1.5">
                {activeProj.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Meta Role & Period */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
              <span>Role: <strong className="text-white">{activeProj.role}</strong></span>
              <span>Period: <strong className="text-white">{activeProj.period}</strong></span>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            {activeProj.demoUrl && (
              <a
                href={activeProj.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Live Demo</span>
              </a>
            )}
            {activeProj.repositoryUrl && (
              <a
                href={activeProj.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-2 border border-white/10 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Source Repository</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
