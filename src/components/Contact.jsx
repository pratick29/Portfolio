import { profile } from "../data/profile";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";
import Terminal from "./ui/Terminal";
import Highlight from "./ui/Highlight";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition-colors focus:border-violet-400/60 focus:ring-1 focus:ring-violet-400/30";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionLabel index="07" color="violet">Contact</SectionLabel>
        </Reveal>

        <Reveal>
          <Terminal title="contact" right="[ formspree ]">
            <div className="px-4 py-4 sm:px-5">
              <div className="flex items-center gap-2 font-mono text-[10px] text-slate-600">
                <span className="text-violet-400/80">➜</span>
                <span className="text-violet-300/80">~/contact</span>
                <span>$</span>
                <span className="text-slate-400">sendmail --to pratick</span>
              </div>

              <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center md:p-10">
                <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {profile.contact.title}
                </h2>

                <p className="mx-auto mt-4 max-w-md leading-relaxed text-slate-400">
                  <Highlight text={profile.contact.text} />
                </p>

                <form
                  action={profile.contact.formspreeEndpoint}
                  method="POST"
                  className="mt-10 space-y-4 text-left"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      autoComplete="name"
                      className={inputClass}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      autoComplete="email"
                      className={inputClass}
                    />
                  </div>

                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Your Message"
                    required
                    className={inputClass}
                  />

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-violet-500/15 py-3 font-mono text-sm font-medium tracking-widest text-violet-300 transition-all hover:bg-violet-500/25 active:scale-[0.99]"
                  >
                    <span className="text-slate-600">[</span> send message{" "}
                    <span className="text-slate-600">]</span>
                  </button>
                </form>
              </div>
            </div>
          </Terminal>
        </Reveal>
      </div>
    </section>
  );
}
