import { Document, Page, Text, View, StyleSheet, Image, Link } from "@react-pdf/renderer";
import type { Translation } from "../../i18n/translations";
import type { Job } from "../../data/experience";
import type { Project } from "../../data/projects";
import type { WordpressSite } from "../../data/wordpress";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
    color: "#333333",
  },
  header: {
    backgroundColor: "#0B1220",
    padding: 30,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    marginLeft: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  title: {
    fontSize: 14,
    color: "#38bdf8",
    marginTop: 4,
    fontWeight: "bold",
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    gap: 8,
  },
  contactItem: {
    fontSize: 9,
    color: "rgba(255, 255, 255, 0.7)",
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0B1220",
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingBottom: 4,
    marginBottom: 10,
  },
  text: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#444444",
  },
  itemContainer: {
    marginBottom: 15,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 4,
  },
  companyName: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#111111",
  },
  jobRole: {
    fontSize: 10,
    fontStyle: "italic",
    color: "#666666",
  },
  period: {
    fontSize: 9,
    color: "#94a3b8",
  },
  achievementList: {
    marginTop: 6,
    marginLeft: 10,
  },
  achievementItem: {
    flexDirection: "row",
    marginBottom: 3,
  },
  bullet: {
    width: 12,
    fontSize: 10,
    color: "#38bdf8",
  },
  achievementText: {
    fontSize: 9,
    flex: 1,
    color: "#475569",
  },
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 5,
  },
  skillBadge: {
    fontSize: 8,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    color: "#475569",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  projectItem: {
    marginBottom: 12,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#111111",
  },
  projectTech: {
    fontSize: 8,
    color: "#0284c7",
    marginBottom: 3,
  },
  subsectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#0B1220",
    marginTop: 10,
    marginBottom: 6,
  },
  siteItem: {
    marginBottom: 10,
  },
  siteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  siteName: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#111111",
  },
  siteRole: {
    fontSize: 9,
    fontStyle: "italic",
    color: "#666666",
  },
  siteLink: {
    fontSize: 9,
    color: "#0284c7",
    textDecoration: "none",
  }
});

interface CvPdfDocumentProps {
  data: Translation;
  experience: Job[];
  projects: Project[];
  wordpressSites: WordpressSite[];
  avatarUrl?: string | null;
}

const displayUrl = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/+$/, "");

export const CvPdfDocument = ({
  data,
  experience,
  projects,
  wordpressSites,
  avatarUrl,
}: CvPdfDocumentProps) => {
  const contactDetails = data.contact.details;

  return (
    <Document title={`CV - Gaspar Rambo`}>
      <Page size="A4" style={styles.page}>
        {/* Header con diseño Premium */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>Gaspar Rambo</Text>
            <Text style={styles.title}>{data.hero.title}</Text>
            <View style={styles.contactInfo}>
              {contactDetails.map((detail, index) => (
                <Text key={index} style={styles.contactItem}>
                  {detail.label}: {detail.value}
                </Text>
              ))}
            </View>
          </View>
          {avatarUrl && (
            <View style={styles.headerRight}>
              <Image src={avatarUrl} style={styles.avatar} />
            </View>
          )}
        </View>

        {/* Profile */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.about.heading}</Text>
          <Text style={styles.text}>{data.about.description}</Text>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.experience.heading}</Text>
          {experience.map((job, index) => (
            <View key={index} style={styles.itemContainer} wrap={false}>
              <View style={styles.jobHeader}>
                <Text style={styles.companyName}>{job.company}</Text>
                <Text style={styles.period}>{job.period}</Text>
              </View>
              <Text style={styles.jobRole}>{job.role}</Text>
              <Text style={[styles.text, { marginTop: 4 }]}>{job.summary}</Text>
              {job.achievements && job.achievements.length > 0 && (
                <View style={styles.achievementList}>
                  {job.achievements.map((achievement, idx) => (
                    <View key={idx} style={styles.achievementItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.achievementText}>{achievement}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillContainer}>
            {data.about.skills.map((skill, index) => (
              <Text key={index} style={styles.skillBadge}>{skill}</Text>
            ))}
          </View>
        </View>

        {/* Education */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>{data.education.heading}</Text>
          <Text style={styles.text}>{data.education.description}</Text>
          {data.education.highlights.map((highlight, index) => (
            <Text key={index} style={[styles.text, { marginTop: 3 }]}>
              • {highlight}
            </Text>
          ))}
        </View>

        {/* Certifications */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>{data.certifications.heading}</Text>
          {data.certifications.items.map((cert, index) => (
            <View key={index} style={{ marginBottom: 6 }}>
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>{cert.title}</Text>
              <Text style={{ fontSize: 9, color: "#666666" }}>{cert.issuer} | {cert.issueDate}</Text>
            </View>
          ))}
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.projects.heading}</Text>
          {projects.map((project, index) => (
            <View key={index} style={styles.projectItem} wrap={false}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <Text style={styles.projectTech}>{project.tech.join(" · ")}</Text>
              <Text style={styles.text}>{project.description}</Text>
            </View>
          ))}
        </View>

        {/* WordPress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.wordpress.heading}</Text>
          <Text style={styles.text}>{data.wordpress.summary}</Text>
          <View style={styles.achievementList}>
            {data.wordpress.highlights.map((highlight, index) => (
              <View key={index} style={styles.achievementItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.achievementText}>{highlight}</Text>
              </View>
            ))}
          </View>

          {wordpressSites.length > 0 && (
            <View>
              <Text style={styles.subsectionTitle}>{data.wordpress.sitesHeading}</Text>
              {wordpressSites.map((site, index) => (
                <View key={index} style={styles.siteItem} wrap={false}>
                  <View style={styles.siteHeader}>
                    <Text style={styles.siteName}>{site.name}</Text>
                    <Link src={site.url} style={styles.siteLink}>
                      {displayUrl(site.url)}
                    </Link>
                  </View>
                  <Text style={styles.siteRole}>{site.role}</Text>
                  {site.scope.length > 0 && (
                    <View style={styles.achievementList}>
                      {site.scope.map((item, idx) => (
                        <View key={idx} style={styles.achievementItem}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.achievementText}>{item}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                  {site.stack.length > 0 && (
                    <Text style={[styles.projectTech, { marginTop: 3 }]}>
                      {site.stack.join(" · ")}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};
