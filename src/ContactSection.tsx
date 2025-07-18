import React from 'react'

interface ContactSectionProps {
  header: string
  email?: string
  emailPrompt?: string
  emailLinkText?: string
  noEmail?: string
}

const ContactSection: React.FC<ContactSectionProps> = ({ header, email, emailPrompt, emailLinkText, noEmail }) => (
  <section className="contact-me" id="contact-me">
    <h2>{header}</h2>
    <div className="contact-me-content">
      <p>
        {email ? (
          <>
            {emailPrompt || 'Feel free to reach out:'}&nbsp;
            <a
              href={`mailto:${email}`}
              className="contact-email-link"
              style={{
                color: 'var(--color-link)',
                textDecoration: 'underline',
                fontWeight: 500,
                wordBreak: 'break-all'
              }}
            >
              {emailLinkText || 'Email Me'}
            </a>
          </>
        ) : (
          <>{noEmail || 'No contact email provided.'}</>
        )}
      </p>
    </div>
  </section>
)

export default ContactSection
