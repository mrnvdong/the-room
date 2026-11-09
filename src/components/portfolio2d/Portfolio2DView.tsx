import React, { useState } from 'react';
import {
  PORTFOLIO_PROFILE,
  PORTFOLIO_PROJECTS,
  PORTFOLIO_SKILLS,
  PORTFOLIO_EXPERIENCE,
  PORTFOLIO_ACHIEVEMENTS,
  PORTFOLIO_FAQS,
} from '@/features/portfolio/contentService';
import { useI18nStore } from '@/stores/useI18nStore';
import {
  Box,
  Github,
  ExternalLink,
  Code2,
  Briefcase,
  Layers,
  Award,
  HelpCircle,
  ArrowRight,
  Globe,
} from 'lucide-react';

interface Portfolio2DViewProps {
  onSwitchTo3D: () => void;
}

export const Portfolio2DView: React.FC<Portfolio2DViewProps> = ({ onSwitchTo3D }) => {
  const t = useI18nStore((state) => state.t);
  const language = useI18nStore((state) => state.language);
  const toggleLanguage = useI18nStore((state) => state.toggleLanguage);

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', '3D Web', 'Cloud Edge', 'AI Systems', 'Full-Stack'];
  const configuredLinks = PORTFOLIO_PROFILE.socialLinks;

  const filteredProjects =
    selectedCategory === 'ALL'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-white">
      {/* 1. Header Bar */}
      <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-400 flex items-center justify-center font-mono font-bold text-slate-950 text-base shadow-lg shadow-sky-500/20">
              D
            </div>
            <div>
              <h1 className="font-bold text-white text-base md:text-lg flex items-center gap-2">
                <span>{PORTFOLIO_PROFILE.displayName}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-400 font-mono">
                  {language === 'vi' ? 'CHẾ ĐỘ 2D DỄ TIẾP CẬN' : 'ACCESSIBLE 2D MODE'}
                </span>
              </h1>
              <p className="text-xs text-slate-400">{PORTFOLIO_PROFILE.headline}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 hover:text-white border border-white/10 transition-colors"
              title="Toggle English / Tiếng Việt"
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Switch to 3D Room Button */}
            <button
              type="button"
              onClick={onSwitchTo3D}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-sky-600/25 transition-all transform hover:-translate-y-0.5"
            >
              <Box className="w-4 h-4" />
              <span>{t.threeDMode}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Notice Banner */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-2.5 text-center text-xs text-amber-300 font-mono">
        💡 {t.sampleDataNotice} — {language === 'vi' ? 'Bạn có thể chuyển sang Phòng 3D bất cứ lúc nào qua nút ở góc phải.' : 'You can switch back into the interactive 3D Room anytime.'}
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* 2. Hero About Section */}
        <section className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {t.tagline}
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {PORTFOLIO_PROFILE.biography}
          </p>

          {configuredLinks.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {configuredLinks.map((link) => (
                <a key={link.platform} href={link.url} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-800">
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </section>

        {/* 3. Featured Projects Showcase */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-wider">
                <Code2 className="w-4 h-4" />
                <span>{t.viewProjects}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mt-1">
                {language === 'vi' ? 'Các Công Trình Kiến Trúc Phần Mềm' : 'Engineered Solutions & Systems'}
              </h3>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-sky-500 text-white font-semibold'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="p-6 bg-slate-900/60 rounded-2xl border border-white/10 hover:border-sky-500/40 transition-all flex flex-col justify-between space-y-4 hover:shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30">
                      {proj.category}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{proj.period}</span>
                  </div>

                  <h4 className="text-lg font-bold text-white leading-snug">{proj.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>

                  <div className="p-3 bg-slate-950/80 rounded-xl border border-white/5 space-y-1.5 text-xs">
                    <div>
                      <strong className="text-sky-400">{language === 'vi' ? 'Bài toán:' : 'Problem:'}</strong>{' '}
                      <span className="text-slate-300">{proj.problem}</span>
                    </div>
                    <div>
                      <strong className="text-emerald-400">{language === 'vi' ? 'Giải pháp:' : 'Solution:'}</strong>{' '}
                      <span className="text-slate-300">{proj.solution}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  {proj.repositoryUrl && (
                    <a
                      href={proj.repositoryUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 transition-colors font-medium ml-auto"
                    >
                      <span>{language === 'vi' ? 'Xem Trực Tiếp' : 'Live Demo'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Skills Matrix */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>{t.viewSkills}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mt-1">
              {language === 'vi' ? 'Năng Lực Công Nghệ Chuyên Sâu' : 'Technical Proficiencies'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO_SKILLS.map((skill) => (
              <div
                key={skill.id}
                className="p-4 bg-slate-900/60 rounded-xl border border-white/10 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white text-sm">{skill.name}</div>
                  {skill.proficiency && (
                    <span className="text-xs font-mono text-emerald-400 font-semibold">
                      {skill.proficiency}%
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400">{skill.description}</div>
                {skill.proficiency && (
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 5. Experience Timeline */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-wider">
              <Briefcase className="w-4 h-4" />
              <span>{t.viewExperience}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mt-1">
              {language === 'vi' ? 'Quá Trình Hoạt Động & Cột Mốc' : 'Career History & Leadership'}
            </h3>
          </div>

          <div className="space-y-6">
            {PORTFOLIO_EXPERIENCE.map((exp) => (
              <div
                key={exp.id}
                className="p-6 bg-slate-900/50 rounded-2xl border border-white/10 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="text-base font-bold text-white">{exp.position}</h4>
                    <div className="text-xs text-sky-400 font-mono font-medium">{exp.organization}</div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{exp.period}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{exp.description}</p>
                <ul className="space-y-1.5 pt-2">
                  {exp.achievements.map((ach, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <ArrowRight className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Achievements & Honors */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>{language === 'vi' ? 'Danh Hiệu & Thành Tựu' : 'Honors & Achievements'}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mt-1">
              {language === 'vi' ? 'Chứng Chỉ & Ghi Nhận' : 'Verified Milestones'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PORTFOLIO_ACHIEVEMENTS.map((ach) => (
              <div
                key={ach.id}
                className="p-5 bg-slate-900/60 rounded-xl border border-white/10 space-y-2"
              >
                <div className="text-2xl">{ach.badge}</div>
                <h4 className="font-bold text-white text-sm">{ach.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{ach.description}</p>
                <div className="text-[11px] font-mono text-amber-400 pt-1">{ach.date}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. FAQ Section */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>FAQ</span>
            </div>
            <h3 className="text-2xl font-bold text-white mt-1">{t.faqTitle}</h3>
          </div>

          <div className="space-y-4">
            {PORTFOLIO_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 bg-slate-900/50 rounded-xl border border-white/10 space-y-2"
              >
                <h4 className="font-bold text-white text-sm">
                  {language === 'vi' ? faq.questionVi : faq.questionEn}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'vi' ? faq.answerVi : faq.answerEn}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 8. Footer */}
      <footer className="border-t border-white/10 py-8 px-6 bg-slate-950 text-center text-xs text-slate-500 font-mono">
        <div>THE ROOM © 2026 // Spatial Web Portfolio & Accessible 2D Experience</div>
        <div className="mt-2 text-[11px] text-slate-600">Built with React, Three.js, TypeScript & Cloudflare</div>
      </footer>
    </div>
  );
};
