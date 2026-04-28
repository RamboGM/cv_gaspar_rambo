import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import type { Translation } from "../../i18n/translations";
import type { Job } from "../../data/experience";
import type { Project } from "../../data/projects";

// Register fonts if needed. Helvetica is default.

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
    color: "#333333",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111111",
  },
  title: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 10,
  },
  contactItem: {
    fontSize: 10,
    color: "#555555",
  },
  section: {
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111111",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingBottom: 3,
    marginBottom: 8,
  },
  text: {
    fontSize: 10,
    lineHeight: 1.5,
    color: "#444444",
  },
  bold: {
    fontWeight: "bold",
    color: "#222222",
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  companyName: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#111111",
  },
  jobRole: {
    fontSize: 10,
    fontStyle: "italic",
    color: "#444444",
  },
  period: {
    fontSize: 9,
    color: "#777777",
  },
  achievementList: {
    marginTop: 4,
    marginLeft: 10,
  },
  achievementItem: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bullet: {
    width: 10,
    fontSize: 10,
  },
  achievementText: {
    fontSize: 9,
    flex: 1,
    color: "#555555",
  },
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 5,
  },
  skillBadge: {
    fontSize: 9,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    color: "#4B5563",
  },
  projectItem: {
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#111111",
  },
  projectTech: {
    fontSize: 8,
    color: "#6366f1",
    marginBottom: 2,
  },
  certificationItem: {
    marginBottom: 5,
  },
  certTitle: {
    fontSize: 10,
    fontWeight: "bold",
  },
  certIssuer: {
    fontSize: 9,
    color: "#666666",
  }
});

interface CvPdfDocumentProps {
  data: Translation;
  experience: Job[];
  projects: Project[];
}

export const CvPdfDocument = ({ data, experience, projects }: CvPdfDocumentProps) => {
  const contactDetails = data.contact.details;

  return (
    <Document title={`CV - Gaspar Rambo`}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
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

        {/* Profile */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.about.heading}</Text>
          <Text style={styles.text}>{data.about.description}</Text>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.experience.heading}</Text>
          {experience.map((job, index) => (
            <View key={index} style={{ marginBottom: 12 }}>
              <View style={styles.jobHeader}>
                <Text style={styles.companyName}>{job.company}</Text>
                <Text style={styles.period}>{job.period}</Text>
              </View>
              <Text style={styles.jobRole}>{job.role}</Text>
              <Text style={[styles.text, { marginTop: 3 }]}>{job.summary}</Text>
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.education.heading}</Text>
          <Text style={styles.text}>{data.education.description}</Text>
          {data.education.highlights.map((highlight, index) => (
            <Text key={index} style={[styles.text, { marginTop: 2, fontWeight: "bold" }]}>
              • {highlight}
            </Text>
          ))}
        </View>

        {/* Certifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.certifications.heading}</Text>
          {data.certifications.items.map((cert, index) => (
            <View key={index} style={styles.certificationItem}>
              <Text style={styles.certTitle}>{cert.title}</Text>
              <Text style={styles.certIssuer}>{cert.issuer} | {cert.issueDate}</Text>
            </View>
          ))}
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.projects.heading}</Text>
          {projects.map((project, index) => (
            <View key={index} style={styles.projectItem}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <Text style={styles.projectTech}>{project.tech.join(" · ")}</Text>
              <Text style={styles.text}>{project.description}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
