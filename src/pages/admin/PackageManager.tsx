// File: src/pages/admin/PackageManager.tsx

import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getPackagesByField,
  deactivatePackage,
  reactivatePackage,
} from "../../services/packageService";
import { Package } from "../../types/package";
import { Link } from "react-router-dom";

type PackageStatusFilter = "active" | "inactive" | "subscription" | "event";

const PackageManager: React.FC = () => {
  const { user, accessToken } = useAuth();

  // Filter options: active/inactive (by is_active), subscription/event (by package_type)
  const [filterType, setFilterType] =
    useState<PackageStatusFilter>("active");
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper to map filterType → service params
  const fetchByFilter = async (filter: PackageStatusFilter) => {
    if (!accessToken) return;
    setLoading(true);
    setError(null);

    try {
      let data: Package[];
      if (filter === "active") {
        data = await getPackagesByField(
          { field: "is_active", value: true },
          accessToken
        );
      } else if (filter === "inactive") {
        data = await getPackagesByField(
          { field: "is_active", value: false },
          accessToken
        );
      } else {
        // "subscription" or "event"
        data = await getPackagesByField(
          { field: "package_type", value: filter },
          accessToken
        );
      }
      setPackages(data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch packages.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch whenever filterType (or user/accessToken) changes
  useEffect(() => {
    if (user?.role === "admin" && accessToken) {
      fetchByFilter(filterType);
    }
  }, [filterType, user, accessToken]);

  // Guard: only allow admins
  if (!user || user.role !== "admin") {
    return (
      <div className="p-6">
        <p className="text-red-600">Access denied. Admins only.</p>
      </div>
    );
  }

  // Toggle active/inactive for a single package, then re-fetch
  const handleToggleActive = async (pkg: Package) => {
    if (!accessToken) return;

    try {
      if (pkg.is_active) {
        // deactivate
        await deactivatePackage(pkg.id, accessToken);
      } else {
        // reactivate
        await reactivatePackage(pkg.id, accessToken);
      }
      // re-fetch current filter
      fetchByFilter(filterType);
    } catch (err: any) {
      console.error(err);
      alert("Failed to toggle package status.");
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header + “New Package” button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Package Management
        </h1>
        <Link to="/admin/packages/new">
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
            New Package
          </button>
        </Link>
      </div>

      {/* Four filter buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setFilterType("active")}
          className={`px-4 py-2 rounded-md ${
            filterType === "active"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilterType("inactive")}
          className={`px-4 py-2 rounded-md ${
            filterType === "inactive"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Inactive
        </button>
        <button
          onClick={() => setFilterType("subscription")}
          className={`px-4 py-2 rounded-md ${
            filterType === "subscription"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Subscription
        </button>
        <button
          onClick={() => setFilterType("event")}
          className={`px-4 py-2 rounded-md ${
            filterType === "event"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Event
        </button>

        <button
          onClick={() => fetchByFilter(filterType)}
          className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg p-6">
        {loading && <p className="text-gray-500">Loading…</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && packages.length === 0 && (
          <p className="text-gray-500">No packages found.</p>
        )}

        {!loading && packages.length > 0 && (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Slug</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Price</th>
                <th className="p-2 text-left">Active?</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.id} className="border-b">
                  <td className="p-2">{pkg.name || "—"}</td>
                  <td className="p-2">{pkg.slug || "—"}</td>
                  <td className="p-2">
                    {pkg.package_type.charAt(0).toUpperCase() +
                      pkg.package_type.slice(1)}
                  </td>
                  <td className="p-2">
                    {/* Coerce price into number before formatting */}
                    {Number(pkg.price).toFixed(2)}
                  </td>
                  <td className="p-2">{pkg.is_active ? "Yes" : "No"}</td>
                  <td className="p-2 space-x-2">
                    <Link
                      to={`/admin/packages/edit/${pkg.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleToggleActive(pkg)}
                      className={`px-2 py-1 text-sm rounded-md focus:outline-none ${
                        pkg.is_active
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {pkg.is_active ? "Deactivate" : "Reactivate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PackageManager;
