import React, { useState } from 'react';
import { SAMPLE_PROJECTS } from '@/features/portfolio/portfolioData';
import {
  User,
  FolderGit2,
  Cpu,
  Briefcase,
  Mail,
  ExternalLink,
  Github,
  Lock,
} from 'lucide-react';

type AppId = 'ABOUT' | 'PROJECTS' | 'SKILLS' | 'EXPERIENCE' | 'CONTACT' | 'SECRET';

export const VirtualDesktopPanel: React.FC = () => {
  const [activeApp, setActiveApp] = useState<AppId>('ABOUT');
  return (
    <div className="flex flex-col h-[520px] bg-slate-950 rounded-2xl border border-sky-500/30 overflow-hidden shadow-2xl font-sans text-slate-100">
      {/* 1. OS Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-white/10 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-xs text-sky-400 font-semibold tracking-wider">
            DONG-OS // Spatial Workstation v2.4
          </span>
        </div>
        <div className="text-[11px] font-mono text-slate-400">
            DEMO CONTENT // NOT LIVE TELEMETRY
        </div>
      </div>

      <div role="note" className="border-b border-amber-400/20 bg-amber-500/10 px-4 py-2 text-center text-[11px] font-mono text-amber-200">
        DEMO DATA ONLY — Project, skills, and experience examples are not verified owner facts. Contact details are not configured.
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* 2. Left App Launcher Dock */}
        <div className="w-44 bg-slate-900/90 border-r border-white/10 p-2.5 flex flex-col gap-1.5 select-none">
          <div className="text-[10px] uppercase font-mono text-slate-500 px-2 py-1 font-bold">
            Applications
          </div>
          {[
            { id: 'ABOUT' as AppId, label: 'ABOUT.exe', icon: User, color: 'text-sky-400' },
            { id: 'PROJECTS' as AppId, label: 'PROJECTS.exe', icon: FolderGit2, color: 'text-emerald-400' },
            { id: 'SKILLS' as AppId, label: 'SKILLS.exe', icon: Cpu, color: 'text-amber-400' },
            { id: 'EXPERIENCE' as AppId, label: 'EXPERIENCE.exe', icon: Briefcase, color: 'text-purple-400' },
            { id: 'CONTACT' as AppId, label: 'CONTACT.exe', icon: Mail, color: 'text-rose-400' },
            { id: 'SECRET' as AppId, label: 'SECRET.zip', icon: Lock, color: 'text-yellow-400' },
          ].map((app) => {
            const Icon = app.icon;
            const isActive = activeApp === app.id;
            return (
              <button
                key={app.id}
                type="button"
                onClick={() => setActiveApp(app.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left ${
                  isActive
                    ? 'bg-sky-500/20 text-white border border-sky-500/40 shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${app.color}`} />
                <span>{app.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3. Main Active App Window Area */}
        <div className="flex-1 bg-slate-950 p-5 overflow-y-auto">
          {/* App: ABOUT */}
          {activeApp === 'ABOUT' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-sky-400" />
                    Dong — Lead Full-Stack & 3D Web Engineer
                  </h3>
                  <p className="text-xs text-sky-400 font-mono mt-0.5">
                    Spatial Computing // Distributed Architecture // Real-Time Systems
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Passionate software engineer specialized in bridging high-performance WebGL / Three.js graphics with resilient cloud-edge microservices. Focused on creating digital experiences that leave a lasting impression.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-900 border border-white/10">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Core Expertise</div>
                  <div className="font-semibold text-white text-xs mt-1">Full-Stack TypeScript & 3D Web</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-white/10">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Cloud Platform</div>
                  <div className="font-semibold text-white text-xs mt-1">Cloudflare Edge (Workers, D1, R2)</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-white/10">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Current Philosophy</div>
                  <div className="font-semibold text-white text-xs mt-1">"Don't just scroll. Explore."</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-white/10">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Availability</div>
                  <div className="font-semibold text-emerald-400 text-xs mt-1">Open for Senior Roles & Consulting</div>
                </div>
              </div>
            </div>
          )}

          {/* App: PROJECTS */}
          {activeApp === 'PROJECTS' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-emerald-400" />
                  Featured Engineering Projects
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  {SAMPLE_PROJECTS.length} Projects Indexed
                </span>
              </div>

              <div className="space-y-3">
                {SAMPLE_PROJECTS.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl bg-slate-900/80 border border-white/10 hover:border-emerald-500/40 transition-colors space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-white text-sm flex items-center gap-2">
                          <span>{proj.title}</span>
                          {proj.featured && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono uppercase">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 mt-1">{proj.summary}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-1 text-xs font-medium">
                      {proj.demoUrl && (
                        <a
                          href={proj.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {proj.repositoryUrl && (
                        <a
                          href={proj.repositoryUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Source Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* App: SKILLS */}
          {activeApp === 'SKILLS' && (
            <div className="space-y-4 animate-fade-in">
              <div className="pb-2 border-b border-white/10">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-amber-400" />
                  Technical Stack & Proficiency Matrix
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                    Frontend & 3D Graphics
                  </div>
                  <div className="space-y-1.5 text-xs">
                    {['React 18 / Next.js', 'Three.js / React Three Fiber', 'TypeScript (Strict)', 'Tailwind CSS', 'WebGL Shaders'].map((s) => (
                      <div key={s} className="p-2 rounded bg-slate-900 border border-white/5 text-slate-200 flex justify-between">
                        <span>{s}</span>
                        <span className="text-sky-400 font-mono">Expert</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    Backend & Edge Cloud
                  </div>
                  <div className="space-y-1.5 text-xs">
                    {['Cloudflare Workers / D1 / R2', 'Node.js / Express / Hono', 'WebSockets / Real-Time Sync', 'PostgreSQL / SQLite', 'Docker / CI/CD'].map((s) => (
                      <div key={s} className="p-2 rounded bg-slate-900 border border-white/5 text-slate-200 flex justify-between">
                        <span>{s}</span>
                        <span className="text-amber-400 font-mono">Proficient</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* App: EXPERIENCE */}
          {activeApp === 'EXPERIENCE' && (
            <div className="space-y-4 animate-fade-in">
              <div className="pb-2 border-b border-white/10">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-purple-400" />
                  Engineering Experience & Track Record
                </h3>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-white text-sm">Senior Full-Stack & 3D Engineer</div>
                      <div className="text-xs text-purple-400 font-medium">Digital Innovation Lab</div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">2023 - Present</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Lead architect for interactive 3D web applications and multi-tenant cloud edge platforms. Optimized WebGL draw calls reducing render times by 40%.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-white text-sm">Full-Stack Software Engineer</div>
                      <div className="text-xs text-purple-400 font-medium">Cloud Systems Enterprise</div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">2021 - 2023</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Built high-throughput WebSocket message relays, transactional database schemas, and microservice pipelines servicing 200k+ monthly active users.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* App: CONTACT */}
          {activeApp === 'CONTACT' && (
            <div className="space-y-4 animate-fade-in">
              <div className="pb-2 border-b border-white/10">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-rose-400" />
                  Direct Contact & Collaboration
                </h3>
              </div>

              <p className="rounded-xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm text-amber-100">
                Contact information has not been supplied. No links or message delivery are available in this demo.
              </p>
            </div>
          )}

          {/* App: SECRET */}
          {activeApp === 'SECRET' && (
            <div className="space-y-4 animate-fade-in text-center py-6">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center mx-auto border border-yellow-400/40">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">SECRET_ARCHIVE.zip</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                This encrypted archive is linked to the physical <strong>Secret Drawer</strong> in the room. Inspect the drawer and input passcode <code className="text-amber-400 font-mono font-bold">1337</code> to decrypt!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
