import { useLanguage } from "../hooks/useLanguage";

export default function Contact() {
  const { content } = useLanguage();
  const contactCopy = content.contact;
  const email = "tu-email@ejemplo.com"; // TODO: reemplazar
  const subject = encodeURIComponent(contactCopy.form.subject);
  const body = encodeURIComponent(contactCopy.form.body);
  const mailto = `mailto:${email}?subject=${subject}&body=${body}`;

  return (
    <section id="contacto" className="scroll-mt-24 py-20">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">
              <span className="bg-gradient-to-r from-[#ec4899] via-[#6366f1] to-[#22d3ee] bg-clip-text text-transparent">
                {contactCopy.heading}
              </span>
            </h2>
            <div className="mt-3 h-[3px] w-24 rounded-full bg-gradient-to-r from-[#22d3ee] to-transparent" />
          </div>
          <p className="text-base text-[rgba(255,255,255,0.7)] md:text-lg">{contactCopy.description}</p>
          <a
            href={mailto}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#22d3ee] px-6 py-2.5 text-sm font-semibold text-[#0f172a] shadow-[0_18px_48px_rgba(34,211,238,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-[rgba(34,211,238,0.9)]"
          >
            {contactCopy.button}
          </a>
          <p className="text-xs uppercase tracking-[0.3em] text-[rgba(255,255,255,0.4)]">{contactCopy.note}</p>
        </div>
        <div className="relative rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[rgba(15,23,42,0.8)] p-6 shadow-[0_30px_80px_rgba(15,23,42,0.55)]">
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[rgba(236,72,153,0.25)] blur-3xl" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = mailto;
            }}
            className="relative space-y-4"
          >
            <input
              className="w-full rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(11,20,37,0.8)] px-4 py-3 text-sm text-[#f1f5f9] placeholder:text-[rgba(255,255,255,0.4)] focus:border-[#22d3ee] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(34,211,238,0.4)]"
              placeholder={contactCopy.form.name}
            />
            <input
              className="w-full rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(11,20,37,0.8)] px-4 py-3 text-sm text-[#f1f5f9] placeholder:text-[rgba(255,255,255,0.4)] focus:border-[#22d3ee] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(34,211,238,0.4)]"
              placeholder={contactCopy.form.email}
              type="email"
            />
            <textarea
              className="h-32 w-full rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(11,20,37,0.8)] px-4 py-3 text-sm text-[#f1f5f9] placeholder:text-[rgba(255,255,255,0.4)] focus:border-[#ec4899] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(236,72,153,0.3)]"
              placeholder={contactCopy.form.message}
            />
            <button
              className="w-full rounded-full bg-[#ec4899] px-4 py-3 text-sm font-semibold text-[#0f172a] transition-transform hover:-translate-y-0.5 hover:bg-[rgba(236,72,153,0.9)]"
            >
              {contactCopy.form.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
