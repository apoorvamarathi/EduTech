
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Only keep the Print icon (no clock/medal)
const PrintIcon = () => (
  <svg className="w-5 h-5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9V3h12v6M6 21h12v-6H6zM18 9v12H6V9" />
    <circle cx="18" cy="15" r="1" />
  </svg>
);

export default function CertificateViewer() {
  const { id } = useParams();
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('myCertificates');
    if (stored) {
      const certs = JSON.parse(stored);
      const found = certs.find(c => c.id == id);
      if (found) setCert(found);
    }
    if (!cert) {
      setTimeout(() => {
        setCert({
          id: parseInt(id),
          studentName: 'Alex Johnson',
          courseTitle: 'React - The Complete Guide',
          issueDate: '2025-04-15',
          credentialId: 'EDU-REACT-001',
          grade: 'A+',
          score: '98%',
          qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=EDU-${id}`,
        });
        setLoading(false);
      }, 300);
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="text-center">Loading your certificate...</div>
    </div>
  );
  if (!cert) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="text-center">
        <p>Certificate not found.</p>
        <Link to="/my-certificates" style={{ color: 'var(--accent)' }}>← Back to certificates</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-4xl w-full certificate-container print:shadow-none print:border-0">
        <div className="relative rounded-2xl shadow-2xl overflow-hidden" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          {/* Decorative double border (no clock icon) */}
          <div className="absolute inset-0 pointer-events-none border-8 border-double border-[var(--accent)] opacity-20 rounded-2xl"></div>

          <div className="p-8 md:p-12 text-center relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold tracking-wide" style={{ color: 'var(--accent)' }}>CERTIFICATE OF COMPLETION</h1>
            <p className="text-md md:text-lg mt-4" style={{ color: 'var(--text)' }}>This is to certify that</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold my-4" style={{ color: 'var(--text-h)' }}>{cert.studentName}</h2>
            <p className="text-md md:text-lg" style={{ color: 'var(--text)' }}>has successfully completed the course</p>
            <p className="text-2xl md:text-3xl font-semibold mt-2" style={{ color: 'var(--accent)' }}>{cert.courseTitle}</p>
            
            <div className="flex flex-wrap justify-center gap-8 mt-8 text-sm">
              <div><span className="font-semibold">Grade:</span> {cert.grade}</div>
              <div><span className="font-semibold">Score:</span> {cert.score}</div>
              <div><span className="font-semibold">Issue Date:</span> {cert.issueDate}</div>
              <div><span className="font-semibold">Credential ID:</span> {cert.credentialId}</div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center mt-8">
              <img src={cert.qrCodeUrl} alt="Verification QR" className="w-28 h-28 border-2 border-gray-300 rounded-lg p-1" />
              <p className="text-xs mt-2" style={{ color: 'var(--text)' }}>Scan to verify authenticity</p>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-8 mt-10 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
              <div className="text-left">
                <div className="w-40 h-0.5 bg-gray-400 mb-1"></div>
                <p className="text-sm font-medium">Authorized Signature</p>
                <p className="text-xs">Dr. Sarah Johnson</p>
              </div>
              <div className="text-right">
                <div className="w-40 h-0.5 bg-gray-400 mb-1 ml-auto"></div>
                <p className="text-sm font-medium">Edutech Platform</p>
                <p className="text-xs">www.edutech.com/verify</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4 mt-8 no-print">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 rounded-xl font-medium transition hover:scale-105 flex items-center"
            style={{ background: 'var(--accent)', color: 'white' }}
          >
            <PrintIcon /> Print Certificate
          </button>
          <Link
            to="/my-certificates"
            className="px-6 py-2 rounded-xl border font-medium transition hover:bg-opacity-10"
            style={{ borderColor: 'var(--border)', color: 'var(--text-h)' }}
          >
            ← Back to Certificates
          </Link>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          .certificate-container { margin: 0; padding: 0; box-shadow: none; }
          body { background: white; padding: 0; margin: 0; }
        }
      `}</style>
    </div>
  );
}