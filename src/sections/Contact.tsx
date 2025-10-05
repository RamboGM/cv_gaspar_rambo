import { useLanguage } from "../hooks/useLanguage";

const primaryButtonClasses =
  "rounded-full bg-[#ec4899] px-6 py-2.5 text-sm font-semibold text-[#0f172a] shadow-[0_20px_60px_rgba(236,72,153,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-[rgba(236,72,153,0.9)]";

const calculateAgeFromIsoDate = (dateISO: string): number | null => {
  const [year, month, day] = dateISO.split("-").map(Number);

  if ([year, month, day].some((value) => Number.isNaN(value))) {
    return null;
  }

  const today = new Date();
  let age = today.getFullYear() - year;
  const hasHadBirthdayThisYear =
    today.getMonth() + 1 > month ||
    (today.getMonth() + 1 === month && today.getDate() >= day);

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  return age;
};

export default function Contact() {
  const { content } = useLanguage();
  const contactCopy = content.contact;
  const subject = encodeURIComponent(contactCopy.mailSubject);
  const body = encodeURIComponent(contactCopy.mailBody);
  const mailto = `mailto:${contactCopy.email}?subject=${subject}&body=${body}`;

  const details = contactCopy.details.length
    ? contactCopy.details
    : [
        {
          label: "Email",
          value: contactCopy.email,
          href: `mailto:${contactCopy.email}`,
        },
      ];

  const formattedDetails = details.map((detail) => {
    if (!detail.dateISO) {
      return { ...detail, displayValue: detail.value };
    }

    const age = calculateAgeFromIsoDate(detail.dateISO);

    if (age === null) {
      return { ...detail, displayValue: detail.value };
    }

    const suffix = detail.ageSuffix ? ` ${detail.ageSuffix}` : "";
    const ageText = `${age}${suffix}`;

    return {
      ...detail,
      displayValue: `${detail.value} (${ageText})`,
    };
  });

  return (
    <section id="contacto" className="scroll-mt-24 py-20">
      <div>
        <h2 className="text-3xl font-bold md:text-4xl">
          <span className="bg-gradient-to-r from-[#ec4899] via-[#6366f1] to-[#22d3ee] bg-clip-text text-transparent">
            {contactCopy.heading}
          </span>
        </h2>
        <div className="mt-3 h-[3px] w-24 rounded-full bg-gradient-to-r from-[#ec4899] via-[#6366f1] to-transparent" />
      </div>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-[rgba(255,255,255,0.7)] md:text-lg">
        {contactCopy.description}
      </p>
      <ul className="mt-8 flex flex-wrap gap-2 text-sm text-[rgba(255,255,255,0.7)]">
        {formattedDetails.map((detail) => (
          <li
            key={`${detail.label}-${detail.value}`}
            className="rounded-full border border-[rgba(34,211,238,0.3)] bg-[rgba(34,211,238,0.1)] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#f1f5f9]"
          >
            {detail.href ? (
              <a href={detail.href} className="transition-colors hover:text-[rgba(255,255,255,0.8)]">
                <span className="font-semibold text-[#22d3ee]">{detail.label}:</span> {detail.displayValue}
              </a>
            ) : (
              <span>
                <span className="font-semibold text-[#22d3ee]">{detail.label}:</span> {detail.displayValue}
              </span>
            )}
          </li>
        ))}
      </ul>
      <a href={mailto} className={`mt-8 inline-flex items-center gap-2 ${primaryButtonClasses}`}>
        {contactCopy.button}
      </a>
      {contactCopy.note ? (
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[rgba(255,255,255,0.4)]">
          {contactCopy.note}
        </p>
      ) : null}
    </section>
  );
}
