import {
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaPhp,
  FaGitAlt,
} from "react-icons/fa";

import {
  SiMysql,
  SiGithub,
  SiC,
  SiCplusplus,
} from "react-icons/si";

import { VscCode } from "react-icons/vsc";

import { MdComputer, MdNetworkCheck } from "react-icons/md";
import { GiBrain } from "react-icons/gi";

/**
 * Skill data
 * Icons are stored as REFERENCES (not JSX) — this avoids crashes
 */
const skillCategories = [
  {
    title: "Languages",
    items: [
      { name: "C", icon: SiC },
      { name: "C++", icon: SiCplusplus },
      { name: "Python", icon: FaPython },
    ],
  },
  {
    title: "Web Development",
    items: [
      { name: "HTML", icon: FaHtml5 },
      { name: "CSS", icon: FaCss3Alt },
      { name: "JavaScript", icon: FaJs },
      { name: "PHP", icon: FaPhp },
    ],
  },
  {
    title: "Databases",
    items: [
      { name: "MySQL", icon: SiMysql },
    ],
  },
  {
    title: "Developer Tools",
    items: [
      { name: "VS Code", icon:VscCode },
      { name: "GitHub", icon: SiGithub },
      { name: "Git", icon: FaGitAlt },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { name: "Object-Oriented Programming", icon: GiBrain },
      { name: "Data Structures & Algorithms", icon: GiBrain },
      { name: "Computer Networks", icon: MdNetworkCheck },
      { name: "Operating Systems", icon: MdComputer },
      { name: "Software Development", icon: MdComputer },
      { name: "Design Thinking", icon: GiBrain },
    ],
  },
];

export default function Skills() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-12">
        Skills
      </h2>

      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2">
        {skillCategories.map((category) => (
          <div
            key={category.title}
            className="bg-white/80 dark:bg-white/5
                       border border-slate-200 dark:border-white/10
                       rounded-2xl p-6"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              {category.title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {category.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className="flex items-center gap-3
                               px-3 py-2 rounded-xl
                               bg-slate-100 dark:bg-slate-800
                               text-slate-700 dark:text-slate-300
                               hover:scale-[1.03]
                               transition-all"
                  >
                    <Icon className="text-lg text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
