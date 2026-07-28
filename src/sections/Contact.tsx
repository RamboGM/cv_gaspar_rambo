import Section from "../components/Section";
import { useLanguage } from "../hooks/useLanguage";

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

    return { ...detail, displayValue: `${detail.value} (${age}${suffix})` };
  });

  return (
    <Section
      id="contacto"
      index="01"
      title={contactCopy.heading}
      subtitle={contactCopy.description}
    >
      {/* Lista de definición: en mobile apila etiqueta sobre valor, en desktop
          los alinea en columnas. Mucho más legible que los chips anteriores. */}
      <dl className="grid gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)]">
        {formattedDetails.map((detail) => (
          <div
            key={`${detail.label}-${detail.value}`}
            className="flex flex-col gap-1 bg-[var(--surface)] px-5 py-4 sm:flex-row sm:items-baseline sm:gap-6"
          >
            <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-3)] sm:w-44 sm:shrink-0">
              {detail.label}
            </dt>
            <dd className="break-words text-sm text-[var(--text)] md:text-base">
              {detail.href ? (
                <a href={detail.href} className="link-inline">
                  {detail.displayValue}
                </a>
              ) : (
                detail.displayValue
              )}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-10">
        <a href={mailto} className="btn btn--primary">
          {contactCopy.button}
        </a>
      </div>

      {contactCopy.note ? (
        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[var(--text-3)]">
          {contactCopy.note}
        </p>
      ) : null}
    </Section>
  );
}
