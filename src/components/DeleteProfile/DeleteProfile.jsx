import React, { useEffect, useState } from "react";
import * as authService from "../../services/authService";

const DeleteProfile = ({ email, onCancel, onDeleted }) => {
  const [form, setForm] = useState({
    password: "",
    securityAnswer1: "",
    securityAnswer2: "",
  });
  const [questions, setQuestions] = useState({
    securityQuestion1: "",
    securityQuestion2: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError("");
      try {
        const q = await authService.getSecurityQuestionsByEmail(email);
        setQuestions(q);
      } catch (err) {
        setError("Failed to fetch security questions.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [email]);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await authService.deleteAccount(
        form.password, form.securityAnswer1, form.securityAnswer2
      );
      if (res.error) throw new Error(res.error);
      setSuccess("Profile deleted. Logging out...");
      setTimeout(() => onDeleted(), 1200);
    } catch (err) {
      setError(err.message || "Error deleting account.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <div className="p-4 text-gray-500">Loading security questions...</div>;

  return (
    <div className="mt-4 p-4 border rounded bg-red-50">
      <h3 className="text-lg font-semibold text-red-700 mb-2">Delete Profile</h3>
      <p className="mb-2 text-sm text-red-800">
        This action cannot be undone. All your recipes will be deleted.
      </p>
      <form onSubmit={handleDelete} className="space-y-2">
        {/* Password with show/hide toggle */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Current password"
            className="border rounded p-2 w-full pr-14"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-sage underline"
            onClick={() => setShowPassword(v => !v)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <label className="block text-sm font-medium">{questions.securityQuestion1}</label>
        <input
          type="text"
          name="securityAnswer1"
          placeholder="Answer"
          className="border rounded p-2 w-full"
          value={form.securityAnswer1}
          onChange={handleChange}
          required
        />
        <label className="block text-sm font-medium">{questions.securityQuestion2}</label>
        <input
          type="text"
          name="securityAnswer2"
          placeholder="Answer"
          className="border rounded p-2 w-full"
          value={form.securityAnswer2}
          onChange={handleChange}
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
          >
            {loading ? "Deleting..." : "Confirm Delete"}
          </button>
          <button
            type="button"
            className="border px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteProfile;
