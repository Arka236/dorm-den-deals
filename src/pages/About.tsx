import { Button } from "@/components/ui/button"

export default function About() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>

      <p className="mb-4">
        The <strong>College Essentials</strong> Initiative aims to offer affordable mattresses, pillows, and essential toiletries to freshers joining college
        We are a team of IITians from different departments who saw how expensive and inconvenient it was for freshers to get started on campus.
      </p>

      <p className="mb-4">
        We reach the wholesalers,  streamline deliveries, and offer them at student-friendly prices without involving any middle man. This is a student-run, student-first initiative — <strong>by students, for students</strong>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Our Team</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Arka Kar – 2nd Year, ECE</li>
        <li>Arya Giri – 2nd Year, BME</li>
        <li>Gourab Mandal – 2nd Year, MNC</li>
        <li>Aritra Mondal – 2nd Year, PHE</li>
      </ul>

      <p className="mb-6">
        Our mission is to reduce onboarding stress, offer savings, and make IIT BHU a welcoming place for new students.
      </p>

      <a
        href="/Affordable-Mattress-and-Pillow-Initiative-for-Freshers-IIT-BHU.pdf"
        download
      >
        <Button>📄 Download Full About PDF</Button>
      </a>
    </div>
  )
}
