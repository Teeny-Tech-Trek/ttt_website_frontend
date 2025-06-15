// src/pages/PackageDetailPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPublicPackagesByField } from '../../services/packageService';
import type { Package } from '../../types/package';
import RazorpayCheckoutButton from '../../components/ui/RazorPayCheckoutButton';

const EXCLUDED_FIELDS: (keyof Package)[] = ['id', 'is_active', 'created_at', 'updated_at'];
const FIELD_LABELS: Record<keyof Package, string> = {
    name: 'Name',
    slug: 'Slug',
    description: 'Description',
    price: 'Price (₹)',
    duration_days: 'Duration (days)',
    package_type: 'Package Type',
    event_id: 'Event ID',
    capacity: 'Capacity',
    package_registration_deadline: 'Registration Deadline',
    id: '',
    is_active: '',
    created_at: '',
    updated_at: ''
};

const formatField = (key: keyof Package, value: any) => {
  if (value === null || value === undefined) return null;
  if (key === 'package_type') return value === 'subscription' ? 'Subscription' : 'Event';
  if (key === 'price') return `₹${value}`;
  if (key === 'package_registration_deadline') return new Date(value).toLocaleString();
  return value;
};

const PackageDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getPublicPackagesByField('slug', slug)
      .then((pkgs) => {
        if (pkgs.length === 0) {
          setErr('Package not found.');
          setPkg(null);
        } else {
          setPkg(pkgs[0]);
          setErr(null);
        }
      })
      .catch(() => {
        setErr('Failed to load package.');
        setPkg(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div>Loading package...</div>;
  if (err) return <div style={{ color: 'red' }}>{err}</div>;
  if (!pkg) return null;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-10 mt-12">
      <h1 className="text-2xl font-bold mb-4">{pkg.name}</h1>
      <dl>
        {Object.entries(pkg)
          .filter(([key, value]) => !EXCLUDED_FIELDS.includes(key as keyof Package) && value !== null && value !== undefined)
          .map(([key, value]) => (
            <div key={key} className="mb-4">
              <dt className="font-medium">{FIELD_LABELS[key as keyof Package] || key}</dt>
              <dd className="ml-2 text-gray-700">{formatField(key as keyof Package, value)}</dd>
            </div>
          ))}
      </dl>
      <div className="mt-8">
        <RazorpayCheckoutButton
          packageId={pkg.id}
          packageName={pkg.name}
          description={pkg.description ?? ''}
          amount={pkg.price}
        />
      </div>
    </div>
  );
};

export default PackageDetailPage;
