import type { Metadata } from 'next';
import AdminShell from '@/components/admin/AdminShell';
import StatusSelect from '@/components/admin/StatusSelect';
import { getDB } from '@/lib/db';
import { updateConsultationStatus, updateEnquiryStatus } from '@/lib/actions';
import { formatDate } from '@/lib/format';
import type { ConsultationStatus, EnquiryStatus } from '@/lib/types';

export const metadata: Metadata = { title: 'Enquiries & Consultations' };

const enquiryOptions = [
  { value: 'new', label: 'New' },
  { value: 'replied', label: 'Replied' },
  { value: 'closed', label: 'Closed' },
];

const consultationOptions = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'closed', label: 'Closed' },
];

export default async function AdminEnquiriesPage() {
  const db = getDB();

  return (
    <AdminShell active="enquiries">
      <h1 className="font-display text-3xl">Enquiries & Consultations</h1>

      <section className="mt-6">
        <h2 className="font-display text-xl">Customer enquiries ({db.enquiries.length})</h2>
        {db.enquiries.length === 0 ? (
          <p className="card mt-3 p-6 text-sm text-ink-soft">No enquiries yet.</p>
        ) : (
          <div className="mt-3 grid gap-4">
            {db.enquiries.map((e) => (
              <article key={e.id} className="card p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">
                      {e.name} <span className="text-xs font-normal text-ink-soft">· {e.source} · {formatDate(e.createdAt)}</span>
                    </p>
                    <p className="mt-0.5 text-xs text-ink-soft">
                      {e.phone ? `☎ ${e.phone} ` : ''}
                      {e.email ? `✉ ${e.email}` : ''}
                      {!e.phone && !e.email ? 'No contact details provided' : ''}
                    </p>
                  </div>
                  <StatusSelect
                    id={e.id}
                    value={e.status}
                    options={enquiryOptions}
                    label={`Update status for enquiry from ${e.name}`}
                    action={updateEnquiryStatus as (id: string, status: never) => Promise<{ ok: boolean }>}
                  />
                </div>
                <p className="mt-3 whitespace-pre-wrap rounded-md bg-linen px-4 py-3 text-sm text-ink-soft">{e.message}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl">Consultation requests ({db.consultations.length})</h2>
        {db.consultations.length === 0 ? (
          <p className="card mt-3 p-6 text-sm text-ink-soft">No consultation requests yet.</p>
        ) : (
          <div className="mt-3 grid gap-4">
            {db.consultations.map((c) => (
              <article key={c.id} className="card p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">
                      {c.fullName} <span className="text-xs font-normal text-ink-soft">· {formatDate(c.createdAt)}</span>
                    </p>
                    <dl className="mt-2 grid gap-x-6 gap-y-1 text-xs text-ink-soft sm:grid-cols-2">
                      <div><dt className="inline font-bold">Phone: </dt><dd className="inline">{c.phone}</dd></div>
                      {c.email ? <div><dt className="inline font-bold">Email: </dt><dd className="inline">{c.email}</dd></div> : null}
                      <div><dt className="inline font-bold">Project: </dt><dd className="inline">{c.projectType}</dd></div>
                      <div><dt className="inline font-bold">Location: </dt><dd className="inline">{c.location}</dd></div>
                      {c.budget ? <div><dt className="inline font-bold">Budget: </dt><dd className="inline">{c.budget}</dd></div> : null}
                      {c.preferredDate ? <div><dt className="inline font-bold">Preferred date: </dt><dd className="inline">{c.preferredDate}</dd></div> : null}
                    </dl>
                  </div>
                  <StatusSelect
                    id={c.id}
                    value={c.status}
                    options={consultationOptions}
                    label={`Update status for consultation request from ${c.fullName}`}
                    action={updateConsultationStatus as (id: string, status: never) => Promise<{ ok: boolean }>}
                  />
                </div>
                <p className="mt-3 whitespace-pre-wrap rounded-md bg-linen px-4 py-3 text-sm text-ink-soft">{c.description}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </AdminShell>
  );
}
